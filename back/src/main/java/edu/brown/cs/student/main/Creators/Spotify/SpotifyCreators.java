package edu.brown.cs.student.main.Creators.Spotify;

import edu.brown.cs.student.main.Creators.Spotify.SpotifyAccess;
import java.io.IOException;
import java.util.ArrayList;
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


public class SpotifyCreators {
  private String accessToken = spotifyApi.getAccessToken();

  private static final SpotifyApi spotifyApi = new SpotifyAccess().getSpotifyApi();

//  {
//    try {
//      spotifyApi = new SpotifyApi.Builder()
//          .setClientId(clientId)
//          .setClientSecret(clientSecret)
//          .setRedirectUri(new URI("http://localhost:323"))
//          .setAccessToken(this.spotAccess.clientCredentials_Sync());
//          .build();
//    } catch (URISyntaxException e) {
//      throw new RuntimeException(e);
//    }
//  }

  public static Map<String, List<Map<String, Object>>> getRecommendations_Sync(
      Integer numSongs, String[] reqGenres) {
    Map<String, List<Map<String, Object>>> retMap = new HashMap<>();

    try {
      for (String oneGenre : reqGenres) {
        GetRecommendationsRequest getRecommendationsRequest = spotifyApi.getRecommendations()
            .limit(numSongs)
            .seed_genres(oneGenre)
            .build();
        Recommendations recommendations = getRecommendationsRequest.execute();

        Track[] returnedTracks = recommendations.getTracks();
        List<Map<String, Object>> editedTracks = new ArrayList<>();
        for (Track oneTrack : returnedTracks) {
          Map<String, Object> mapTrack = new HashMap<>();
          mapTrack.put("name", oneTrack.getName());

          List<String> artistNames = new ArrayList<>();
          for (ArtistSimplified oneArtist : oneTrack.getArtists()){
            artistNames.add(oneArtist.getName());
          }

          mapTrack.put("artists", artistNames);
          mapTrack.put("album", oneTrack.getAlbum().getName());

          mapTrack.put("popularity", oneTrack.getPopularity());
          mapTrack.put("duration", oneTrack.getDurationMs());

          editedTracks.add(mapTrack);
        }

        retMap.put(oneGenre, editedTracks);
      }
    } catch (IOException | SpotifyWebApiException | ParseException e) {
      System.out.println("Error: " + e.getMessage());
    }

    return retMap;
  }
}