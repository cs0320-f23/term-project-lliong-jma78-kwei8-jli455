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

// fetch here in this class!
// okay if you can justify

// post request - sending post request from front end to back end when adding artist

interface SpotifyPageProps {
  // should i make this an array of songs instead? how?
  songs: SongProps[];
  setSongs: React.Dispatch<React.SetStateAction<SongProps[]>>;
}

interface jsonSpotifyResponse {
  result: string;
  data: string[][];
}

// is this right/complete?
// type preedicate to check if successful spotify repsonse
function isSpotifyResponse(rjson: any): rjson is jsonSpotifyResponse {
  if (!("result" in rjson)) return false;
  if (!("data" in rjson)) return false;
  if (!(rjson["result"] === "success")) {
    return false;
  }
  return true;
}
// is the difference between rjson["result"] and rjson.result?

function getSongs() {
  // const url = "http://localhost:323/spotify";
  // return fetch(url)
  //   .then((response: Response) => response.json())
  //   .then((json) => {
  //     if (!isSpotifyResponse(json)) {
  //       // how/what to tell user?
  //       console.log("not a valid response");
  //     } else {
  //       const data = json.data;
  //       console.log(data);
  //     }
  //     //data.keys
  //     // const newSong: SongProps = {
  //     //   name: "",
  //     // };
  //   });
}

function getMockSongs() {
  const genreValues = small_song_dataset.values();

  const songArray = Array.from(genreValues);

  //songArray.map((name) => name.get("name"));

  //console.log(name);

  //console.log(songArray);
  for (let i = 0; i < songArray.size; i++) {
    console.log("in loop");

    let name = array[i].get("name");
    console.log(name);
  }
  // array.map(
  //   (key) => console.log(key.get("name")),
  //   // (artists = key.get("artists")),
  //   // (album = key.get("album")),
  //   // (duration = key.get("duration")),
  //   // (popularity = key.get("popularity")),

  //   console.log("name" + name)
  //   //console.log("popularity" + popularity)
  // );

  const songValues = genreValues.values;
  //console.log(songsArray);
  // for (let i = 0; i < small_song_dataset.size(), i++) {

  // }
}

export function SpotifySongs(props: SpotifyPageProps) {
  //need error checking
  useEffect(() => {
    getMockSongs(), [];
  });

  //console.log(props.songs);

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

  // useEffect(() => {
  //   props.setSongs([
  //     ...props.songs,
  //     {
  //       name: "xs",
  //       duration: 12345,
  //       artists: ["rina sawayama"],
  //       album: "sawayama",
  //       popularity: 100,
  //     },
  //   ]);
  // }, []);

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
