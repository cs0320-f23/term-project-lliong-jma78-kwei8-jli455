package edu.brown.cs.student.main.Server.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Creators.Spotify.Recommendations.SpotifyCreators;
import edu.brown.cs.student.main.Creators.Spotify.Recommendations.SpotifyData;
import edu.brown.cs.student.main.Creators.Spotify.Recommendations.SpotifyMock;
import edu.brown.cs.student.main.Creators.Spotify.SpotifyAccess;
import edu.brown.cs.student.main.Creators.Spotify.VerifyGenres.SpotifyGenre;
import edu.brown.cs.student.main.Creators.Spotify.VerifyGenres.SpotifyGenreMock;
import edu.brown.cs.student.main.Creators.Spotify.VerifyGenres.SpotifyValidGenres;
import edu.brown.cs.student.main.Server.Server;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import org.apache.hc.core5.http.ParseException;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import spark.Request;
import spark.Response;
import spark.Route;

/** Class to handle standard spotify data requests */
public class SpotifyHandler implements Route {

  private String[] reqGenres;
  private SpotifyGenre spotifyGenreCheck;
  private SpotifyData spotify;

  /**
   * Standard constructor
   *
   * @throws IOException Issue with request
   * @throws ParseException Issue with parsing request
   * @throws SpotifyWebApiException Backend issue with wrapped object
   */
  public SpotifyHandler() throws IOException, ParseException, SpotifyWebApiException {
    SpotifyApi internalApi = new SpotifyAccess().getSpotifyApi();
    this.spotify = new SpotifyCreators(internalApi);
    this.spotifyGenreCheck = new SpotifyValidGenres(internalApi);
  }

  /**
   * Constructor that enables acceptance of mocks
   *
   * @throws IOException Issue with request
   * @throws ParseException Issue with parsing request
   * @throws SpotifyWebApiException Backend issue with wrapped object
   */
  public SpotifyHandler(Boolean mock) throws IOException, ParseException, SpotifyWebApiException {
    if (mock) {
      this.spotify = new SpotifyMock();
      this.spotifyGenreCheck = new SpotifyGenreMock();
    } else {
      SpotifyApi internalApi = new SpotifyAccess().getSpotifyApi();
      this.spotify = new SpotifyCreators(internalApi);
      this.spotifyGenreCheck = new SpotifyValidGenres(internalApi);
    }
  }

  // Regex for comma-splitting of a string
  // Credit goes to the CS32 Staff Team!
  static final Pattern regexSplitCSVRow =
      Pattern.compile(",(?=([^\\\"]*\\\"[^\\\"]*\\\")*(?![^\\\"]*\\\"))");

  /**
   * Dispatch various endpoint requests
   *
   * @param request user request
   * @param response response parameter
   * @return json object containing requested data
   * @throws IOException issue parsing request
   */
  @Override
  public Object handle(Request request, Response response) {
    Moshi moshi = new Moshi.Builder().build();
    Type mapObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapObject);
    Map<String, Object> responseMap = new HashMap<>();

    String reqGenres = request.queryParams("genres");
    String reqNum = request.queryParams("numsongs");

    if ((reqGenres == null) && (reqNum == null)) {
      String[] defaultGenres = {"indian", "j-pop", "mandopop"};
      List<Map<String, Object>> retrievedSongs =
          spotify.getRecommendations_Sync(10, Arrays.asList(defaultGenres));
      responseMap.put("data", retrievedSongs);
      Server.setCurrSongs(retrievedSongs);
      responseMap.put("validgenres", Arrays.asList(defaultGenres));
    } else if (reqGenres == null) { // Num provided
      String[] defaultGenres = {"indian", "j-pop", "mandopop"};
      try {
        List<Map<String, Object>> retrievedSongs =
            spotify.getRecommendations_Sync(Integer.valueOf(reqNum), Arrays.asList(defaultGenres));
        responseMap.put("data", retrievedSongs);
        Server.setCurrSongs(retrievedSongs);
        responseMap.put("validgenres", Arrays.asList(defaultGenres));
      } catch (NumberFormatException e) {
        responseMap.put("result", "error");
        responseMap.put("details", "Number of songs must be an integer value");
        return adapter.toJson(responseMap);
      }
    } else {
      this.reqGenres = regexSplitCSVRow.split(request.queryParams("genres"));
      List<String> reqGenList = Arrays.asList(this.reqGenres);
      Map<String, List<String>> checkedGens =
          this.spotifyGenreCheck.checkAvailableGenres(reqGenList);
      List<String> validGens = checkedGens.get("valid");
      List<String> invalidGens = checkedGens.get("invalid");
      responseMap.put("invalidgenres", invalidGens);
      responseMap.put("validgenres", validGens);

      if (validGens.size() == 0) {
        responseMap.put("result", "error");
        responseMap.put("details", "no valid genres requested");
        return adapter.toJson(responseMap);
      } else if (reqNum == null) {
        List<Map<String, Object>> retrievedSongs = spotify.getRecommendations_Sync(10, validGens);
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
