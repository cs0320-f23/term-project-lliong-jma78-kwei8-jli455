import React from "react";
import { useEffect, useRef } from "react";
import { SongProps, Song } from "./single_song";
import { all_genres, small_song_dataset } from "../../mocks/mock_songs";

/**
 * props for the spotify page
 */
interface SpotifyPageProps {
  songs: SongProps[];
  setSongs: React.Dispatch<React.SetStateAction<SongProps[]>>;
}

/**
 * interface with fields that a proper response from the backend handling the spotify api should have
 */
interface jsonSpotifyResponse {
  result: string;
  // is this the right type?

  data: Array<Map<string, object>>;
  invalidgenres: string[] | undefined;
  validgenres: string[] | undefined;
}

// check valid and invalid?
// is this right/complete?
/**
 * type predicate to check if spotify json response was successful
 * @param rjson
 * @returns
 */
function isSpotifyResponse(rjson: any): rjson is jsonSpotifyResponse {
  if (!("result" in rjson)) return false;
  if (!("data" in rjson)) return false;
  if (!(rjson["result"] === "success")) {
    return false;
  }
  return true;
}

// array for all default songs
export const allSongs: SongProps[] = [];
// array for all genres
// will this be necessary if it actually can get all genres from spotify?
export const allGenres: string[] = all_genres;

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
        const genres = json.validgenres;

        if (genres == undefined) {
          console.log("no songs loaded");
        } else {
          genres.forEach((val) => allGenres.push(val));

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
      }
    })
    .catch((error) => console.log("error"));
}

//export const allSongs: SongProps[] = [];
//export const allGenres: string[] = [];

export function getMockSongs(props: SpotifyPageProps) {
  const songArray = small_song_dataset;

  // do better error checking

  for (let i = 0; i < songArray.length; i++) {
    const songName: string = songArray[i].get("name");

    // fix to extract value from array
    const songArtistsArray: string[] = songArray[i].get("artists");
    const songArtists: string = songArtistsArray.join();

    const songAlbum: string = songArray[i].get("album");
    const songDuration: number = songArray[i].get("duration");
    const songPopularity: number = songArray[i].get("popularity");
    const songGenre: string = songArray[i].get("genre");

    const song: SongProps = {
      name: songName,
      artists: songArtists,
      album: songAlbum,
      duration: songDuration,
      popularity: songPopularity,
      genre: songGenre,
    };

    allSongs.push(song);

    //props.setSongs([...props.songs]);
    console.log(props.songs);
  }

  return allSongs;
}

export function SpotifySongs(props: SpotifyPageProps) {
  const songsRef = useRef(false);

  // getSongs().then((response) => {
  //   if (response != undefined) {
  //     props.setSongs(response);
  //   }
  // });

  // useEffect(() => {
  //   if (songsRef.current) return;
  //   songsRef.current = true;
  //   getSongs().then((response) => {
  //     if (response != undefined) {
  //       props.setSongs(response);
  //     }
  //   }),
  //     [];
  // });

  useEffect(() => {
    console.log("use effect");
    if (songsRef.current) return;
    songsRef.current = true;
    props.setSongs(getMockSongs(props)), [];
  });

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
