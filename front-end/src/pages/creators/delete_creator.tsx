import React, { useState } from "react";
import { IDInputBar } from "./delete_creator_input";

// interface with fields expected of delete creator response from backend
interface jsonDeleteResponse {
  result: string;
  details: string;
}

/**
 * checks if delete creator response from backend is successful
 * @param rjson 
 * @returns 
 */
function isDeleteResponse(rjson: any): rjson is jsonDeleteResponse {
  if (!("result" in rjson)) return false;
  if (!("details" in rjson)) return false;
  return true;
}

/**
 * main component for delete creator page, holds input box and submit button
 * @returns
 */
export function DeleteCreator() {
  const [IDString, setIDString] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  /**
   * function for calling to the backend and deleting a creator based on id
   */
  function handleSubmit() {
    const url = "http://localhost:323/creators?action=delete&&id=" + IDString;

    fetch(url)
      .then((response: Response) => response.json())
      .then((json) => {
        if (!isDeleteResponse(json)) {
          console.log("not a json deleting creators");
        } else {
          if (json.result == "error") {
            setMessage("The ID provided was not found.");
          } else {
            setMessage(
              "Thanks, you have requested to delete creator id#" +
                IDString +
                "! We'll handle it from here :)"
            );
          }
        }
      });

    setIDString("");
  }

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="delete-creator-page" onKeyDown={keyDownHandler}>
      <h1>Want to delete your creator profile?</h1>
      <div className="delete-creator-description">
        <h2>
          Enter the ID number of your creator profile, which can be found in the
          bottom right corner of each creator displayed on our "Explore
          Creators" page!
        </h2>
      </div>
      <IDInputBar
        value={IDString}
        setValue={setIDString}
        ariaLabel={"id input bar"}
      />
      {message}
      <br></br>
      <br></br>
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
