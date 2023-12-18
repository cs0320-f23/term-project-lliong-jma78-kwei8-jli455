package edu.brown.cs.student.TestBusinesses;

import edu.brown.cs.student.main.Business.WebScraper.Business;
import edu.brown.cs.student.main.Business.WebScraper.Category;
import edu.brown.cs.student.main.Business.WebScraper.Center;
import edu.brown.cs.student.main.Business.WebScraper.Coordinates;
import edu.brown.cs.student.main.Business.WebScraper.Location;
import edu.brown.cs.student.main.Business.WebScraper.Region;
import edu.brown.cs.student.main.Business.WebScraper.YelpApiResponse;
import java.util.Arrays;
import java.util.List;

public class YelpMocks {

  public YelpApiResponse createSampleYelpApiResponse(
      String name, String review_count, String rating, List<Category> categories) {
    List<Business> businesses =
        Arrays.asList(createSampleBusiness(name, review_count, rating, categories));
    int total = 1;
    Region region = createSampleRegion();
    return new YelpApiResponse(businesses, total, region);
  }

  public static Business createSampleBusiness(
      String name, String review_count, String rating, List<Category> categories) {
    return new Business(
        "sampleId",
        "sampleAlias",
        name,
        "sampleImageUrl",
        "false",
        "sampleUrl",
        review_count,
        categories,
        rating,
        createSampleCoordinates(),
        Arrays.asList("sampleTransaction"),
        "$$",
        createSampleLocation(),
        "123-456-7890",
        "123-456-7890",
        "1.23 miles");
  }

  public static Category createSampleCategory() {
    return new Category("sampleAlias", "Sample Category");
  }

  public static Coordinates createSampleCoordinates() {
    return new Coordinates(37.7749, -122.4194);
  }

  public static Location createSampleLocation() {
    return new Location(
        "569 Cambridge St",
        null,
        "",
        "San Francisco",
        "94105",
        "USA",
        "CA",
        Arrays.asList("123 Main St", "Suite 456", "San Francisco, CA 94105"));
  }

  public static Region createSampleRegion() {
    return new Region(createSampleCenter());
  }

  public static Center createSampleCenter() {
    return new Center(-122.4194, 37.7749);
  }
}
