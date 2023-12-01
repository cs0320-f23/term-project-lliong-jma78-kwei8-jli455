import React from "react";
import { useEffect } from "react";

import { SongProps, Song } from "./spotify_song";

// maybe need file for each artist and use this file as main component to hold them?
// should this act like REPLHistory and I need another file for REPLInput? / another place to get songs?

interface SpotifyPageProps {
  songs: SongProps[];
  setSongs: React.Dispatch<React.SetStateAction<SongProps[]>>;
}

export function SpotifySongs(props: SpotifyPageProps) {
  // need error checking
  useEffect(() => {
    console.log("use effect songs");
    fetch("http://localhost:3000")
      .then((response: Response) => response.json())
      .then((json) => {
        props.setSongs([
          ...props.songs,
          json.name,
          json.duration,
          json.artists,
          json.album,
          json.popularity,
          json.genre,
        ]);
      })
      .then((data) => console.log("ahhh")),
      [];
  });

  console.log(props.songs);

  return (
    // check if filtered? then map it

    <div className="spotify_grid">
      {props.songs?.map((song, index) => (
        <Song
          name={"name"}
          duration={100}
          artists={["artist!"]}
          album={"album"}
          popularity={100}
          genre={"pop"}
        />
      ))}
    </div>
  );
}
