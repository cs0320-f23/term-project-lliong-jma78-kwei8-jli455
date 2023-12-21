package edu.brown.cs.student.TestBusinesses;

import edu.brown.cs.student.main.Business.BusinessRanker;
import edu.brown.cs.student.main.Business.SearchBusiness;
import edu.brown.cs.student.main.Business.WebScraper.Category;
import edu.brown.cs.student.main.Business.WebScraper.YelpApiResponse;
import java.util.Arrays;
import java.util.HashMap;
import org.junit.jupiter.api.Test;
import org.testng.Assert;

public class TestBusiness {

  /**
   * Unit test for searching function.
   */
  @Test
  public void testSearch() {
    HashMap<String, YelpApiResponse> map = new HashMap<>();
    YelpMocks yelpMocks = new YelpMocks();

    map.put(
        "Hydroflask",
        yelpMocks.createSampleYelpApiResponse(
            "Hydroflask", "400", "4.0", Arrays.asList(new Category("thai", "thai"))));
    map.put(
        "Hannah",
        yelpMocks.createSampleYelpApiResponse(
            "Hannah", "511", "5.0", Arrays.asList(new Category("korean", "korean"))));

    SearchBusiness searcher = new SearchBusiness();

    Assert.assertEquals(1, searcher.search("thai", map).size());
    Assert.assertEquals(0, searcher.search("japanese", map).size());
    Assert.assertEquals(2, searcher.search("restaurants", map).size());
  }

  /**
   * Unit test for rankings
   */
  @Test
  public void testRank() {
    HashMap<String, YelpApiResponse> map = new HashMap<>();
    YelpMocks yelpMocks = new YelpMocks();
    map.put(
        "Hydroflask",
        yelpMocks.createSampleYelpApiResponse(
            "Hydroflask", "400", "4.0", Arrays.asList(new Category("thai", "thai"))));
    map.put(
        "Hannah",
        yelpMocks.createSampleYelpApiResponse(
            "Hannah", "511", "5.0", Arrays.asList(new Category("korean", "korean"))));
    BusinessRanker ranker = new BusinessRanker();
    Assert.assertEquals(ranker.computeWeightedRank(map.get("Hannah")), 105.7);
    Assert.assertEquals(ranker.computeWeightedRank(map.get("Hydroflask")), 83);
  }
}
