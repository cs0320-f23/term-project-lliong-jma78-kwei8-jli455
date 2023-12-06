import React from "react";
import { useState } from "react";
import { Searchbar, NumberInput } from "./search_bar";

export function Search() {
  const [commandString, setCommandString] = useState<string>("");
  const [numCommandString, setNumCommandString] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // add errors - where to display - below the input boxes
  function handleSubmit() {
    setCommandString("");
    console.log("button clicked");
    console.log(commandString);
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
