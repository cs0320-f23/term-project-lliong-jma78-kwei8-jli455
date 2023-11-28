package edu.brown.cs.student.main.Database.Creators;

import java.io.IOException;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
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

  private static final GetRecommendationsRequest getRecommendationsRequest = spotifyApi.getRecommendations()
          .limit(10)
//          .market(CountryCode.SE)
//          .max_popularity(50)
//          .min_popularity(10)
//          .seed_artists("0LcJLqbBmaGUft1e9Mm8HV")
          .seed_genres("philippines-opm")
//          .seed_tracks("01iyCAUm8EvOFqVWYJ3dVX")
//          .target_popularity(20)
      .build();

  public static Track[] getRecommendations_Sync() {
    try {
      final Recommendations recommendations = getRecommendationsRequest.execute();

      System.out.println(recommendations.getTracks()[1]);

      System.out.println("Length: " + recommendations.getTracks().length);
      return recommendations.getTracks();
    } catch (IOException | SpotifyWebApiException | ParseException e) {
      System.out.println("Error: " + e.getMessage());
    }
    return new Track[0];
  }





}
