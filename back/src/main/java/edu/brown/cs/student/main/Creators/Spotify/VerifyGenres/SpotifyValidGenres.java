package edu.brown.cs.student.main.Creators.Spotify.VerifyGenres;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.hc.core5.http.ParseException;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.requests.data.browse.miscellaneous.GetAvailableGenreSeedsRequest;

/** Accesses spotify api to check available genres */
public class SpotifyValidGenres implements SpotifyGenre {
  private SpotifyApi sharedSpotifyApi;
  private List<String> availableGenres;

  /**
   * Constructor for checker class
   *
   * @param sharedSpotifyApi wrapped Spotify API
   * @throws IOException Issue with spotify request
   * @throws ParseException Issue parsing request
   * @throws SpotifyWebApiException Issue returned with backend wrapped object
   */
  public SpotifyValidGenres(SpotifyApi sharedSpotifyApi)
      throws IOException, ParseException, SpotifyWebApiException {
    this.sharedSpotifyApi = sharedSpotifyApi;

    GetAvailableGenreSeedsRequest getAvailGenres =
        this.sharedSpotifyApi.getAvailableGenreSeeds().build();
    this.availableGenres = Arrays.asList(getAvailGenres.execute());
  }

  // Javadocs as per interface
  public Map<String, List<String>> checkAvailableGenres(List<String> toCheck) {
    Map<String, List<String>> retMap = new HashMap<>();
    List<String> validList = new ArrayList<>();
    List<String> invalidList = new ArrayList<>();
    for (String oneGenre : toCheck) {
      if (this.availableGenres.contains(oneGenre)) {
        validList.add(oneGenre);
      } else {
        invalidList.add(oneGenre);
      }
    }
    retMap.put("valid", validList);
    retMap.put("invalid", invalidList);
    return retMap;
  }
}
