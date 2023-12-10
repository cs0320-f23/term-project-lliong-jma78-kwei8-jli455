package edu.brown.cs.student;

import edu.brown.cs.student.main.Business.BusinessRanker;
import edu.brown.cs.student.main.Business.SearchBusiness;
import edu.brown.cs.student.main.Business.WebScraper.Category;
import edu.brown.cs.student.main.Business.WebScraper.YelpApiResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.testng.Assert;

public class TestBusiness {



  @Test
  public void testSearch() {
    HashMap<String,YelpApiResponse> map = new HashMap<>();
    YelpMocks yelpMocks = new YelpMocks();

    map.put("Hydroflask", yelpMocks.createSampleYelpApiResponse("Hydroflask", "400", "4.0",
        Arrays.asList(new Category("thai", "thai"))));
    map.put("Hannah", yelpMocks.createSampleYelpApiResponse("Hannah", "511", "5.0", Arrays.asList(new Category("korean", "korean"))));

    SearchBusiness searcher = new SearchBusiness();

    Assert.assertEquals(1, searcher.search("thai", map).size());
    Assert.assertEquals(0, searcher.search("japanese", map).size());
    Assert.assertEquals(2, searcher.search("restaurants", map).size());

  }

  @Test
  public void testRank() {
    HashMap<String,YelpApiResponse> map = new HashMap<>();
    YelpMocks yelpMocks = new YelpMocks();

    map.put("Hydroflask", yelpMocks.createSampleYelpApiResponse("Hydroflask", "400", "4.0",
        Arrays.asList(new Category("thai", "thai"))));
    map.put("Hannah", yelpMocks.createSampleYelpApiResponse("Hannah", "511", "5.0", Arrays.asList(new Category("korean", "korean"))));

    BusinessRanker ranker = new BusinessRanker();

    Assert.assertEquals(ranker.computeWeightedRank(map.get("Hannah")), 207.9);
    Assert.assertEquals(ranker.computeWeightedRank(map.get("Hydroflask")), 163.0);



  }

}
