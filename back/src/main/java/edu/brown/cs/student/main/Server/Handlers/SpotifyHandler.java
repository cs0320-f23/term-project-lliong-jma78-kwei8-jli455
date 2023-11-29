package edu.brown.cs.student.main.Server.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Database.Creators.SpotifyCreators;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import se.michaelthelin.spotify.model_objects.specification.AlbumSimplified;
import se.michaelthelin.spotify.model_objects.specification.ArtistSimplified;
import se.michaelthelin.spotify.model_objects.specification.Track;
import spark.Request;
import spark.Response;
import spark.Route;

public class SpotifyHandler implements Route {

  private String[] reqGenres;

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
    Moshi moshi = new Moshi.Builder().build();
    Type mapObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapObject);
    Map<String, Object> responseMap = new HashMap<>();
    SpotifyCreators spotify = new SpotifyCreators();

    String reqGenres = request.queryParams("genres");
    String reqNum = request.queryParams("numsongs");

    if ((reqGenres == null) && (reqNum == null)) {
      String[] defaultGenres = {"indian", "k-pop", "mandopop"};
      responseMap.put("data", spotify.getRecommendations_Sync(10, defaultGenres));
    } else if (reqGenres == null) { // Num provided
      String[] defaultGenres = {"indian", "k-pop", "mandopop"};
      try {
        responseMap.put("data",
            spotify.getRecommendations_Sync(Integer.valueOf(reqNum), defaultGenres));
      } catch (NumberFormatException e) {
        responseMap.put("result", "error");
        responseMap.put("details", "Number of songs must be an integer value");
        return adapter.toJson(responseMap);
      }
    } else if (reqNum == null) {
      this.reqGenres = regexSplitCSVRow.split(request.queryParams("genres"));
      responseMap.put("data",
          spotify.getRecommendations_Sync(10, this.reqGenres));

    } else {
      this.reqGenres = regexSplitCSVRow.split(request.queryParams("genres"));
      try {
        responseMap.put("data",
            spotify.getRecommendations_Sync(Integer.valueOf(reqNum), this.reqGenres));
      } catch (NumberFormatException e) {
        responseMap.put("result", "error");
        responseMap.put("details", "Number of songs must be an integer value");
        return adapter.toJson(responseMap);
      }
    }

    responseMap.put("result", "success");
    return adapter.toJson(responseMap);
  }
}
