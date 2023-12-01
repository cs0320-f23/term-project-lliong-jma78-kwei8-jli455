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
  useEffect(() => {
    console.log("use effect for song");
    const all_songs = small_song_dataset.values();
    console.log(all_songs);
    console.log(all_songs[1]);

    //small_song_dataset[1];

    // props.setSongs([
    //   ...props.songs,
    //   {

    //   },
    // ]);
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
