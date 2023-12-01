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
  useEffect(() => {
    console.log("use effect for song");

    console.log("size" + small_song_dataset.size);

    for (let key of small_song_dataset.keys()) {
      // need error checking
      if (key !== undefined) {
        const values = small_song_dataset.get(key);

        if (values !== undefined) {
          console.log(values.entries());

          for (let property of values.entries()) {
          }

          for (let i = 0; i < values.length; i++) {
            values[1];
            console.log(values[1]);
          }
        }
      }
    }
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
