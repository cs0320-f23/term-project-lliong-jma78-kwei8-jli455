package edu.brown.cs.student.main.Business;

import edu.brown.cs.student.main.Business.WebScraper.Category;
import edu.brown.cs.student.main.Business.WebScraper.YelpApiResponse;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Class that searches/filters for businesses that match the search term.
 */
public class SearchBusiness {
  private static Set<String> cuisines;
  private static Set<String> groceries;
  private static Set<String> services;
  private List<YelpApiResponse> filteredBus;

  public SearchBusiness() {
    services = new HashSet<>();
    services.add("photography");
    services.add("photo");
    services.add("venues");

    cuisines = new HashSet<>();
    cuisines.add("chinese");
    cuisines.add("chinese food");
    cuisines.add("chinese restaurants");
    cuisines.add("thai");
    cuisines.add("japanese");
    cuisines.add("filipino");
    cuisines.add("vietnamese");
    cuisines.add("korean");
    cuisines.add("new american");
    cuisines.add("asian");
    cuisines.add("coffee");
    cuisines.add("tea");

    groceries = new HashSet<>();
    groceries.add("grocery");
    groceries.add("groceries");
    groceries.add("international grocery");
    groceries.add("supermarket");
  }

  /**
   * Calls the appropriate search function based on the search term
   * @param term is the user input
   * @param map is the backend's copy of the data
   * @return a ranked list of businesses that match the criteria
   */
  public List<YelpApiResponse> search(String term, HashMap<String, YelpApiResponse> map) {
    try {
      term = term.toLowerCase();
      this.filteredBus = new ArrayList<>();
      if (term.equals("restaurants")) {
        this.getRestos(map);
      }
      if (term.equals("services")) {
        this.getServices(map);
      }

      if (term.equals("groceries")) {
        this.getGroceries(map);
      }
      else {
        this.generalSearch(map, term);
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    Collections.sort(this.filteredBus, Collections.reverseOrder(new BusinessRanker()));
    return this.filteredBus;
  }

  /**
   * Searches the backend for the term
   * @param map is the backend's copy of the data
   * @param term is the user input
   */
  private void generalSearch(HashMap<String, YelpApiResponse> map, String term) {
    for (YelpApiResponse response : map.values()) {
      if (response.businesses().size() != 0) {
        if (response.businesses().get(0).name().toLowerCase().contains(term)
            || response.businesses().get(0).location().city().toLowerCase().contains(term)) {
          this.filteredBus.add(response);
        } else {
          for (Category category : response.businesses().get(0).categories()) {
            if (term.contains(category.title().toLowerCase())) {
              this.filteredBus.add(response);
            }
          }
        }
      }
    }
  }

  /**
   * Gets all the businesses that are restaurants
   * @param map is the backend's copy of the data
   */
  private void getRestos(HashMap<String, YelpApiResponse> map) {
    for (YelpApiResponse response : map.values()) {
      if (response.businesses().size() != 0) {
        String[] splitName = response.businesses().get(0).name().split(" ");
        for (String string : splitName) {
          if (this.cuisines.contains(string.toLowerCase())) {
            if (!this.filteredBus.contains(response)) {
              this.filteredBus.add(response);
            }
          }
        }
        if (!this.filteredBus.contains(response)) {
          for (Category category : response.businesses().get(0).categories()) {
            String[] splitCategory = category.title().split(" ");
            for (String string : splitCategory) {
              if (this.cuisines.contains(string.toLowerCase())) {
                if (!this.filteredBus.contains(response)) {
                  this.filteredBus.add(response);
                }
              }
            }
          }
        }
      }
    }
  }

  /**
   * Gets all the businesses that are services
   * @param map is the backend's copy of the data
   */
  private void getServices(HashMap<String, YelpApiResponse> map) {
    for (YelpApiResponse response : map.values()) {
      if (response.businesses().size() != 0) {
        String[] splitName = response.businesses().get(0).name().split(" ");
        for (String string : splitName) {
          if ((this.services.contains(string.toLowerCase())
              && (!this.filteredBus.contains(response)))) {
            this.filteredBus.add(response);
          }
        }
        for (Category category : response.businesses().get(0).categories()) {
          String[] splitCategory = category.title().split(" ");
          for (String string : splitCategory) {
            if ((this.services.contains(string.toLowerCase())
                && (!this.filteredBus.contains(response)))) {
              this.filteredBus.add(response);
            }
          }
        }
      }
    }
  }

  /**
   * Gets all the businesses that are grocery stores
   * @param map is the backend's copy of the data
   */
  private void getGroceries(HashMap<String, YelpApiResponse> map) {
    for (YelpApiResponse response : map.values()) {
      if (response.businesses().size() != 0) {
        String[] splitName = response.businesses().get(0).name().split(" ");
        for (String string : splitName) {
          if (this.groceries.contains(string.toLowerCase())
              && (!this.filteredBus.contains(response))) {
            this.filteredBus.add(response);
          }
        }
        for (Category category : response.businesses().get(0).categories()) {
          String[] splitCategory = category.title().split(" ");
          for (String string : splitCategory) {
            if (this.groceries.contains(string.toLowerCase())
                && (!this.filteredBus.contains(response))) {
              this.filteredBus.add(response);
            }
          }
        }
      }
    }
  }
}
