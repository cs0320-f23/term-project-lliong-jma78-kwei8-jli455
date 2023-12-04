import React from "react";
import { useEffect } from "react";

import { SongProps, Song } from "./single_song";

import { small_song_dataset } from "../mocks/mock_songs";

// maybe need file for each artist and use this file as main component to hold them?
// should this act like REPLHistory and I need another file for REPLInput? / another place to get songs?

// props.setSongs([
//   ...props.songs,
//   json.name,
//   json.duration,
//   json.artists,
//   json.album,
//   json.popularity,
//   json.genre,
// ]);

interface SpotifyPageProps {
  // should i make this an array of songs instead? how?
  songs: SongProps[];
  setSongs: React.Dispatch<React.SetStateAction<SongProps[]>>;
}

export function SpotifySongs(props: SpotifyPageProps) {
  // need error checking
  // useEffect(() => {
  //   console.log("use effect songs");
  //   fetch("http://localhost:3232")
  //     .then((response: Response) => response.json())
  //     .then((json) => {
  //       console.log(json);
  //     })
  //     .then((data) => console.log("ahhh")),
  //     [];
  // });

  console.log(props.songs);

  // probably need to do checking to make sure it is correct type when actually fetching from api

  // i don't know where the best place is to put this use effect...
  // should i even be populating songs in this use effect??

  // useEffect(() => {
  //   const req = small_song_dataset.get("alternative");
  //   if (req == undefined) {
  //     console.log("undefined!");
  //   } else {
  //     console.log(req);
  //     const name = req[1];
  //     console.log(name);
  //   }
  // }, []);

  useEffect(() => {
    props.setSongs([
      ...props.songs,
      {
        name: "xs",
        duration: 12345,
        artists: ["rina sawayama"],
        album: "sawayama",
        popularity: 100,
      },
    ]);
  }, []);

  return (
    // check if filtered? then map it

    <div className="spotify_grid">
      {props.songs?.map((song, index) => (
        <Song
          name={song.name}
          artists={song.artists}
          album={song.album}
          duration={song.duration}
          popularity={song.popularity}
        />
      ))}
    </div>
  );
}
