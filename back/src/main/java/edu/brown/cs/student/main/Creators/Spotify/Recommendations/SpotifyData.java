package edu.brown.cs.student.main.Creators.Spotify.Recommendations;

import java.util.List;
import java.util.Map;

public interface SpotifyData {


  List<Map<String, Object>> getRecommendations_Sync(Integer numSongs, List<String> reqGenres);
}
