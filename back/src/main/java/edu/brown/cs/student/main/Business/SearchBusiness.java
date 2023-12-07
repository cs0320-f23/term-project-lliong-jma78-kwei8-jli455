package edu.brown.cs.student.main.Business;

import edu.brown.cs.student.main.Business.WebScraper.Category;
import edu.brown.cs.student.main.Business.WebScraper.YelpApiResponse;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;


public class SearchBusiness {

  private HashSet<String> cuisines;
  private HashSet<String> groceries;
  private HashSet<String> services;

  private List<YelpApiResponse> filteredBus;

  public SearchBusiness() {
    this.cuisines = new HashSet<>();
    this.cuisines.add("chinese");
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
    this.groceries.add("international grocery");

  }

  public List<YelpApiResponse>  search (String term, List<YelpApiResponse> map) {
    term = term.toLowerCase();
    this.filteredBus = new ArrayList<>();
    System.out.println(term);
    for (YelpApiResponse response: map) {
      if (response.businesses().size() != 0) {
        if (response.businesses().get(0).name().toLowerCase().contains(term) || response.businesses().get(0).location().city().toLowerCase().contains(term)) {
          System.out.println("24524");
          this.filteredBus.add(response);
        }
        else {
          for (Category category : response.businesses().get(0).categories()) {
            if (term.contains(category.title().toLowerCase())) {
              System.out.println("23r2t");
              this.filteredBus.add(response);
            }
          }
        }

      }

    }
    return this.filteredBus;

  }


}
