package edu.brown.cs.student.main.Creators.Spotify.VerifyGenres;

import java.util.List;
import java.util.Map;

public interface SpotifyGenre {

  Map<String, List<String>> checkAvailableGenres(List<String> toCheck);
}
