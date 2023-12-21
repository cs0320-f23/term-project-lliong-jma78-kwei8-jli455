package edu.brown.cs.student.main.Server.Handlers;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import edu.brown.cs.student.main.Business.SearchBusiness;
import edu.brown.cs.student.main.Business.WebScraper;
import edu.brown.cs.student.main.Business.WebScraper.YelpApiResponse;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * Handles the business endpoint
 */
public class BusinessHandler implements Route {

  private HashMap<String, YelpApiResponse> scrapedData;

  /**
   * Handles the /business endpoint. Check for certain keywords and calls appropriate functions
   * @param request is the request
   * @param response is the response
   * @return a json with the response information
   * @throws Exception if error
   */

  @Override
  public Object handle(Request request, Response response) throws Exception {
    try {
      Moshi moshi = new Moshi.Builder().build();
      Type mapObject = Types.newParameterizedType(Map.class, String.class, YelpApiResponse.class);
      JsonAdapter<HashMap<String, YelpApiResponse>> adapter = moshi.adapter(mapObject);
      if (this.scrapedData == null) {
        WebScraper scraper = new WebScraper();
        this.scrapedData = scraper.getBusinessInfo();
      }
      if (request.queryParams("searchTerm") != null && this.scrapedData != null) {
        Type listYelp = Types.newParameterizedType(List.class, YelpApiResponse.class);
        JsonAdapter<List<YelpApiResponse>> adapter1 = moshi.adapter(listYelp);
        SearchBusiness searcher = new SearchBusiness();
        List<YelpApiResponse> filtered =
            searcher.search(request.queryParams("searchTerm"), this.scrapedData);
        return adapter1.toJson(filtered);
      }
      return adapter.toJson(this.scrapedData);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return "error";
  }
}
