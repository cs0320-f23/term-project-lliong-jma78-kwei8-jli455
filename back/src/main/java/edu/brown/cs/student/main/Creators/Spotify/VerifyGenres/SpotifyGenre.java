package edu.brown.cs.student.main.Creators.Spotify.VerifyGenres;

import java.util.List;
import java.util.Map;

/** Interface for spotify genre verification */
public interface SpotifyGenre {

  /**
   * Checks which requested genres are available for request
   *
   * @param toCheck genres to check
   * @return map of valid and invalid genres
   */
  Map<String, List<String>> checkAvailableGenres(List<String> toCheck);
}
