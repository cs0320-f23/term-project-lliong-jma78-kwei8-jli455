package edu.brown.cs.student.main.Server.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Database.Creators.SubmittedCreators;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class CreatorHandler implements Route {

  private final List<Map> collatedDatabase;

  public CreatorHandler() {
    SubmittedCreators submittedData =
        new SubmittedCreators(
            List.of(
                Map.of("name", "my business", "location", "Providence"),
                Map.of("name", "second", "location", "Second location")));
    this.collatedDatabase = submittedData.getSubmittedDatabase();
  }

  @Override
  public Object handle(Request request, Response response) {
    Moshi moshi = new Moshi.Builder().build();
    Type mapObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapObject);
    Map<String, Object> responseMap = new HashMap<>();

    responseMap.put("data", this.collatedDatabase);
    responseMap.put("status", "success");

    return adapter.toJson(responseMap);
  }
}
