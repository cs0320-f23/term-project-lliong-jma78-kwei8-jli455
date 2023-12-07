package edu.brown.cs.student.main.Server;

import static spark.Spark.after;

import edu.brown.cs.student.main.Creators.Spotify.SpotifySorting;
import edu.brown.cs.student.main.Server.Handlers.BusinessHandler;
import edu.brown.cs.student.main.Server.Handlers.CreatorHandler;
import edu.brown.cs.student.main.Server.Handlers.SpotifyHandler;
import edu.brown.cs.student.main.Server.Handlers.SpotifySortHandler;
import java.util.List;
import java.util.Map;
import spark.Spark;

/** Server class to accept user requests and pass them to the appropriate user */
public class Server {
  private static List<Map<String, Object>> currSongs = null;

  /**
   * Main class to handle user input
   *
   * @param args No args should be provided directly
   */
  public static void main(String[] args) {
    // Start a port, perform setup
    int port = 323;
    Spark.port(port);
    after(
        (request, response) -> {
          response.header("Access-Control-Allow-Origin", "*");
          response.header("Access-Control-Allow-Methods", "*");
        });

    Spark.get("creators", new CreatorHandler(
        "data/SubmittedData.csv"));
    Spark.get("business", new BusinessHandler());
    Spark.get("spotify", new SpotifyHandler());
    Spark.get("sortspotify", new SpotifySortHandler());

    // Wait for initialisation
    Spark.init();
    Spark.awaitInitialization();

    System.out.println("Server started at http://localhost:" + port);
  }

  public static void setCurrSongs(List<Map<String, Object>> newSongs) {
    currSongs = newSongs;
  }

  public static List<Map<String, Object>> getCurrSongs() {
    return currSongs;
  }
}
