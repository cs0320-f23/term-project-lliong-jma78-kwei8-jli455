import "../../styles/styles.css";
import React from "react";

import { useState } from "react";
import { SongProps } from "./single_song";
import { SpotifySongs } from "./spotify_contents";

import { Search } from "./spotify_search";
import { FilterBox } from "./spotify_filter";

// fix so that filter box does not move around
// perhaps a show all songs button? or on the filter
export function SpotifyPage() {
  const [songs, setSongs] = useState<SongProps[]>([]);

  return (
    <div className="spotify-page">
      <Search songs={songs} setSongs={setSongs} />
      <br></br>
      <br></br>
      <div className="spotify-content">
        <FilterBox setSongs={setSongs} />

        <div className="right-component">
          <SpotifySongs songs={songs} setSongs={setSongs} />
        </div>
      </div>
    </div>
  );
}
