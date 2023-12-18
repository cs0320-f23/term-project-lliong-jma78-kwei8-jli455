package edu.brown.cs.student.main.Creators.Spotify.Recommendations;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/** Mock data for spotify song recommendations */
public class SpotifyMock implements SpotifyData {

  // Javadocs as in interface
  @Override
  public List<Map<String, Object>> getRecommendations_Sync(
      Integer numSongs, List<String> reqGenres) {
    Map<String, Object> song1 = new HashMap<>();
    song1.put("duration", "2:06");
    song1.put("artists", List.of("Alka Yagnik", "Shankar Mahadevan"));
    song1.put("album", "Kuch Kuch Hota Hai");
    song1.put("popularity", 46);
    song1.put("name", "Raghupati Raghav");
    song1.put("genre", "indian");
    song1.put("MSDuration", 126760);

    Map<String, Object> song2 = new HashMap<>();
    song2.put("duration", "3:48");
    song2.put("artists", List.of("Girls' Generation"));
    song2.put("album", "The Boys");
    song2.put("popularity", 18);
    song2.put("name", "The Boys");
    song2.put("genre", "k-pop");
    song2.put("MSDuration", 228880);

    Map<String, Object> song3 = new HashMap<>();
    song3.put("duration", "4:17");
    song3.put("artists", List.of("Chris Yu"));
    song3.put("album", "游鴻明2008情歌金選最終回-新歌+精選終極情歌");
    song3.put("popularity", 13);
    song3.put("name", "紅糖水");
    song3.put("genre", "mandopop");
    song3.put("MSDuration", 257560);

    Map<String, Object> song4 = new HashMap<>();
    song4.put("duration", "3:35");
    song4.put("artists", List.of("Girls' Generation"));
    song4.put("album", "Dancing Queen");
    song4.put("popularity", 33);
    song4.put("name", "Dancing Queen");
    song4.put("genre", "k-pop");
    song4.put("MSDuration", 215280);

    return List.of(song1, song2, song3, song4);
  }
}
