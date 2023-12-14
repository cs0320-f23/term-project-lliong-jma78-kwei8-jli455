package edu.brown.cs.student.main.Creators.Spotify.Recommendations;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.specification.ArtistSimplified;
import se.michaelthelin.spotify.model_objects.specification.Recommendations;
import se.michaelthelin.spotify.model_objects.specification.Track;
import org.apache.hc.core5.http.ParseException;
import se.michaelthelin.spotify.requests.data.browse.GetRecommendationsRequest;


public class SpotifyCreators implements SpotifyData {
  private static SpotifyApi spotifyApi;

  public SpotifyCreators(SpotifyApi internalApi) {
    this.spotifyApi = internalApi;
  }

  public List<Map<String, Object>> getRecommendations_Sync(
      Integer numSongs, List<String> reqGenres) {
    List<Map<String, Object>> retList = new ArrayList<>();
    try {
      for (String oneGenre : reqGenres) {
        GetRecommendationsRequest getRecommendationsRequest = this.spotifyApi.getRecommendations()
            .limit(numSongs)
            .seed_genres(oneGenre)
            .min_popularity(10)
            .build();
        Recommendations recommendations = getRecommendationsRequest.execute();

        Track[] returnedTracks = recommendations.getTracks();
        for (Track oneTrack : returnedTracks) {
          Map<String, Object> mapTrack = new HashMap<>();
          mapTrack.put("name", oneTrack.getName());
          mapTrack.put("genre", oneGenre);

          List<String> artistNames = new ArrayList<>();
          for (ArtistSimplified oneArtist : oneTrack.getArtists()){
            artistNames.add(oneArtist.getName());
          }

          mapTrack.put("artists", artistNames);
          mapTrack.put("album", oneTrack.getAlbum().getName());

          mapTrack.put("popularity", oneTrack.getPopularity());

          Integer trackDuration = oneTrack.getDurationMs();
          mapTrack.put("MSDuration", trackDuration);

          int sDuration = trackDuration / 1000;
          Integer minutes = sDuration / 60;
          Integer seconds = sDuration % 60;
          int zeroCheck = seconds.toString().length();
          if (zeroCheck == 1) {
            mapTrack.put("duration", minutes + ":0" + seconds);
          } else {
            mapTrack.put("duration", minutes + ":" + seconds);
          }

          retList.add(mapTrack);
        }
      }
    } catch (IOException | SpotifyWebApiException | ParseException e) {
      System.out.println("Error: " + e.getMessage());
    }

    Collections.shuffle(retList);

    return retList;
  }
}