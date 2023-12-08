import React from "react";
import { useState } from "react";
import { Search } from "react-router-dom";
import { Searchbar } from "../creators/creator_search_bar";
import { CreatorFilterButtons } from "./creator_filter";

export function Search() {
  const [commandString, setCommandString] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      handleSubmit();
    }
  };

  function handleSubmit() {
    setCommandString("");
  }

  return (
    <div>
      <div className="creator-searchbar-container" onKeyDown={keyDownHandler}>
        <div>
          <Searchbar
            value={commandString}
            setValue={setCommandString}
            ariaLabel={"creator name and description search bar"}
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
      <div className="creator-filters">
        <CreatorFilterButtons />
      </div>
    </div>
  );
}
