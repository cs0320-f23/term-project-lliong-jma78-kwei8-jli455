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

interface jsonCreatorResponse {
  result: string;
  // is this the right type?
  data: Array<Map<string, string>>;
}

function isCreatorResponse(rjson: any): rjson is jsonCreatorResponse {
  if (!("result" in rjson)) return false;
  if (!("data" in rjson)) return false;
  if (!(rjson["result"] === "success")) {
    return false;
  }
  return true;
}

export function Search(props: SearchProps) {
  const [commandString, setCommandString] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      handleSubmit(commandString);
    }
  };

  // type predicate for making sure that it's a successful result?
  function handleSubmit(commandString: string) {
    const url =
      "http://localhost:323/creators?action=search&&searchterm=" +
      commandString;
    console.log(url);
    return fetch(url)
      .then((response: Response) => response.json())
      .then((json) => {
        if (!isCreatorResponse(json)) {
          console.log("not a json searching creators");
        } else {
          const creatorsToDisplay: CreatorProps[] = [];

          const data = json.data;

          console.log(data);

          for (let i = 0; i < data.length; i++) {
            const creatorMap = data[i];
            const creatorName = creatorMap["name"];
            const creatorType = creatorMap["type"];
            const creatorDescription = creatorMap["description"];
            const creatorWebsite = creatorMap["website"];
            const creatorInstagram = creatorMap["instagram"];
            const creatorFacebook = creatorMap["facebook"];
            const creatorSpotify = creatorMap["spotify"];
            const creatorPrice = creatorMap["price"];
            const creatorID = creatorMap["id"];

            const creator: CreatorProps = {
              name: creatorName,
              type: creatorType,
              description: creatorDescription,
              website: creatorWebsite,
              instagram: creatorInstagram,
              facebook: creatorFacebook,
              spotify: creatorSpotify,
              price: creatorPrice,
              id: creatorID,
            };

            creatorsToDisplay.push(creator);
          }
          if (creatorsToDisplay.length == 0) {
            setMessage("no creators found with that search term :(");
          } else {
            console.log(creatorsToDisplay);
            props.setCreators(creatorsToDisplay);
            setMessage("");
          }

          setCommandString("");
        }
      });
  }

  // ^ this function for getting songs and maybe another for handling submit to resolve
  // do i need a useEffect for when creators are added/deleted - in order to update?

  function handleSubmitMock(commandString: string) {
    console.log("handle submit clicked");

    const creatorsToDisplay: CreatorProps[] = [];

    // without if command string, it shows everything when you submit

    for (let i = 0; i < allCreators.length; i++) {
      console.log(allCreators[i].name);
      console.log(commandString);
      if (
        // is there a better way to do case insensitivity?
        allCreators[i].name.toUpperCase().includes(commandString.toUpperCase())
      ) {
        creatorsToDisplay.push(allCreators[i]);
      } else {
        if (
          allCreators[i].description
            .toUpperCase()
            .includes(commandString.toUpperCase())
        ) {
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
        <CreatorFilterButtons
          creators={props.creators}
          setCreators={props.setCreators}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
}
