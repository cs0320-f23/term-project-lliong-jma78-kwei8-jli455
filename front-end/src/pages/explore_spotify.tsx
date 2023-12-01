import React from "react";

import { Song } from "./spotify_song";

// maybe need file for each artist and use this file as main component to hold them?
export function SpotifySongs() {
  return (
    <div className="spotify_grid">
      <Song
        name={"name"}
        duration={100}
        artists={["artist!"]}
        album={"album"}
        popularity={100}
        genre={"pop"}
      />
      <Song
        name={"name"}
        duration={100}
        artists={["artist!"]}
        album={"album"}
        popularity={100}
        genre={"pop"}
      />
    </div>
  );
}
