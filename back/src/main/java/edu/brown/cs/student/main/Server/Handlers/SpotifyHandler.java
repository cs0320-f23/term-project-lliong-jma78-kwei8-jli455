package edu.brown.cs.student.main.Server.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Database.Creators.SpotifyCreators;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import se.michaelthelin.spotify.model_objects.specification.AlbumSimplified;
import se.michaelthelin.spotify.model_objects.specification.ArtistSimplified;
import se.michaelthelin.spotify.model_objects.specification.Track;
import spark.Request;
import spark.Response;
import spark.Route;

public class SpotifyHandler implements Route {

  @Override
  public Object handle(Request request, Response response) throws Exception {
    Moshi moshi = new Moshi.Builder().build();
    Type mapObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapObject);
    Map<String, Object> responseMap = new HashMap<>();
    SpotifyCreators spotify = new SpotifyCreators();
    Track[] returnedTracks = spotify.getRecommendations_Sync();

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

    responseMap.put("result", "success");
    responseMap.put("data", editedTracks);
    return adapter.toJson(responseMap);
  }
}
