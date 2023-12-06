import React from "react";
import { useState } from "react";
import { Search } from "react-router-dom";
import { allSongs, allGenres } from "./explore_spotify";
import { Searchbar, NumberInput } from "./search_bar";
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
  function handleSubmit() {
    const songsToDisplay: SongProps[] = [];
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
    // add condition for when it is both not a valid genre/number?

    if (numCommandString) {
      const num = parseInt(numCommandString);
      if (isNaN(num)) {
        setMessage("Please enter a valid number!");
        console.log("not a valid number");
      }
    }

    setCommandString("");
    setNumCommandString("");
  }

  return (
    <div className="searchbar-container">
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
