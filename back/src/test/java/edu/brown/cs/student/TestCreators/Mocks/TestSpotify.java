package edu.brown.cs.student.TestCreators.Mocks;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Server.Handlers.SpotifyHandler;
import edu.brown.cs.student.main.Server.Handlers.SpotifySortHandler;
import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;
import okio.Buffer;
import org.apache.hc.core5.http.ParseException;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import spark.Spark;

public class TestSpotify {
  private static JsonAdapter<Map<String, Object>> adapter;

  /**
   * Creates a port and Moshi.
   */
  @BeforeAll
  public static void setupOnce() {
    Spark.port(100);
    Moshi moshi = new Moshi.Builder().build();
    Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    adapter = moshi.adapter(mapStringObject);
  }

  /**
   * Sets up mock handlers
   */
  @BeforeEach
  public void setup() throws IOException, ParseException, SpotifyWebApiException {
    Spark.get("spotify", new SpotifyHandler(true));
    Spark.get("sortspotify", new SpotifySortHandler(true));
    Spark.init();
    Spark.awaitInitialization();
  }

  /**
   * Gracefully tears down the port.
   */
  @AfterEach
  public void teardown() {
    // Gracefully stop Spark listening on both endpoints
    Spark.unmap("spotify");
    Spark.unmap("sortspotify");
    Spark.awaitStop(); // don't proceed until the server is stopped
  }

  /**
   * Shuts down thread.

   * @throws InterruptedException if interrupted
   */
  @AfterAll
  public static void shutdown() throws InterruptedException {
    Spark.stop();
    Thread.sleep(3000);
  }

  /**
   * Helper to start a connection to a specific API endpoint/params

   * @param apiCall the call string, including endpoint (NOTE: this would be better if it had more
   *     structure!)
   * @return the connection for the given URL, just after connecting
   * @throws IOException if the connection fails for some reason
   */
  private static HttpURLConnection tryRequest(String apiCall) throws IOException {
    // Configure the connection (but don't actually send the request yet)
    URL requestURL = new URL("http://localhost:" + Spark.port() + "/" + apiCall);
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
    clientConnection.setRequestMethod("GET");
    clientConnection.connect();
    return clientConnection;
  }

  /**
   * Tests that the basic endpoint will return data by default
   *
   * @throws IOException Issue connecting to server or processing results
   */
  @Test
  public void testBasicResponse() throws IOException {
    HttpURLConnection clientConnection =
        tryRequest("spotify");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("success", body.get("result"));
    assertEquals(List.of("indian", "k-pop", "mandopop"), body.get("validgenres"));
    assertTrue(body.get("data").toString().contains("2:06"));
    assertTrue(body.get("data").toString().contains("Kuch Kuch Hota Hai"));
    assertTrue(body.get("data").toString().contains("215280.0"));
    clientConnection.disconnect();
  }

  /**
   * Tests that the numsongs criteria will return a well-formatted error
   * if request isn't a number
   *
   * @throws IOException Issue connecting to server or processing results
   */
  @Test
  public void testNumResponseError() throws IOException {
    HttpURLConnection clientConnection =
        tryRequest("spotify?numsongs=hi");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("error", body.get("result"));
    assertEquals("Number of songs must be an integer value", body.get("details"));
    clientConnection.disconnect();
  }

  /**
   * Tests that the numsongs criteria can be customised
   *
   * @throws IOException Issue connecting to server or processing results
   */
  @Test
  public void testNumResponse() throws IOException {
    HttpURLConnection clientConnection =
        tryRequest("spotify?numsongs=3");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("success", body.get("result"));
    assertEquals(List.of("indian", "k-pop", "mandopop"), body.get("validgenres"));
    assertTrue(body.get("data").toString().contains("2:06"));
    assertTrue(body.get("data").toString().contains("Kuch Kuch Hota Hai"));
    assertTrue(body.get("data").toString().contains("215280.0"));
    clientConnection.disconnect();
  }

  /**
   * Tests that the genre criteria can be customised
   *
   * @throws IOException Issue connecting to server or processing results
   */
  @Test
  public void testGenreResponse() throws IOException {
    HttpURLConnection clientConnection =
        tryRequest("spotify?genres=nope,k-pop");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("success", body.get("result"));
    assertEquals(List.of("k-pop"), body.get("validgenres"));
    assertEquals(List.of("nope"), body.get("invalidgenres"));
    assertTrue(body.get("data").toString().contains("2:06"));
    assertTrue(body.get("data").toString().contains("Kuch Kuch Hota Hai"));
    assertTrue(body.get("data").toString().contains("215280.0"));
    clientConnection.disconnect();
  }

