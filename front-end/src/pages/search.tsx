import React from "react";
import { useState } from "react";
import { Searchbar } from "./search_bar";

export function Search() {
  const [commandString, setCommandString] = useState<string>("");

  function handleSubmit(commandString: string) {
    setCommandString("");
    console.log("button clicked");
    console.log(commandString);
  }

  return (
    <div className="searchbar-container">
      <Searchbar
        value={commandString}
        setValue={setCommandString}
        ariaLabel={"search bar"}
      />
      <button
        className="submit-button"
        aria-label="submit button"
        onClick={() => handleSubmit(commandString)}
      >
        Submit
      </button>
    </div>
  );
}
