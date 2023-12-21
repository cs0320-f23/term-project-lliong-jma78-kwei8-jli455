package edu.brown.cs.student.main.Business;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import edu.brown.cs.student.main.privates.Keys;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import okio.Buffer;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

public class WebScraper {
  private String key;
  private HashMap<String, YelpApiResponse> responseMap;
  private List<YelpApiResponse> responseList;

  /**
   * Scrapes a website for business phone numbers and converts to HTML
   * @return a Map of business name to business information
   * @throws Exception if there is an error
   */
  public HashMap<String, YelpApiResponse> getBusinessInfo() throws Exception {
    this.key = "evtJ9UBqyUYofFNw5qmUmnAu8U6Dv5Xz";
    this.responseMap = new HashMap<>();
    this.responseList = new ArrayList<>();
    String url =
        "https://www.boston.com/community/readers-say/aapi-and-asian-owned-businesses-to-shop-support-in-greater-boston/";
    URL obj = new URL(url);
    HttpURLConnection con = (HttpURLConnection) obj.openConnection();
    con.setRequestProperty("User-Agent", "Mozilla/5.0");
    int responseCode = con.getResponseCode();
    System.out.println("Response code: " + responseCode);
    BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
    String inputLine;
    StringBuilder response = new StringBuilder();
    while ((inputLine = in.readLine()) != null) {
      response.append(inputLine);
    }
    in.close();
    String html = response.toString();
    Document doc = Jsoup.parse(html);
    Elements names = doc.select("h3.wp-block-heading");
    this.callAPI(names);
    return this.responseMap;
  }

  /**
   * Helper method that calls Yelp API to get business info
   * @param names are HTML elements that contain business phone numbers
   */
  private void callAPI(Elements names) {
    for (Element name : names) {
      Element addressElement = name.nextElementSibling();
      if (addressElement != null) {
        Element addressEl = addressElement.selectFirst("em");
        if (addressEl != null) {
          String unfiltAddress = addressEl.text();
          String[] splitAddress = unfiltAddress.split("; ");
          if (splitAddress.length != 1) {
            String unfilteredPhone = splitAddress[1];
            String phone = unfilteredPhone.replace("-", "");
            try {
              String apiUrl = "https://api.yelp.com/v3/businesses/search/phone?phone=%2B1" + phone;
              URL apiURl = new URL(apiUrl);
              HttpURLConnection connection = (HttpURLConnection) apiURl.openConnection();
              connection.setRequestMethod("GET");
              Keys keys = new Keys();
              connection.setRequestProperty("Authorization", "Bearer " + keys.getKey());
              int responseCode2 = connection.getResponseCode();
              System.out.println(responseCode2);
              if (responseCode2 == 200) {
                Moshi moshi = new Moshi.Builder().build();
                JsonAdapter<YelpApiResponse> adapter = moshi.adapter(YelpApiResponse.class);
                YelpApiResponse apiResponse =
                    adapter.fromJson(new Buffer().readFrom(connection.getInputStream()));
                if (apiResponse != null) {
                  this.serialize(apiResponse);
                }
                connection.disconnect();
              }

            } catch (Exception e) {
              e.printStackTrace();
            }
          }
        }
      }
    }
  }

  /**
   * Populates the Map of businesses to information
   * @param business is the YelpAPIResponse for a business
   */

  private void serialize(YelpApiResponse business) {
    String name = business.businesses.get(0).name;
    this.responseMap.put(name, business);
  }

  public record YelpApiResponse(List<Business> businesses, int total, Region region) {}

  public record Business(
      String id,
      String alias,
      String name,
      String imageUrl,
      String isClosed,
      String url,
      String review_count,
      List<Category> categories,
      String rating,
      Coordinates coordinates,
      List<String> transactions,
      String price,
      Location location,
      String phone,
      String displayPhone,
      String distance) {}

  public record Category(String alias, String title) {}

  public record Coordinates(double latitude, double longitude) {}

  public record Location(
      String address1,
      String address2,
      String address3,
      String city,
      String zipCode,
      String country,
      String state,
      List<String> displayAddress) {}

  public record Region(Center center) {}

  public record Center(double longitude, double latitude) {}
}
