package edu.brown.cs.student.main.Business;

import edu.brown.cs.student.main.Business.WebScraper.YelpApiResponse;
import java.util.Comparator;

/**
 * Class that ranks businesses based on criteria like reviews and ratings. Implements the
 * Comparator interface so it can compare YelpAPIResponse objects.
 */
public class BusinessRanker implements Comparator<YelpApiResponse> {

  /**
   * Constructor for BusinessRanker.
   */
  public BusinessRanker() {}

  /**
   * Calculates the weighted score of a business
   * @param business is the business it is calculating the score for
   * @return the business's weighted score
   */
  public Double computeWeightedRank(YelpApiResponse business) {
    try {
      Double weightedRating = Double.parseDouble(business.businesses().get(0).rating()) * 0.5;
      Double weightedReview = Double.parseDouble(business.businesses().get(0).review_count()) * 0.2;
      Integer weightedTransactions = business.businesses().get(0).categories().size();
      return weightedRating + weightedReview + weightedTransactions;
    } catch (Exception e) {
      return 0.0;
    }
  }

  /**
   * Compares the weighted ranks of two businesses
   * @param o1 the first object to be compared.
   * @param o2 the second object to be compared.
   * @return a ranked comparison of the YelAPIResponses
   */
  @Override
  public int compare(YelpApiResponse o1, YelpApiResponse o2) {
    return Double.compare(this.computeWeightedRank(o1), this.computeWeightedRank(o2));
  }
}
