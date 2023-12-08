package edu.brown.cs.student.main.Server.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Creators.Spotify.SpotifyAccess;
import edu.brown.cs.student.main.Creators.Spotify.SpotifyCreators;
import edu.brown.cs.student.main.Creators.Spotify.SpotifyValidGenres;
import edu.brown.cs.student.main.Server.Server;
import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import se.michaelthelin.spotify.SpotifyApi;
import spark.Request;
import spark.Response;
import spark.Route;

public class SpotifyHandler implements Route {

  private String[] reqGenres;
  private static SpotifyApi internalApi;

  // Regex for comma-splitting of a string
  // Credit goes to the CS32 Staff Team!
  static final Pattern regexSplitCSVRow =
      Pattern.compile(",(?=([^\\\"]*\\\"[^\\\"]*\\\")*(?![^\\\"]*\\\"))");

  /**
   * Elimiate a single instance of leading or trailing double-quote, and replace pairs of double
   * quotes with singles.
   *
   * @param arg the string to process
   * @return the postprocessed string
   */
  public static String postprocess(String arg) {
    return arg
        // Remove extra spaces at beginning and end of the line
        .trim()
        // Remove a beginning quote, if present
        .replaceAll("^\"", "")
        // Remove an ending quote, if present
        .replaceAll("\"$", "")
        // Replace double-double-quotes with double-quotes
        .replaceAll("\"\"", "\"");
  }

  @Override
  public Object handle(Request request, Response response) throws Exception {
    this.internalApi = new SpotifyAccess().getSpotifyApi();

    Moshi moshi = new Moshi.Builder().build();
    Type mapObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapObject);
    Map<String, Object> responseMap = new HashMap<>();
    SpotifyCreators spotify = new SpotifyCreators(this.internalApi);

    String reqGenres = request.queryParams("genres");
    String reqNum = request.queryParams("numsongs");

    if ((reqGenres == null) && (reqNum == null)) {
      String[] defaultGenres = {"indian", "k-pop", "mandopop"};
      List<Map<String, Object>> retrievedSongs =
          spotify.getRecommendations_Sync(10, Arrays.asList(defaultGenres));
      responseMap.put("data", retrievedSongs);
      Server.setCurrSongs(retrievedSongs);
      responseMap.put("valid genres", Arrays.asList(defaultGenres));
    } else if (reqGenres == null) { // Num provided
      String[] defaultGenres = {"indian", "k-pop", "mandopop"};
      try {
        List<Map<String, Object>> retrievedSongs =
            spotify.getRecommendations_Sync(Integer.valueOf(reqNum), Arrays.asList(defaultGenres));
        responseMap.put("data", retrievedSongs);
        Server.setCurrSongs(retrievedSongs);
        responseMap.put("genres", Arrays.asList(defaultGenres));
      } catch (NumberFormatException e) {
        responseMap.put("result", "error");
        responseMap.put("details", "Number of songs must be an integer value");
        return adapter.toJson(responseMap);
      }
    } else {
      this.reqGenres = regexSplitCSVRow.split(request.queryParams("genres"));
      List<String> reqGenList = Arrays.asList(this.reqGenres);
      SpotifyValidGenres genreChecker = new SpotifyValidGenres(this.internalApi);
      Map<String, List<String>> checkedGens = genreChecker.checkAvailableGenres(reqGenList);
      List<String> validGens = checkedGens.get("valid");
      List<String> invalidGens = checkedGens.get("invalid");
      responseMap.put("invalid genres", invalidGens);
      responseMap.put("valid genres", validGens);

      if (validGens.size() == 0) {
        responseMap.put("result", "error");
        responseMap.put("details", "no valid genres requested");
        return adapter.toJson(responseMap);
      } else if (reqNum == null) {
        List<Map<String, Object>> retrievedSongs =
            spotify.getRecommendations_Sync(10, validGens);
        responseMap.put("data", retrievedSongs);
        Server.setCurrSongs(retrievedSongs);
      } else {
        try {
          List<Map<String, Object>> retrievedSongs =
              spotify.getRecommendations_Sync(Integer.valueOf(reqNum), validGens);
          responseMap.put("data", retrievedSongs);
          Server.setCurrSongs(retrievedSongs);
        } catch (NumberFormatException e) {
          responseMap.put("result", "error");
          responseMap.put("details", "Number of songs must be an integer value");
          return adapter.toJson(responseMap);
        }
      }
    }

    responseMap.put("result", "success");
    return adapter.toJson(responseMap);
  }
}
