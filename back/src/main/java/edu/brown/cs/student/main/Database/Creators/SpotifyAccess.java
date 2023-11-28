package edu.brown.cs.student.main.Database.Creators;

import java.io.IOException;
import org.apache.hc.core5.http.ParseException;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;


public class SpotifyAccess {

  private static final String clientId = "72aa9cc60cbc4d5ea9cc70b9056c250f";
  private static final String clientSecret = "a9d7cc6fc9584e58953b740d19a41048";
  private static final SpotifyApi spotifyApi = new SpotifyApi.Builder()
      .setClientId(clientId)
      .setClientSecret(clientSecret)
      .build();
  private static final ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials()
      .build();


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

  public SpotifyApi getSpotifyApi() {
    this.clientCredentials_Sync();
    return this.spotifyApi;
  }
}
