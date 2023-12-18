package edu.brown.cs.student.TestCreators.Spotify;

import static org.junit.jupiter.api.Assertions.assertEquals;

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
import org.apache.commons.lang3.StringUtils;
import org.apache.hc.core5.http.ParseException;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import spark.Spark;

/**
 * Testing class for Spotify API Calls Note that these tests are necessarily minimal – the Spotify
 * API is *very* rate-limited
 */
public class TestSpotifyData {
  private static JsonAdapter<Map<String, Object>> adapter;

  /** Creates a port and Moshi. */
  @BeforeAll
  public static void setupOnce() {
    Spark.port(100);
    Moshi moshi = new Moshi.Builder().build();
    Type mapStringObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    adapter = moshi.adapter(mapStringObject);
  }

  /** Sets up mock handlers */
  @BeforeEach
  public void setup() throws IOException, ParseException, SpotifyWebApiException {
    Spark.get("spotify", new SpotifyHandler());
    Spark.get("sortspotify", new SpotifySortHandler());
    Spark.init();
    Spark.awaitInitialization();
  }

  /** Gracefully tears down the port. */
  @AfterEach
  public void teardown() {
    // Gracefully stop Spark listening on both endpoints
    Spark.unmap("spotify");
    Spark.unmap("sortspotify");
    Spark.awaitStop(); // don't proceed until the server is stopped
  }

  /**
   * Shuts down thread.
   *
   * @throws InterruptedException if interrupted
   */
  @AfterAll
  public static void shutdown() throws InterruptedException {
    Spark.stop();
    Thread.sleep(3000);
  }

  /**
   * Helper to start a connection to a specific API endpoint/params
   *
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
    HttpURLConnection clientConnection = tryRequest("spotify");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("success", body.get("result"));
    assertEquals(List.of("indian", "j-pop", "mandopop"), body.get("validgenres"));
    Integer appearances = StringUtils.countMatches(body.get("data").toString(), "duration");
    assertEquals(30, appearances);
    clientConnection.disconnect();
  }

  /**
   * Tests that the numsongs criteria can be customised
   *
   * @throws IOException Issue connecting to server or processing results
   */
  @Test
  public void testNumResponse() throws IOException {
    HttpURLConnection clientConnection = tryRequest("spotify?numsongs=3");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("success", body.get("result"));
    assertEquals(List.of("indian", "j-pop", "mandopop"), body.get("validgenres"));
    Integer appearances = StringUtils.countMatches(body.get("data").toString(), "duration");
    assertEquals(9, appearances);
    clientConnection.disconnect();
  }

  /**
   * Tests that the genre criteria can be customised
   *
   * @throws IOException Issue connecting to server or processing results
   */
  @Test
  public void testGenreResponse() throws IOException {
    HttpURLConnection clientConnection = tryRequest("spotify?genres=nope,j-pop");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("success", body.get("result"));
    assertEquals(List.of("j-pop"), body.get("validgenres"));
    assertEquals(List.of("nope"), body.get("invalidgenres"));
    Integer appearances = StringUtils.countMatches(body.get("data").toString(), "duration");
    assertEquals(10, appearances);
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
        tryRequest("spotify?genres=nope,j-pop,country&&numsongs=3");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("success", body.get("result"));
    assertEquals(List.of("j-pop", "country"), body.get("validgenres"));
    assertEquals(List.of("nope"), body.get("invalidgenres"));
    Integer appearances = StringUtils.countMatches(body.get("data").toString(), "duration");
    assertEquals(6, appearances);
    clientConnection.disconnect();
  }

  /**
   * Tests that repeated state changes can be performed accurately
   *
   * @throws IOException Issue connecting to server or processing results
   */
  @Test
  public void testCombineAll() throws IOException {
    HttpURLConnection clientConnection =
        tryRequest("spotify?genres=nope,j-pop,country&&numsongs=3");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("success", body.get("result"));
    assertEquals(List.of("j-pop", "country"), body.get("validgenres"));
    assertEquals(List.of("nope"), body.get("invalidgenres"));
    Integer appearances = StringUtils.countMatches(body.get("data").toString(), "duration");
    assertEquals(6, appearances);

    HttpURLConnection clientConnection2 = tryRequest("sortspotify?popularity=descending");
    assertEquals(200, clientConnection2.getResponseCode());

    Map<String, Object> body2 =
        adapter.fromJson(new Buffer().readFrom(clientConnection2.getInputStream()));

    assertEquals("success", body2.get("result"));
    Integer appearances2 = StringUtils.countMatches(body2.get("data").toString(), "duration");
    assertEquals(6, appearances2);

    HttpURLConnection clientConnection3 = tryRequest("spotify?genres=nope,j-pop");
    assertEquals(200, clientConnection3.getResponseCode());

    Map<String, Object> body3 =
        adapter.fromJson(new Buffer().readFrom(clientConnection3.getInputStream()));

    assertEquals("success", body3.get("result"));
    assertEquals(List.of("j-pop"), body3.get("validgenres"));
    assertEquals(List.of("nope"), body3.get("invalidgenres"));
    Integer appearances3 = StringUtils.countMatches(body3.get("data").toString(), "duration");
    assertEquals(10, appearances3);

    clientConnection.disconnect();
    clientConnection2.disconnect();
    clientConnection3.disconnect();
  }
}
