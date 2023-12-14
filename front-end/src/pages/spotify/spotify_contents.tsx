import React from "react";
import { useEffect, useRef } from "react";

import { SongProps, Song } from "./single_song";

import { small_song_dataset } from "../../mocks/mock_songs";

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

// is the difference between rjson["result"] and rjson.result?

// post request - sending post request from front end to back end when adding artist

interface SpotifyPageProps {
  // should i make this an array of songs instead? how?
  songs: SongProps[];
  setSongs: React.Dispatch<React.SetStateAction<SongProps[]>>;
}

interface jsonSpotifyResponse {
  result: string;
  // is this the right type?

  data: Array<Map<string, object>>;
  invalid: string[] | undefined;
  validgenres: string[];
}

// check valid and invalid?
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

export const allSongs: SongProps[] = [];
export const allGenres: string[] = [];

async function getSongs() {
  const url = "http://localhost:323/spotify";

  return fetch(url)
    .then((response: Response) => response.json())
    .then((json) => {
      if (!isSpotifyResponse(json)) {
        // how/what to tell user?
        console.log("not a valid response");
      } else {
        const data = json.data;
        const genres = Array.from(json.validgenres);
        genres.forEach((val) => allGenres.push(val));

        console.log("genres" + allGenres);

        for (let i = 0; i < data.length; i++) {
          const songMap = data[i];

          const songName: string = songMap["name"];
          const songArtistsArray: string[] = songMap["artists"];
          const songArtists: string = songArtistsArray.join();

          const songAlbum: string = songMap["album"];
          const songDuration: number = songMap["duration"];
          const songPopularity: number = songMap["popularity"];
          const songGenre: string = songMap["genre"];

          const song: SongProps = {
            name: songName,
            artists: songArtists,
            album: songAlbum,
            duration: songDuration,
            popularity: songPopularity,
            genre: songGenre,
          };

          allSongs.push(song);
        }
        return allSongs;
      }
    })
    .catch((error) => console.log("error"));
}

//export const allSongs: SongProps[] = [];
//export const allGenres: string[] = [];

export function getMockSongs(props: SpotifyPageProps) {
  const genreValues = small_song_dataset.values();
  const songArray = Array.from(genreValues);

  const genres = small_song_dataset.keys();
  const genreArray = Array.from(genres);

  for (let i = 0; i < genreArray.length; i++) {
    allGenres.push(genreArray[i]);
    const songs = small_song_dataset.get(genreArray[i]);

    const genre = genreArray[i];

    // do better error checking
    if (songs != undefined) {
      const songArray = Array.from(songs);
      console.log(songArray);

      for (let i = 0; i < songArray.length; i++) {
        const songName: string = songArray[i].get("name");

        // fix to extract value from array
        const songArtistsArray: string[] = songArray[i].get("artists");
        const songArtists: string = songArtistsArray.join();

        const songAlbum: string = songArray[i].get("album");
        const songDuration: number = songArray[i].get("duration");
        const songPopularity: number = songArray[i].get("popularity");

        const song: SongProps = {
          name: songName,
          artists: songArtists,
          album: songAlbum,
          duration: songDuration,
          popularity: songPopularity,
          genre: genre,
        };

        allSongs.push(song);

        //props.setSongs([...props.songs]);
        console.log(props.songs);
      }
    }
  }

  return allSongs;
}

export function SpotifySongs(props: SpotifyPageProps) {
  const mockSongsRef = useRef(false);

  getSongs().then((response) => {
    if (response != undefined) {
      props.setSongs(response);
    }
  });

  // useEffect(() => {
  //   if (mockSongsRef.current) return;
  //   mockSongsRef.current = true;
  //   props.setSongs(getMockSongs(props)), [];
  // });

  // probably need to do checking to make sure it is correct type when actually fetching from api

  // i don't know where the best place is to put this use effect...
  // should i even be populating songs in this use effect??

  return (
    // check if filtered? then map it

    <div className="spotify-grid">
      {props.songs?.map((song, index) => (
        <Song
          name={song.name}
          artists={song.artists}
          album={song.album}
          duration={song.duration}
          popularity={song.popularity}
          genre={song.genre}
        />
      ))}
    </div>
  );
}
