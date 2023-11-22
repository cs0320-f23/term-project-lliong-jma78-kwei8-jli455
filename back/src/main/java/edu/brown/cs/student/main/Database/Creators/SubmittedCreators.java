package edu.brown.cs.student.main.Database.Creators;

import java.util.List;
import java.util.Map;

public class SubmittedCreators {
  private static List<Map> submittedDatabase;

  public SubmittedCreators(List<Map> originalDatabase) {
    this.submittedDatabase = originalDatabase;
  }

  public void addCreator(Map newCreator) {
    this.submittedDatabase.add(newCreator);
  }

  // TODO: Make a defensive copy
  public List<Map> getSubmittedDatabase() {
    return this.submittedDatabase;
  }
}
