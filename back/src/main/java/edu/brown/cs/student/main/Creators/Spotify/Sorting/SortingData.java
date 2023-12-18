package edu.brown.cs.student.main.Creators.Spotify.Sorting;

import java.util.List;
import java.util.Map;

public interface SortingData {

  /**
   * Obtains currently loaded songs
   *
   * @return the currently loaded songs on the server
   */
  List<Map<String, Object>> getCurrData();
}
