package edu.brown.cs.student.main.Creators.Submitted;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.TreeMap;
import java.util.stream.Stream;
import org.apache.commons.lang3.StringUtils;

/** Class to filter submitted creators */
public class SubmittedFiltering {

  /**
   * Filter creators by type
   *
   * @param fullDatabase full database of creators
   * @param toFind type to find
   * @return sorted list of creators
   */
  public List<Map<String, String>> filterType(
      List<Map<String, String>> fullDatabase, String toFind) {
    List<Map<String, String>> retList = new ArrayList<>();

    for (Map<String, String> oneCreator : fullDatabase) {
      if (oneCreator.get("type").equals(toFind)) {
        retList.add(oneCreator);
      }
    }

    return retList;
  }

  /**
   * Search creators by keyword
   *
   * @param fullDatabase full database of creators
   * @param toFind keyword to find
   * @return sorted and ordered list of creators
   */
  public List<Map<String, String>> searchKeyword(
      List<Map<String, String>> fullDatabase, String toFind) {
    List<Map<String, String>> retList = new ArrayList<>();
    List<Map<String, String>> nameList = new ArrayList<>();
    TreeMap<Float, List<Map<String, String>>> countMap = new TreeMap<>();

    for (Map<String, String> oneCreator : fullDatabase) {
      String creatorStr = oneCreator.values().toString().toLowerCase();
      if (oneCreator.get("name").equalsIgnoreCase(toFind)) {
        nameList.add(oneCreator);
      } else if (creatorStr.contains(toFind.toLowerCase())) {
        Integer appearances = StringUtils.countMatches(creatorStr, toFind.toLowerCase());
        Integer totalLen = new StringTokenizer(creatorStr).countTokens();
        Float count = appearances.floatValue() / totalLen.floatValue();

        if (!countMap.containsKey(count)) {
          countMap.put(count, List.of(oneCreator));
        } else {
          countMap.get(count).add(oneCreator);
        }
      }
    }

    for (Map.Entry<Float, List<Map<String, String>>> creatorTwo : countMap.entrySet()) {
      List<Map<String, String>> creatorWithCount = creatorTwo.getValue();
      for (Map<String, String> singleCreator : creatorWithCount) {
        retList.add(0, singleCreator);
      }
    }

    List<Map<String, String>> fullList =
        Stream.concat(nameList.stream(), retList.stream()).toList();
    return fullList;
  }
}
