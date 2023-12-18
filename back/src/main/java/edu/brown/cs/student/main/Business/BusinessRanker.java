package edu.brown.cs.student.main.Business;

import edu.brown.cs.student.main.Business.WebScraper.YelpApiResponse;
import java.util.Comparator;

public class BusinessRanker implements Comparator<YelpApiResponse> {

  public BusinessRanker() {}

  public Double computeWeightedRank(YelpApiResponse business) {
    try {
      Double weightedRating = Double.parseDouble(business.businesses().get(0).rating()) * 0.5;
      Double weightedReview = Double.parseDouble(business.businesses().get(0).review_count()) * 0.4;
      Integer weightedTransactions = business.businesses().get(0).categories().size();
      System.out.println(business.businesses().get(0).name());
      System.out.println(weightedRating + weightedReview + weightedTransactions);

      return weightedRating + weightedReview + weightedTransactions;

    } catch (Exception e) {
      System.out.println("EXCEPTION: " + business.businesses().get(0).name());
      System.out.println(e.getMessage());
      return 0.0;
    }
  }

  @Override
  public int compare(YelpApiResponse o1, YelpApiResponse o2) {
    return Double.compare(this.computeWeightedRank(o1), this.computeWeightedRank(o2));
  }
}