  /**
   * Tests that the number and genre criteria can be combined
   *
   * @throws IOException Issue connecting to server or processing results
   */
  @Test
  public void testGenreNumResponse() throws IOException {
    HttpURLConnection clientConnection =
        tryRequest("spotify?genres=nope,k-pop&&numsongs=3");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("success", body.get("result"));
    assertEquals(List.of("k-pop"), body.get("validgenres"));
    assertEquals(List.of("nope"), body.get("invalidgenres"));
    assertTrue(body.get("data").toString().contains("2:06"));
    assertTrue(body.get("data").toString().contains("Kuch Kuch Hota Hai"));
    assertTrue(body.get("data").toString().contains("215280.0"));
    clientConnection.disconnect();
  }

  /**
   * Tests that songs can be sorted in ascending popularity order.
   *
   * @throws IOException Issue connecting to server or processing results
   */
  @Test
  public void testSortAscendingPop() throws IOException {
    HttpURLConnection clientConnection =
        tryRequest("sortspotify?popularity=ascending");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("success", body.get("result"));
    String dataStr = body.get("data").toString();
    assertTrue(dataStr.indexOf("紅糖水") < dataStr.indexOf("The Boys"));
    assertTrue(dataStr.indexOf("The Boys") < dataStr.indexOf("Dancing Queen"));
    assertTrue(dataStr.indexOf("Dancing Queen") < dataStr.indexOf("Raghupati Raghav"));
    clientConnection.disconnect();
  }

  /**
   * Tests that songs can be sorted in descending popularity order.
   *
   * @throws IOException Issue connecting to server or processing results
   */
  @Test
  public void testSortDescendingPop() throws IOException {
    HttpURLConnection clientConnection =
        tryRequest("sortspotify?popularity=descending");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("success", body.get("result"));
    String dataStr = body.get("data").toString();
    assertTrue(dataStr.indexOf("紅糖水") > dataStr.indexOf("The Boys"));
    assertTrue(dataStr.indexOf("The Boys") > dataStr.indexOf("Dancing Queen"));
    assertTrue(dataStr.indexOf("Dancing Queen") > dataStr.indexOf("Raghupati Raghav"));
    clientConnection.disconnect();
  }

  /**
   * Tests that songs can be sorted in ascending duration order.
   *
   * @throws IOException Issue connecting to server or processing results
   */
  @Test
  public void testSortAscendingDur() throws IOException {
    HttpURLConnection clientConnection =
        tryRequest("sortspotify?duration=ascending");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("success", body.get("result"));
    String dataStr = body.get("data").toString();
    assertTrue(dataStr.indexOf("Raghupati Raghav") < dataStr.indexOf("Dancing Queen"));
    assertTrue(dataStr.indexOf("Dancing Queen") < dataStr.indexOf("The Boys"));
    assertTrue(dataStr.indexOf("The Boys") < dataStr.indexOf("紅糖水"));
    clientConnection.disconnect();
  }

  /**
   * Tests that songs can be sorted in descending duration order.
   *
   * @throws IOException Issue connecting to server or processing results
   */
  @Test
  public void testSortDescendingDur() throws IOException {
    HttpURLConnection clientConnection =
        tryRequest("sortspotify?duration=descending");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("success", body.get("result"));
    String dataStr = body.get("data").toString();
    assertTrue(dataStr.indexOf("Raghupati Raghav") > dataStr.indexOf("Dancing Queen"));
    assertTrue(dataStr.indexOf("Dancing Queen") > dataStr.indexOf("The Boys"));
    assertTrue(dataStr.indexOf("The Boys") > dataStr.indexOf("紅糖水"));
    clientConnection.disconnect();
  }

  /**
   * Tests that both criteria can be filtered on at once, with weights as set by
   * the developer. This is a meaningful test because neither duration nor popularity
   * take precedence – we weight between the two.
   *
   * @throws IOException Issue connecting to server or processing results
   */
  @Test
  public void testSortCombine() throws IOException {
    HttpURLConnection clientConnection =
        tryRequest("sortspotify?duration=descending&&popularity=descending");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("success", body.get("result"));
    String dataStr = body.get("data").toString();
    assertTrue(dataStr.indexOf("Raghupati Raghav") < dataStr.indexOf("Dancing Queen"));
    assertTrue(dataStr.indexOf("Dancing Queen") < dataStr.indexOf("紅糖水"));
    assertTrue(dataStr.indexOf("紅糖水") < dataStr.indexOf("The Boys"));
    clientConnection.disconnect();
  }

}
