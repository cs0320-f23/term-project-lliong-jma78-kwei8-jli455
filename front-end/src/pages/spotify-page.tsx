import "../styles/styles.css";
import React from "react";

import { useState, useEffect } from "react";
import { Song, SongProps } from "./single_song";
import { getMockSongs, SpotifySongs } from "./explore_spotify";

import { small_song_dataset } from "../mocks/mock_songs";
import { Search } from "./search";
import { FilterBox } from "./filter";

export function SpotifyPage() {
  const [songs, setSongs] = useState<SongProps[]>([]);

  return (
    <div className="spotify-page">
      <Search />
      <br></br>
      <br></br>
      <div className="spotify-content">
        <FilterBox />

        <div className="right-component">
          <SpotifySongs songs={songs} setSongs={setSongs} />
        </div>
      </div>
    </div>
  );
}
