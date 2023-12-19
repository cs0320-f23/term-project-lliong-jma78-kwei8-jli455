import React from "react";
import { useState } from "react";
import { Search } from "react-router-dom";
import { allSongs } from "./spotify_contents";
import { Searchbar, NumberInput } from "./spotify_search_bar";
import { SongProps } from "./single_song";

interface SearchProps {
  songs: SongProps[];
  setSongs: React.Dispatch<React.SetStateAction<SongProps[]>>;
}

/**
 * interface with fields that a proper response from the backend handling the spotify api should have
 */
interface jsonSpotifyResponse {
  result: string;
  // is this the right type?

  data: Array<Map<string, object>> | undefined;
  invalidgenres: string[] | undefined;
  validgenres: string[] | undefined;
}

// check valid and invalid?
// is this right/complete?
/**
 * type predicate to check if spotify json response has result field
 * @param rjson
 * @returns
 */
function isSpotifyResponse(rjson: any): rjson is jsonSpotifyResponse {
  if (!("result" in rjson)) return false;
  return true;
  // should i be making different ones for each type of response??
}

/**
 * interface with fields that a successful response from the backend handling the spotify api should have
 */
interface jsonSpotifyResponseSuccessful {
  result: string;
  // is this the right type?

  data: Array<Map<string, object>>;
  invalidgenres: string[] | undefined;
  validgenres: string[];
}

// check valid and invalid?
// is this right/complete?
/**
 * type predicate to check if spotify json response was successful
 * @param rjson
 * @returns
 */
function isSpotifyResponseSuccessful(
  rjson: any
): rjson is jsonSpotifyResponseSuccessful {
  if (!("result" in rjson)) return false;
  if (!("data" in rjson)) return false;
  if (!("validgenres" in rjson)) return false;
  if (!(rjson["result"] === "success")) {
    return false;
  }
  return true;
  // should i be making different ones for each type of response??
}

export function Search(props: SearchProps) {
  const [commandString, setCommandString] = useState<string>("");
  const [numCommandString, setNumCommandString] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // add errors - where to display - below the input boxes

  // case where both fields are empty - default
  // ^ shuffled songs! new recs!

  // what to do if person enters genres incorrectly
  // put a message that says enter multiple genres with comma in between?

  // what about genres that do not exist? this should search for all genres?

  // seems that filter is not updated? like i can search and it will filter on the previous

  // note somewhere that num songs returns number of songs per genre
  // also make sure that you are adding commas in between multiple songs?
  function handleSubmit() {
    console.log("handling submit");
    const songsToDisplay: SongProps[] = [];

    let url = "http://localhost:323/spotify";

    if (commandString) {
      url = url + "?genres=" + commandString;
      if (numCommandString) {
        url = url + "&&numsongs=" + numCommandString;
      }
    } else {
      url = url + "?numsongs=" + numCommandString;
    }
    // num songs seems to return one of each genre?
    // backend seems to be a little buggy

    console.log(url);

    fetch(url)
      .then((response: Response) => response.json())
      .then((json) => {
        if (!isSpotifyResponse(json)) {
          console.log(json);
          console.log("not a json spotify search");
        } else {
          // should be if genre does not exist or number of songs is not an integer
          if (json.result == "error") {
            setMessage(
              "Please check that the genre entered is valid and that the number of songs is an integer value!"
            );
            setCommandString("");
            setNumCommandString("");
            // do case where one of the genres is incorrect

            if (
              json.invalidgenres != undefined &&
              json.invalidgenres.length > 0
            ) {
              setMessage(
                "Please check that all genres entered are valid and in the proper format! Hint: Separate songs with a comma and no spaces, such as 'k-pop,indian,folk'. " +
                  "'" +
                  json.invalidgenres +
                  "'" +
                  " is not valid."
              );
            }
          } else {
            if (!isSpotifyResponseSuccessful(json)) {
              console.log("not a successful json spotify search");
              console.log(json);
            } else {
              const songsToDisplay: SongProps[] = [];
              const data = json.data;

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

                songsToDisplay.push(song);
              }
              props.setSongs(songsToDisplay);

              if (
                json.invalidgenres != undefined &&
                json.invalidgenres.length > 0
              ) {
                console.log("success but invalid genre");
                setMessage(
                  "Please check that all genres entered are valid and in the proper format! Hint: Separate songs with a comma and no spaces, such as 'k-pop,indian,folk'. " +
                    "'" +
                    json.invalidgenres +
                    "'" +
                    " is not valid."
                );
              } else {
                setMessage("");
              }
            }
            setCommandString("");
            setNumCommandString("");
          }
        }
      });
  }
  // why does it show and then go back to default songs

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="spotify-searchbar-container" onKeyDown={keyDownHandler}>
      <div>
        <Searchbar
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"genre search bar"}
        />
        <br></br>
        <NumberInput
          numValue={numCommandString}
          setNumValue={setNumCommandString}
          ariaLabel={"number search bar"}
        />
        <br></br>
        {message}
      </div>

      <button
        className="submit-button"
        aria-label="submit button"
        onClick={() => handleSubmit()}
      >
        Submit
      </button>
    </div>
  );
}
