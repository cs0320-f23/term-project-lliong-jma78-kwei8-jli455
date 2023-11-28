package edu.brown.cs.student.main.Database.Creators;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials;
import se.michaelthelin.spotify.model_objects.specification.Recommendations;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;
import org.apache.hc.core5.http.ParseException;
import se.michaelthelin.spotify.requests.data.browse.GetRecommendationsRequest;


public class SpotifyCreators {
  private String accessToken;
  private static final String clientId = "72aa9cc60cbc4d5ea9cc70b9056c250f";
  private static final String clientSecret = "a9d7cc6fc9584e58953b740d19a41048";


  private static final SpotifyApi spotifyApi;

  static {
    try {
      spotifyApi = new SpotifyApi.Builder()
          .setClientId(clientId)
          .setClientSecret(clientSecret)
          .setRedirectUri(new URI("http://localhost:323"))
          .setAccessToken("BQB4gWsj28h2sJM_cGjMY0HD-FpXhVt40wqFu_tM2Aj-ORNc9Z2F-nEdcvpFz67kyGwgHV33k0YqO6PQX8GQB6wcckk0E8lINF5kg8POdtqjfo_QKdY")
          .build();
    } catch (URISyntaxException e) {
      throw new RuntimeException(e);
    }
  }

  private static final ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials()
      .build();
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

  public static void getRecommendations_Sync() {
    try {
      final Recommendations recommendations = getRecommendationsRequest.execute();
      System.out.println(recommendations.getTracks()[1]);

      System.out.println("Length: " + recommendations.getTracks().length);
    } catch (IOException | SpotifyWebApiException | ParseException e) {
      System.out.println("Error: " + e.getMessage());
    }
  }

  public static void clientCredentials_Sync() {
    try {
      final ClientCredentials clientCredentials = clientCredentialsRequest.execute();

      // Set access token for further "spotifyApi" object usage
      spotifyApi.setAccessToken(clientCredentials.getAccessToken());

      System.out.println("Expires in: " + clientCredentials.getExpiresIn());
      System.out.println(clientCredentials.getAccessToken());
    } catch (SpotifyWebApiException | ParseException | IOException e) {
      System.out.println("Error: " + e.getMessage());
    }
  }



}
