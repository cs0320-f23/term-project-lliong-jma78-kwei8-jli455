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

export function Search(props: SearchProps) {
  const [commandString, setCommandString] = useState<string>("");
  const [numCommandString, setNumCommandString] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // add errors - where to display - below the input boxes

  // case where both fields are empty - default
  // ^ shuffled songs! new recs!

  function handleSubmit() {
    const songsToDisplay: SongProps[] = [];

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

    // if you are entering number of songs more than there are that exist, should there be a cap? i don't think so...
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
