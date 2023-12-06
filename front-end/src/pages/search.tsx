import React from "react";
import { useState } from "react";
import { Searchbar } from "./search_bar";

export function Search() {
  const [commandString, setCommandString] = useState<string>("");

  return (
    <div className="searchbar-container">
      <Searchbar
        value={commandString}
        setValue={setCommandString}
        ariaLabel={"search bar"}
      />
      <button className="submit-button" aria-label="submit button">
        Submit
      </button>
    </div>
  );
}
