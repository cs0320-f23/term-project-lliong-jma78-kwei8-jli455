package edu.brown.cs.student.main.Creators.Spotify;

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

public class SpotifyValidGenres {
  private SpotifyApi sharedSpotifyApi;
  private List<String> availableGenres;

  public SpotifyValidGenres(SpotifyApi sharedSpotifyApi)
      throws IOException, ParseException, SpotifyWebApiException {
    this.sharedSpotifyApi = sharedSpotifyApi;

    GetAvailableGenreSeedsRequest getAvailGenres = this.sharedSpotifyApi.getAvailableGenreSeeds().build();
    this.availableGenres = Arrays.asList(getAvailGenres.execute());
  }

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
