package edu.brown.cs.student.main.Business;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
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

  private HashMap<String, Double[]> addressToCoordMap;

  public HashMap<String, Double[]> scrape() throws IOException {
    this.addressToCoordMap = new HashMap<>();
    this.key = "evtJ9UBqyUYofFNw5qmUmnAu8U6Dv5Xz";
    String url = "https://www.boston.com/community/readers-say/aapi-and-asian-owned-businesses-to-shop-support-in-greater-boston/";
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
      String href = name.text(); //returns the restaurant names
//      System.out.println(href);
      Element addressElement = name.nextElementSibling();
      if (addressElement!=null) {
        Element addressEl = addressElement.selectFirst("em");
        if (addressEl!=null) {
          String unfiltAddress = addressEl.text();
          String[] splitAddress = unfiltAddress.split(";");
          String address = splitAddress[0];
          System.out.println(address);
          try {
            String encodedAddress = URLEncoder.encode(address, StandardCharsets.UTF_8);

            URL requestURL = new URL("https://www.mapquestapi.com/geocoding/v1/address?key="+this.key+"&location=" + encodedAddress);

            HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
            clientConnection.setRequestMethod("GET");
            if (clientConnection.getResponseCode() != 200) {
              throw new MalformedURLException();
            }
            Moshi moshi = new Moshi.Builder().build();
            JsonAdapter<GeocodingResponse> adapter = moshi.adapter(GeocodingResponse.class);
            GeocodingResponse geocodingResponse = adapter.fromJson(new Buffer().readFrom(clientConnection.getInputStream()));
            Double lat = geocodingResponse.results().get(0).locations().get(0).latLng().lat();
            Double lng = geocodingResponse.results().get(0).locations().get(0).latLng().lng();
            Double[] coords = new Double[2];
            coords[0] = lat;
            coords[1] = lng;
            this.addressToCoordMap.put(address,coords);

          } catch (Exception e) {
            System.out.println(e.getMessage());
          }
        }
      }
    }
    return this.addressToCoordMap;

  }
  public record GeocodingResponse(Info info, Options options, List<Result> results) {}


    public record Info(int statuscode, Copyright copyright, List<String> messages) {
  }

  public record Copyright(String text, String imageUrl, String imageAltText) {
  }

  public record Options(int maxResults, boolean ignoreLatLngInput) {
  }

  public record Result(ProvidedLocation providedLocation, List<Location> locations) {
  }

  public static record ProvidedLocation(String location) {
  }


  public record Location(String street, String adminArea6, String adminArea6Type, String adminArea5,
                                String adminArea5Type, String adminArea4, String adminArea4Type, String adminArea3,
                                String adminArea3Type, String adminArea1, String adminArea1Type, String postalCode,
                                String geocodeQualityCode, String geocodeQuality, boolean dragPoint,
                                String sideOfStreet, String linkId, String unknownInput, String type, LatLng latLng,
                                LatLng displayLatLng, String mapUrl) {
  }

  public record LatLng(double lat, double lng) {
  }

}
