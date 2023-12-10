package edu.brown.cs.student.main.Server.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Creators.Spotify.SpotifySorting;
import edu.brown.cs.student.main.Server.Server;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import spark.Request;
import spark.Response;
import spark.Route;

public class SpotifySortHandler implements Route {
  private List<Map<String, Object>> toSort = null;

  @Override
  public Object handle(Request request, Response response) {
    Moshi moshi = new Moshi.Builder().build();
    Type mapObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapObject);
    Map<String, Object> responseMap = new HashMap<>();
    this.toSort = Server.getCurrSongs();
    if (this.toSort == null) {
      responseMap.put("result", "error");
      responseMap.put("details", "no songs searched – please search before sorting");
      return adapter.toJson(responseMap);
    }
    SpotifySorting sorter = new SpotifySorting();

    String reqPop = request.queryParams("popularity");
    String reqDur = request.queryParams("duration");

    if ((reqPop == null) && (reqDur == null)) {
      responseMap.put("result", "error");
      responseMap.put("details", "no sorting parameters provided");
      return adapter.toJson(responseMap);
    } else if ((reqDur == null)) {
      responseMap.put("data", sorter.sortPopularity(reqPop, this.toSort));
    } else if ((reqPop == null)) {
      responseMap.put("data", sorter.sortDuration(reqDur, this.toSort));
    } else {
      responseMap.put("data", sorter.sortBoth(reqPop, reqDur, 1, 1, this.toSort));
    }

    responseMap.put("result", "success");
    return adapter.toJson(responseMap);
  }

}
