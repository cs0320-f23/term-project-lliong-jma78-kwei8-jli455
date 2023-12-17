import React from "react";
import { useState } from "react";
import { Search } from "react-router-dom";
import { allSongs, allGenres } from "./spotify_contents";
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
  invalidgenres: string[];
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
  if (!("invalidgenres" in rjson)) return false;
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

  function handleSubmit() {
    console.log("handling submit");
    const songsToDisplay: SongProps[] = [];

    let url = "http://localhost:323/spotify";

    if (commandString) {
      url = url + "?genres=" + commandString;
    }

    // do case where there is a number but not command string
    if (numCommandString) {
      url = url + "&&numsongs=" + numCommandString;
    }

    console.log(url);

    fetch(url)
      .then((response: Response) => response.json())
      .then((json) => {
        if (!isSpotifyResponse(json)) {
          console.log(json);
          console.log("not a json spotify search");
        } else {
          if (json.result == "error") {
            setMessage(
              "Please check that the genre entered is valid and that the number of songs is an integer value!"
            );
            // do case where one of the genres is incorrect
          } else {
            if (!isSpotifyResponseSuccessful(json)) {
              console.log("not a successful json spotify search");
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
              setMessage("");
            }
            setCommandString("");
            setNumCommandString("");
          }
        }
      });
  }
  // why does it show and then go back to default songs

  function handleSubmitMock() {
    const songsToDisplay: SongProps[] = [];

    // check when there are multiple genres
    const commandStringArray: string[] = commandString.split(",");

    if (commandString) {
      if (!allGenres.includes(commandString)) {
        setMessage("Please enter a valid genre!");
      } else {
        setMessage("");
        for (let i = 0; i < allSongs.length; i++) {
          if (allSongs[i].genre == commandString) {
            songsToDisplay.push(allSongs[i]);
          }
        }
        props.setSongs(songsToDisplay);
      }
    }

    // what about for multiple genres???
    // for multple genres maybe say "----" is not valid

    // is this too many if statements rippppp

    if (numCommandString) {
      const num = parseInt(numCommandString);

      if (isNaN(num)) {
        setMessage("Please enter a valid number!");
        if (!allGenres.includes(commandString)) {
          setMessage("Please enter a valid genre and a valid number!");
        }
      } else {
        if (num < 0) {
          setMessage("Please enter a number greater than or equal to zero");
        } else {
          setMessage("");
          if (!commandString) {
            const splicedSongs = allSongs.slice(0, num);
            props.setSongs(splicedSongs);
          } else {
            if (!allGenres.includes(commandString)) {
              setMessage("Please enter a valid genre!");
              const splicedSongs = allSongs.slice(0, num);
              props.setSongs(splicedSongs);
              console.log("invalid genre but valid number");
            } else {
              setMessage("");
              if (songsToDisplay) {
                songsToDisplay.splice(num);
                props.setSongs(songsToDisplay);
                console.log("num songs display");
              }
            }
          }
        }
      }
    }

    setCommandString("");
    setNumCommandString("");
  }

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      handleSubmitMock();
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
        onClick={() => handleSubmitMock()}
      >
        Submit
      </button>
    </div>
  );
}
