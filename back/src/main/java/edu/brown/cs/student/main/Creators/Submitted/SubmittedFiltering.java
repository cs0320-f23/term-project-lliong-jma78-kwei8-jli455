package edu.brown.cs.student.main.Creators.Submitted;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SubmittedFiltering {

  public List<Map<String, String>> filterType(List<Map<String, String>> fullDatabase, String toFind) {
    List<Map<String, String>> retList = new ArrayList<>();

    for (Map<String, String> oneCreator : fullDatabase) {
      if (oneCreator.get("type").equals(toFind)) {
        retList.add(oneCreator);
      }
    }

    return retList;
  }

}
