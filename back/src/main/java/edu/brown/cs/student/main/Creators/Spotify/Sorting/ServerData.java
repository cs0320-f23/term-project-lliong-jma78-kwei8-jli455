package edu.brown.cs.student.main.Creators.Spotify.Sorting;

import edu.brown.cs.student.main.Server.Server;
import java.util.List;
import java.util.Map;

/** Class to obtain current loaded songs */
public class ServerData implements SortingData {

  // Javadocs as per interface
  @Override
  public List<Map<String, Object>> getCurrData() {
    return Server.getCurrSongs();
  }
}
