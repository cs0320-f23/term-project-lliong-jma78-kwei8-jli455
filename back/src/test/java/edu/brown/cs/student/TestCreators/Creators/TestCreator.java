package edu.brown.cs.student.TestCreators.Creators;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Server.Handlers.CreatorHandler;
import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import okio.Buffer;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import spark.Spark;

public class TestCreator {

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
  public void setup() {
    Spark.get("creators", new CreatorHandler("data/MockData.csv"));
    Spark.init();
    Spark.awaitInitialization();
  }

  /** Gracefully tears down the port. */
  @AfterEach
  public void teardown() {
    // Gracefully stop Spark listening on both endpoints
    Spark.unmap("creators");
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
   * Tests that creators can be retrieved
   *
   * @throws IOException Issue connecting to server or processing results
   */
  @Test
  public void testGetCreator() throws IOException {
    HttpURLConnection clientConnection = tryRequest("creators");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("success", body.get("result"));
    assertTrue(body.get("data").toString().contains("Chun Wai Chan"));
    assertFalse(body.get("data").toString().contains("null"));

    clientConnection.disconnect();
  }

  /**
   * Tests that creators can be added and deleted
   *
   * @throws IOException Issue connecting to server or processing results
   */
  @Test
  public void testAddDelCreator() throws IOException {
    HttpURLConnection clientConnection =
        tryRequest("creators?action=add&&name=Karis&&description=help%20me");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("success", body.get("result"));
    String foundID = body.get("ID").toString().substring(0, 3);

    HttpURLConnection clientConnection1 = tryRequest("creators");
    assertEquals(200, clientConnection1.getResponseCode());

    Map<String, Object> body1 =
        adapter.fromJson(new Buffer().readFrom(clientConnection1.getInputStream()));

    assertEquals("success", body1.get("result"));
    assertTrue(body1.get("data").toString().contains("Chun Wai Chan"));
    assertFalse(body1.get("data").toString().contains("null"));
    assertTrue(body1.get("data").toString().contains("Karis"));
    assertTrue(body1.get("data").toString().contains("help me"));

    HttpURLConnection clientConnection2 = tryRequest("creators?action=delete&&id=" + foundID);
    assertEquals(200, clientConnection2.getResponseCode());

    Map<String, Object> body2 =
        adapter.fromJson(new Buffer().readFrom(clientConnection2.getInputStream()));

    assertEquals("success", body2.get("result"));
    assertEquals("successfully deleted " + foundID, body2.get("details"));

    clientConnection.disconnect();
    clientConnection1.disconnect();
    clientConnection2.disconnect();
  }

  /**
   * Tests that relevant error is reported upon delete of nonexistent creator
   *
   * @throws IOException Issue connecting to server or processing results
   */
  @Test
  public void testDelNoCreator() throws IOException {
    HttpURLConnection clientConnection = tryRequest("creators?action=delete&&id=0");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("error", body.get("result"));
    assertEquals("id provided was not found", body.get("details"));
    clientConnection.disconnect();
  }

  /**
   * Tests that creators can be searched in order
   *
   * @throws IOException Issue connecting to server or processing results
   */
  @Test
  public void testSearchCreator() throws IOException {
    HttpURLConnection clientConnection = tryRequest("creators?action=search&&searchterm=dancer");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));

    assertEquals("success", body.get("result"));
    String dataStr = body.get("data").toString();
    assertTrue(dataStr.indexOf("DanCer") < dataStr.indexOf("178"));
    assertTrue(dataStr.indexOf("178") < dataStr.indexOf("902"));
    assertTrue(dataStr.indexOf("902") < dataStr.indexOf("319"));
    assertTrue(dataStr.indexOf("319") < dataStr.indexOf("848"));
    assertFalse(body.get("data").toString().contains("Yayoi"));

    clientConnection.disconnect();
  }
}
