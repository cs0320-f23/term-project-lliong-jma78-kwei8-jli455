package edu.brown.cs.student.main.Business;

import edu.brown.cs.student.main.Business.WebScraper.Category;
import edu.brown.cs.student.main.Business.WebScraper.YelpApiResponse;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

public class SearchBusiness {

  private HashSet<String> cuisines;
  private HashSet<String> groceries;
  private HashSet<String> services;

  private HashMap<String, List<YelpApiResponse>> cache;

  private List<YelpApiResponse> filteredBus;

  public SearchBusiness() {

    this.services = new HashSet<>();
    this.services.add("photography");
    this.services.add("photo");
    this.services.add("venues");

    this.cuisines = new HashSet<>();
    this.cuisines.add("chinese");
    this.cuisines.add("chinese food");
    this.cuisines.add("chinese restaurants");
    this.cuisines.add("thai");
    this.cuisines.add("japanese");
    this.cuisines.add("filipino");
    this.cuisines.add("vietnamese");
    this.cuisines.add("korean");
    this.cuisines.add("new american");
    this.cuisines.add("asian");
    this.cuisines.add("coffee");
    this.cuisines.add("tea");

    this.groceries = new HashSet<>();
    this.groceries.add("grocery");
    this.groceries.add("groceries");
    this.groceries.add("international grocery");
    this.groceries.add("supermarket");
  }

  public List<YelpApiResponse> search(String term, HashMap<String, YelpApiResponse> map) {
    try {
      term = term.toLowerCase();
      this.filteredBus = new ArrayList<>();
      System.out.println(term);
      if (term.equals("restaurants")) {
        this.getRestos(map);
        Collections.sort(this.filteredBus, Collections.reverseOrder(new BusinessRanker()));
        return this.filteredBus;
      }
      if (term.equals("services")) {
        this.getServices(map);
        Collections.sort(this.filteredBus, Collections.reverseOrder(new BusinessRanker()));
        return this.filteredBus;
      }

      if (term.equals("groceries")) {
        this.getGroceries(map);
        Collections.sort(this.filteredBus, Collections.reverseOrder(new BusinessRanker()));
        return this.filteredBus;

      } else {
        this.generalSearch(map, term);
        Collections.sort(this.filteredBus, Collections.reverseOrder(new BusinessRanker()));
        return this.filteredBus;
      }
    } catch (Exception e) {
      e.printStackTrace();
    }

    return this.filteredBus;
  }

  private void generalSearch(HashMap<String, YelpApiResponse> map, String term) {
    for (YelpApiResponse response : map.values()) {
      if (response.businesses().size() != 0) {
        if (response.businesses().get(0).name().toLowerCase().contains(term)
            || response.businesses().get(0).location().city().toLowerCase().contains(term)) {
          System.out.println("24524");
          this.filteredBus.add(response);
        } else {
          for (Category category : response.businesses().get(0).categories()) {
            if (term.contains(category.title().toLowerCase())) {
              System.out.println("23r2t");
              this.filteredBus.add(response);
            }
          }
        }
      }
    }
  }

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
