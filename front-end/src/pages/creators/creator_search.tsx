import React from "react";
import { useState } from "react";
import { Search } from "react-router-dom";
import { Searchbar } from "../creators/creator_search_bar";
import { allCreators } from "./creator_contents";
import { CreatorFilterButtons } from "./creator_filter";
import { CreatorProps } from "./single_creator";

// it is fine to have the props passed to the search right?

interface SearchProps {
  creators: CreatorProps[];
  setCreators: React.Dispatch<React.SetStateAction<CreatorProps[]>>;
}

export function Search(props: SearchProps) {
  const [commandString, setCommandString] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      handleSubmit(commandString);
    }
  };

  function handleSubmit(commandString: string) {
    console.log("handle submit clicked");

    const creatorsToDisplay: CreatorProps[] = [];

    // without if command string, it shows everything when you submit

    for (let i = 0; i < allCreators.length; i++) {
      if (allCreators[i].name.includes(commandString)) {
        creatorsToDisplay.push(allCreators[i]);
      } else {
        if (allCreators[i].description.includes(commandString)) {
          creatorsToDisplay.push(allCreators[i]);
        }
      }
    }
    if (creatorsToDisplay.length == 0) {
      setMessage("no creators found with that search term :(");
    } else {
      props.setCreators(creatorsToDisplay);
      setMessage("");
    }

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
          onClick={() => handleSubmit(commandString)}
        >
          Submit
        </button>
      </div>
      <br></br>
      <div>
        <CreatorFilterButtons creators={props.creators} setCreators={props.setCreators}/>
      </div>
    </div>
  );
}
