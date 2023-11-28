package edu.brown.cs.student.main.Server.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Database.Creators.SpotifyCreators;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;
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
    spotify.clientCredentials_Sync();
    spotify.getRecommendations_Sync();
    String accessToken = "hello";

    responseMap.put("result", "success");
    responseMap.put("data", accessToken);
    return adapter.toJson(responseMap);
  }
}
