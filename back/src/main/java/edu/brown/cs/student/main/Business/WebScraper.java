package edu.brown.cs.student.main.Business;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
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
  private HashMap<String,Object> responseMap;


  public HashMap<String,Object> getBusinessInfo() throws Exception {
    this.key = "evtJ9UBqyUYofFNw5qmUmnAu8U6Dv5Xz";
    this.responseMap = new HashMap<>();
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

    for (Element name : names) {
      String href = name.text(); // returns the restaurant names
      Element addressElement = name.nextElementSibling();
      if (addressElement != null) {
        Element addressEl = addressElement.selectFirst("em");
        if (addressEl != null) {
          String unfiltAddress = addressEl.text();
          String[] splitAddress = unfiltAddress.split("; ");
          if (splitAddress.length != 1) {
            String unfilteredPhone = splitAddress[1];
            String phone = unfilteredPhone.replace("-","");
            try {
              String apiUrl =
                  "https://api.yelp.com/v3/businesses/search/phone?phone=%2B1" + phone;

              URL apiURl = new URL(apiUrl);
              HttpURLConnection connection = (HttpURLConnection) apiURl.openConnection();

              connection.setRequestMethod("GET");

//              String apiKey = "FDQTm9hJMyjiV-qp9iz9nyih3rKsgPJQPffhwmYN57c7qw-MoLTfX4RtndHm5v2W2BJjBPH28KnIGrReMH5mMFqT-F8yP5JgC9DBxe2K0H2lEOzbUAqBtrUZMxhmZXYx";
              String apiKey = "CuEhZWAB406Ugt43aMLCBikvDL8DZIFYeoAKKzDlQ_FO7djlUrntE4iQ8OoanZaakD_r27LfhidwdwTVH1gSlpRwJKYvg6w52JNA0535L1TfIDhhPfeaznrpnqhmZXYx";
              connection.setRequestProperty("Authorization", "Bearer " + apiKey);

              int responseCode2 = connection.getResponseCode();
              System.out.println(responseCode2);
              if (responseCode2 ==200) {
                Moshi moshi = new Moshi.Builder().build();
                JsonAdapter<YelpApiResponse> adapter = moshi.adapter(YelpApiResponse.class);
                YelpApiResponse apiResponse = adapter.fromJson(new Buffer().readFrom(connection.getInputStream()));
                Double latitude = apiResponse.businesses.get(0).coordinates.latitude;
                Double longitude = apiResponse.businesses.get(0).coordinates.longitude;
                String businessName = apiResponse.businesses.get(0).name;
                ArrayList<String> busType = new ArrayList<>();

                for (Category category:apiResponse.businesses.get(0).categories) {
                  busType.add(category.title);
                }

                String reviewCount = apiResponse.businesses.get(0).review_count;
                String rating = apiResponse.businesses.get(0).rating;
                connection.disconnect();
                this.serialize(latitude, longitude, businessName,busType,reviewCount,rating);
              }

            } catch (Exception e) {
              e.printStackTrace();
            }
          }
        }
      }
    }

    return this.responseMap;
  }

  private void serialize(Double latitude, Double longitude, String name, List<String> busType, String reviewCount, String rating) {
    HashMap<String, Object> businessMap = new HashMap<>();
    businessMap.put("latitude", latitude);
    businessMap.put("longitude", longitude);
    businessMap.put("busType", busType);
    businessMap.put("reviewCount", reviewCount);
    businessMap.put("rating", rating);

    this.responseMap.put(name, businessMap);

  }


  public record YelpApiResponse(List<Business> businesses,
                                int total,
                                Region region) {
  }

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
      String distance) {
  }


  public record Category(String alias, String title) {

  }


  public record Coordinates(double latitude, double longitude) {

  }


  public record Location(String address1, String address2, String address3, String city,
                         String zipCode, String country, String state,
                         List<String> displayAddress) {}


  public record Region(Center center) {

  }

  public record Center(double longitude, double latitude) {

  }


}