package edu.brown.cs.student.main.Creators.Spotify.Sorting;

import edu.brown.cs.student.main.Server.Server;
import java.util.List;
import java.util.Map;

public class ServerData implements SortingData {

  public List<Map<String, Object>> getCurrData() {
    return Server.getCurrSongs();
  }
}
