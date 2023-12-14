package edu.brown.cs.student.main.Creators.Spotify.VerifyGenres;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SpotifyGenreMock implements SpotifyGenre {

  @Override
  public Map<String, List<String>> checkAvailableGenres(List<String> toCheck) {
    Map<String, List<String>> retMap = new HashMap<>();
    List<String> validList = new ArrayList<>();
    List<String> invalidList = new ArrayList<>();
    if (toCheck.size() < 2) {
      validList.add(toCheck.get(0));
    } else {
      for (int i = 0; i < toCheck.size(); i ++) {
        if (i == 0) {
          invalidList.add(toCheck.get(i));
        } else {
          validList.add(toCheck.get(i));
        }
      }
    }
    retMap.put("valid", validList);
    retMap.put("invalid", invalidList);
    return retMap;
  }
}
