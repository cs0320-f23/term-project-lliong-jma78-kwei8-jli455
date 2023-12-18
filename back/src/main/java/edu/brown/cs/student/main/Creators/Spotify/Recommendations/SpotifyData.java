package edu.brown.cs.student.main.Creators.Spotify.Recommendations;

import java.util.List;
import java.util.Map;

/** Interface holding spotify song recommendation dat */
public interface SpotifyData {

  /**
   * Method to get song recommendations
   *
   * @param numSongs number of songs in each genre
   * @param reqGenres genres requested
   * @return map of response status, song recommendations, and valid/invalid genres
   */
  List<Map<String, Object>> getRecommendations_Sync(Integer numSongs, List<String> reqGenres);
}
