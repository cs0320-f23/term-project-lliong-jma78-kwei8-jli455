package edu.brown.cs.student.TestCreators.Algorithms;

import static java.util.concurrent.ThreadLocalRandom.current;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import edu.brown.cs.student.main.Creators.Spotify.Sorting.SpotifySorting;
import edu.brown.cs.student.main.Creators.Submitted.SubmittedFiltering;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;
import org.junit.jupiter.api.Test;

/**
 * Unit tests for algorithms
 */
public class TestAlgos {

  /**
   * PBT for Spotify Duration Ascending Sort
   * Note: Setting max duration to 15min, which seems reasonable for song lengths
   */
  @Test
  public void testSpotifySortDur() {
    SpotifySorting sorter = new SpotifySorting();
    List<Map<String, Object>> toSort = new ArrayList<>();
    Random rand = new Random();

    for (int i = 0; i < 500; i++) {
      Map<String, Object> localMap = new HashMap<>();
      Integer randomInt = rand.nextInt(900000);
      localMap.put("MSDuration", randomInt);
      toSort.add(localMap);
    }

    List<Map<String, Object>> sorted = sorter.sortDuration("ascending", toSort);
    Integer lastInt = -1;
    for (Map<String, Object> oneMap : sorted) {
      Integer currInt = Integer.parseInt(oneMap.get("MSDuration").toString());
      assertTrue(currInt >= lastInt);
      lastInt = currInt;
    }
  }

  /**
   * Standard unit test for searching creators by keyword
   */
  @Test
  public void testKeywordSearch() {
    List<Map<String, String>> toSearch = new ArrayList<>();

    Map<String, String> creator1 = new HashMap<>();
    creator1.put("name", "hello!");
    creator1.put("description", "your friendly neighbourhood knitter");

    Map<String, String> creator2 = new HashMap<>();
    creator2.put("name", "KnItTer");
    creator2.put("description", "nah im not saying im a yarn person in descriptions");
    creator2.put("instagram", "i don't have one");

    Map<String, String> creator3 = new HashMap<>();
    creator3.put("name", "bob");
    creator3.put("description", "your friendly neighbourhood knitter");
    creator3.put("website", "knitter knitter knitter!");

    Map<String, String> creator4 = new HashMap<>();
    creator4.put("name", "tom");
    creator4.put("description", "woodcarver");

    toSearch.add(creator1);
    toSearch.add(creator2);
    toSearch.add(creator3);
    toSearch.add(creator4);

    Collections.shuffle(toSearch);

    SubmittedFiltering filtering = new SubmittedFiltering();
    List<Map<String, String>> searchedList = filtering.searchKeyword(toSearch, "knitter");

    assertEquals(3, searchedList.size());
    assertEquals(creator2, searchedList.get(0));
    assertEquals(creator3, searchedList.get(1));
    assertEquals(creator1, searchedList.get(2));
    assertFalse(searchedList.contains(creator4));
  }
}
