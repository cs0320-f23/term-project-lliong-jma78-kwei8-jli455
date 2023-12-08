package edu.brown.cs.student.main.Creators.Spotify;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

public class SpotifySorting {

  public List<Map<String, Object>> sortPopularity(String popMode, List<Map<String, Object>> toSort) {
    Integer numToSort = toSort.size();
    List<Map<String, Object>> sortedList = new ArrayList<>();
    if (popMode.equals("ascending")) { // Least popular first
      Comparator<Map<String, Object>> popularLast = Comparator.comparingInt(
          track -> Integer.parseInt(track.get("popularity").toString()));
      PriorityQueue<Map<String, Object>> trackPQ = new PriorityQueue<>(numToSort, popularLast);
      for (Map<String, Object> oneTrack : toSort) {
        trackPQ.add(oneTrack);
      }
      while (!trackPQ.isEmpty()) {
        sortedList.add(trackPQ.poll());
      }
    } else {
      Comparator<Map<String, Object>> popularFirst = (track1, track2) ->
          0 - (Integer.compare(Integer.parseInt(track1.get("popularity").toString()),
              Integer.parseInt(track2.get("popularity").toString())));
      PriorityQueue<Map<String, Object>> trackPQ = new PriorityQueue<>(numToSort, popularFirst);
      for (Map<String, Object> oneTrack : toSort) {
        trackPQ.add(oneTrack);
      }
      while (!trackPQ.isEmpty()) {
        sortedList.add(trackPQ.poll());
      }
    }
    return sortedList;
  }

  public List<Map<String, Object>> sortDuration(String durMode, List<Map<String, Object>> toSort) {
    Integer numToSort = toSort.size();
    List<Map<String, Object>> sortedList = new ArrayList<>();
    if (durMode.equals("ascending")) { // Shortest first
      Comparator<Map<String, Object>> longestLast = Comparator.comparingInt(
          track -> Integer.parseInt(track.get("MSDuration").toString()));
      PriorityQueue<Map<String, Object>> trackPQ = new PriorityQueue<>(numToSort, longestLast);
      for (Map<String, Object> oneTrack : toSort) {
        trackPQ.add(oneTrack);
      }
      while (!trackPQ.isEmpty()) {
        sortedList.add(trackPQ.poll());
      }
    } else {
      Comparator<Map<String, Object>> longestFirst = (track1, track2) ->
          0 - (Integer.compare(Integer.parseInt(track1.get("MSDuration").toString()),
              Integer.parseInt(track2.get("MSDuration").toString())));
      PriorityQueue<Map<String, Object>> trackPQ = new PriorityQueue<>(numToSort, longestFirst);
      for (Map<String, Object> oneTrack : toSort) {
        trackPQ.add(oneTrack);
      }
      while (!trackPQ.isEmpty()) {
        sortedList.add(trackPQ.poll());
      }
    }
    return sortedList;
  }

  public List<Map<String, Object>> sortBoth(String popMode, String durMode, Integer weightPop,
      Integer weightDur, List<Map<String, Object>> toSort) {
    Integer numToSort = toSort.size();
    List<Map<String, Object>> sortedList = new ArrayList<>();
    List<Map<String, Object>> sortedPop = sortPopularity(popMode, toSort);
    List<Map<String, Object>> sortedDur = sortDuration(durMode, toSort);

    Comparator<Map<String, Object>> weightTracks = Comparator.comparingInt(
        track -> ((sortedPop.indexOf(track) * weightPop) + (sortedDur.indexOf(track) * weightDur)));

    PriorityQueue<Map<String, Object>> trackPQ = new PriorityQueue<>(numToSort, weightTracks);
    for (Map<String, Object> oneTrack : toSort) {
      trackPQ.add(oneTrack);
    }
    while (!trackPQ.isEmpty()) {
      sortedList.add(trackPQ.poll());
    }
    return sortedList;
  }

}
