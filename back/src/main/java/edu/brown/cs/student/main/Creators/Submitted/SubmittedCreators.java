package edu.brown.cs.student.main.Creators.Submitted;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.regex.Pattern;

/** Class to interface with database of creators */
public class SubmittedCreators {
  private static String databaseName;
  private static Reader rDatabase;
  private static Writer wDatabase;
  private List<Integer> IDs;

  /**
   * Constructor
   *
   * @param databaseName path to database
   */
  public SubmittedCreators(String databaseName) {
    this.databaseName = databaseName;
    try {
      this.wDatabase = new FileWriter(this.databaseName, true);
      this.IDs = this.getIDs();
    } catch (IOException e) {
      System.err.println("Encountered an error with database input: " + e.getMessage());
      System.exit(1);
    }
  }

  /**
   * Elimiate a single instance of leading or trailing double-quote, and replace pairs of double
   * quotes with singles.
   *
   * @param arg the string to process
   * @return the postprocessed string
   */
  public static String postprocess(String arg) {
    return arg
        // Remove extra spaces at beginning and end of the line
        .trim()
        // Remove a beginning quote, if present
        .replaceAll("^\"", "")
        // Remove an ending quote, if present
        .replaceAll("\"$", "")
        // Replace double-double-quotes with double-quotes
        .replaceAll("\"\"", "\"");
  }

  /**
   * Helper: Converts a string representing a row into a List<String> using comma separation
   *
   * @param singleRow String representing a single row
   * @return List<String> representing a single row (split on comma separation)
   */
  private List<String> rowToList(String singleRow) {
    // Splits string on commas using provided regex
    String[] splitRow = singleRow.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);
    // Converts String[] to List for ease of later use
    List<String> rowAsList = Arrays.asList(splitRow);
    List<String> retList = new ArrayList<>();

    for (String arg : rowAsList) {
      retList.add(postprocess(arg));
    }
    return new ArrayList(retList);
  }

  /**
   * Method to add a creator to the database
   *
   * @param newCreator new creator to add
   * @return unique assigned creator ID
   */
  public Integer addCreator(String newCreator) {
    BufferedWriter bWriter = new BufferedWriter(this.wDatabase);
    Random rand = new Random();
    Integer uniqueID = rand.nextInt(999 - 100) + 100;
    while (this.IDs.contains(uniqueID)) {
      uniqueID = rand.nextInt(999 - 100) + 100;
    }
    this.IDs.add(uniqueID);
    try {
      bWriter.write(uniqueID + "," + newCreator);
      bWriter.newLine();
      bWriter.flush();
    } catch (IOException e) {
      System.out.println(e);
      throw new RuntimeException(e);
    }

    return uniqueID;
  }

  /**
   * Method to delete a creator from the database
   *
   * @param toDelete ID to delete
   * @return boolean representing status of delete
   * @throws IOException issue with parsing the delete
   */
  public Boolean deleteCreator(String toDelete) throws IOException {
    this.rDatabase = new FileReader(this.databaseName);
    BufferedReader bReader = new BufferedReader(this.rDatabase);
    String oneLine = bReader.readLine();
    List<String> fullFile = new ArrayList<>();
    List<String> editedFile = new ArrayList<>();
    Boolean retBool = false;

    while (oneLine != null) {
      fullFile.add(oneLine);
      oneLine = bReader.readLine();
    }

    for (String oneCreator : fullFile) {
      if (oneCreator.startsWith(toDelete + ",")) {
        retBool = true;
      } else {
        editedFile.add(oneCreator);
      }
    }

    BufferedWriter bWriter = new BufferedWriter(new FileWriter(this.databaseName));
    for (String oneCreator : editedFile) {
      bWriter.write(oneCreator);
      bWriter.newLine();
    }
    bWriter.flush();

    return retBool;
  }

  /**
   * Helper to add to map if value is not null
   *
   * @param base original map
   * @param key key to add
   * @param value value to add
   */
  private void addToMap(Map<String, String> base, String key, String value) {
    if (!(value.equals("null"))) {
      base.put(key, value);
    }
  }

  /**
   * Method to get all currently used IDs
   *
   * @return list of currently used IDs
   * @throws IOException error reading database
   */
  private List<Integer> getIDs() throws IOException {
    this.rDatabase = new FileReader(this.databaseName);
    BufferedReader bReader = new BufferedReader(this.rDatabase);
    String oneLine = bReader.readLine();
    List<Integer> retList = new ArrayList<>();

    while (oneLine != null) {
      List<String> convertedLine = rowToList(oneLine);
      retList.add(Integer.valueOf(convertedLine.get(0)));
      oneLine = bReader.readLine();
    }

    return retList;
  }

  /**
   * Method to get database
   *
   * @return List of all creators
   * @throws IOException Issue parsing database
   */
  public List<Map<String, String>> getDatabase() throws IOException {
    this.rDatabase = new FileReader(this.databaseName);
    BufferedReader bReader = new BufferedReader(this.rDatabase);
    String oneLine = bReader.readLine();
    List<Map<String, String>> retList = new ArrayList<>();

    while (oneLine != null) {
      List<String> convertedLine = rowToList(oneLine);
      assert convertedLine.size() == 9;
      Map<String, String> lineMap = new HashMap<>();
      addToMap(lineMap, "id", convertedLine.get(0));
      addToMap(lineMap, "name", convertedLine.get(1));
      addToMap(lineMap, "type", convertedLine.get(2));
      addToMap(lineMap, "price", convertedLine.get(3));
      addToMap(lineMap, "description", convertedLine.get(4));
      addToMap(lineMap, "instagram", convertedLine.get(5));
      addToMap(lineMap, "facebook", convertedLine.get(6));
      addToMap(lineMap, "website", convertedLine.get(7));
      addToMap(lineMap, "spotify", convertedLine.get(8));
      retList.add(lineMap);
      oneLine = bReader.readLine();
    }

    return retList;
  }

  /**
   * Method to get database filtered by type
   *
   * @param toFind type to find
   * @return list of matching creators
   * @throws IOException issue parsing database
   */
  public List<Map<String, String>> getTypeDatabase(String toFind) throws IOException {
    return new SubmittedFiltering().filterType(this.getDatabase(), toFind);
  }

  /**
   * Method to get database filtered by keyword and ordered
   *
   * @param toFind keyword to find
   * @return ordered list of matching creators
   * @throws IOException issue parsing database
   */
  public List<Map<String, String>> getKeywordDatabase(String toFind) throws IOException {
    return new SubmittedFiltering().searchKeyword(this.getDatabase(), toFind);
  }
}
