package edu.brown.cs.student.TestBusinesses;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Business.WebScraper.YelpApiResponse;
import edu.brown.cs.student.main.Server.Handlers.BusinessHandler;
import edu.brown.cs.student.main.Server.Handlers.CreatorHandler;
import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Map;
import okio.Buffer;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import spark.Spark;

public class TestBusinessIntegration {
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
    Spark.get("business", new BusinessHandler());
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
   * Integration test for getting businesses
   * @throws IOException
   */

  @Test
  public void testGetBusiness() throws IOException {
    HttpURLConnection clientConnection = tryRequest("business");
    assertEquals(200, clientConnection.getResponseCode());

    Map<String, Object> body =
        adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
    assertNotNull(body.get("Mae Asian Eatery"));
    assertNotNull(body.get("Myers & Chang"));
    clientConnection.disconnect();
  }

}
