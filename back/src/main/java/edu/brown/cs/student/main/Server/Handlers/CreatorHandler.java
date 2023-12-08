package edu.brown.cs.student.main.Server.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Creators.Submitted.SubmittedCreators;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

public class CreatorHandler implements Route {
  private static SubmittedCreators submittedCreators;

  public CreatorHandler(String filepath) {
    this.submittedCreators =
        new SubmittedCreators(filepath);
  }

  private String getAttr(String requestVal) {
    if (requestVal == null) {
      return "null";
    }
    return requestVal;
  }

  // TODO: optimise by not making it fetch if no writes have happened
  @Override
  public Object handle(Request request, Response response) throws IOException {
    Moshi moshi = new Moshi.Builder().build();
    Map<String, Object> responseMap = new HashMap<>();

    String reqAction = request.queryParams("action");
    Type mapObject = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> adapter = moshi.adapter(mapObject);

    if (reqAction == null) {
      responseMap.put("data", this.submittedCreators.getDatabase());
      responseMap.put("result", "success");

      return adapter.toJson(responseMap);
    } else if (reqAction.equals("add")) {
      String name = getAttr(request.queryParams("name"));
      String type = getAttr(request.queryParams("type"));
      String price = getAttr(request.queryParams("price"));
      String description = getAttr(request.queryParams("description"));
      String instagram = getAttr(request.queryParams("instagram"));
      String facebook = getAttr(request.queryParams("facebook"));
      String website = getAttr(request.queryParams("website"));
      String spotify = getAttr(request.queryParams("spotify"));

      String creatorStr = name + "," + type + "," + price + "," + description + "," + instagram + "," +
          facebook + "," + website + "," + spotify;
      Integer uniqueID = this.submittedCreators.addCreator(creatorStr);
      responseMap.put("result", "success");
      responseMap.put("ID", uniqueID);

      return adapter.toJson(responseMap);
    } else if (reqAction.equals("delete")) {
      String id = request.queryParams("id");
      if (id == null) {
        responseMap.put("result", "error");
        responseMap.put("details", "no id provided to delete");
        return adapter.toJson(responseMap);
      } else {
        Boolean retBool = this.submittedCreators.deleteCreator(id);
        if (retBool) {
          responseMap.put("result", "success");
          responseMap.put("details", "successfully deleted " + id);
          return adapter.toJson(responseMap);
        } else {
          responseMap.put("result", "error");
          responseMap.put("details", "id provided was not found");
          return adapter.toJson(responseMap);
        }
      }
    } else if (reqAction.equals("filtertype")) {
      String type = request.queryParams("type");
      if (type == null) {
        responseMap.put("result", "error");
        responseMap.put("details", "no type provided to filter on");
        return adapter.toJson(responseMap);
      } else {
        List<Map<String, String>> retData = this.submittedCreators.getTypeDatabase(type);
        responseMap.put("result", "success");
        responseMap.put("data", retData);
        return adapter.toJson(responseMap);
      }
    }


    responseMap.put("result", "error");
    responseMap.put("details", "used unspecified action");
    return adapter.toJson(responseMap);
  }
}
