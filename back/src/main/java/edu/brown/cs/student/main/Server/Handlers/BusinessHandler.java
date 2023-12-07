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

public class BusinessHandler implements Route {

  private List<YelpApiResponse> scrapedData;

  @Override
  public Object handle(Request request, Response response) throws Exception {
    try {
      Moshi moshi = new Moshi.Builder().build();
      Type mapObject = Types.newParameterizedType(List.class, YelpApiResponse.class);
      JsonAdapter<List<YelpApiResponse>> adapter = moshi.adapter(mapObject);
      if (this.scrapedData == null) {
        WebScraper scraper = new WebScraper();
        this.scrapedData = scraper.getBusinessInfo();
      }
      if (request.queryParams("searchTerm") != null && this.scrapedData != null) {
        System.out.println("flab");
        SearchBusiness searcher = new SearchBusiness();
        List<YelpApiResponse> filtered = searcher.search(request.queryParams("searchTerm"), scrapedData);
        return adapter.toJson(filtered);
      }
      return adapter.toJson(this.scrapedData);

    } catch (Exception e) {
      e.printStackTrace();
    }

    return "error";
  }
}