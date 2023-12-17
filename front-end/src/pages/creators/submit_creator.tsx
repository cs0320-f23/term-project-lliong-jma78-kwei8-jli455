import React, { useState } from "react";
import {
  DescriptionInputBar,
  FacebookInput,
  InstagramInput,
  NameInputBar,
  PriceInput,
  SpotifyInput,
  WebsiteInput,
} from "./submit_creator_input";
import { CreatorTypes } from "./submit_creator_type";

// after sbumitting do we want to give a thank you message? probably, and then say
// feel free to submit another?????

/**
 * main component for submit creators page, holds all of the input fields and submit button
 * @returns 
 */
export default function SubmitCreator() {
  const [nameString, setNameString] = useState<string>("");

  const [creatorTypeString, setCreatorTypeString] = useState<string>("");

  const [descriptionString, setDescriptionString] = useState<string>("");
  const [websiteString, setWebsiteString] = useState<string>("");
  const [priceString, setPriceString] = useState<string>("");
  const [instaString, setInstaString] = useState<string>("");
  const [facebookString, setFacebookString] = useState<string>("");
  const [spotifyString, setSpotifyString] = useState<string>("");

  // these are for highlighting buttons and setting their style
  const [visualArtsStyle, setVisualArtsStyle] = useState<string>(
    "creator-filter-button"
  );
  const [performingArtsStyle, setPerformingArtsStyle] = useState<string>(
    "creator-filter-button"
  );
  const [literaryArtsStyle, setLiteraryArtsStyle] = useState<string>(
    "creator-filter-button"
  );
  const [artisansStyle, setArtisansStyle] = useState<string>(
    "creator-filter-button"
  );
  const [otherStyle, setOtherStyle] = useState<string>("creator-filter-button");

  const [message, setMessage] = useState<string>("");

  const [checkedTerms, setCheckedTerms] = useState<boolean>(false);
  const handleCheckedTerms = () => {
    setCheckedTerms(!checkedTerms);
  };

  /**
   * function for calling the backend and adding a creator
   */
  function handleSubmit() {

    if (!checkedTerms) {
      // make sure to set message to empty string otherwise
      setMessage(
        "make sure the required fields are filled in and that you have agreed to the terms and conditions"
      );
    } else {
      if (
        nameString == "" ||
        descriptionString == "" ||
        creatorTypeString == ""
      ) {
        setMessage(
          "please make sure required fields are filled in (name, category, description)"
        );
      } else {
        let url =
          "http://localhost:323/creators?action=add&&name=" +
          nameString +
          "&&description=" +
          descriptionString +
          "&&type=" +
          creatorTypeString;

        if (priceString != "") {
          url = url + "&&price=" + priceString;
        }

        if (websiteString != "") {
          url = url + "&&website=" + websiteString;
        }

        if (instaString != "") {
          url = url + "&&instagram=" + instaString;
        }

        if (facebookString != "") {
          url = url + "&&facebook=" + facebookString;
        }

        if (spotifyString != "") {
          url = url + "&&spotify=" + spotifyString;
        }

        console.log(url);
        fetch(url);

        setNameString("");
        setDescriptionString("");
        setPriceString("");
        setWebsiteString("");
        setInstaString("");
        setFacebookString("");
        setSpotifyString("");
        setMessage("thanks for submitting! :)");
        setCheckedTerms(false);

        setVisualArtsStyle("creator-filter-button");
        setPerformingArtsStyle("creator-filter-button");
        setLiteraryArtsStyle("creator-filter-button");
        setArtisansStyle("creator-filter-button");
        setOtherStyle("creator-filter-button");

        setCreatorTypeString("");
      }
    }
  }

    const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.code === "Enter") {
        handleSubmit();
      }
    };

  return (
    <div className="submit-creator-page" onKeyDown={keyDownHandler}>
      <div>
        <h1>Creator Name</h1>
        <NameInputBar
          value={nameString}
          setValue={setNameString}
          ariaLabel={"name input bar"}
        />
      </div>
      <div>
        <h1>Category</h1>
        <CreatorTypes
          creatorType={creatorTypeString}
          setCreatorType={setCreatorTypeString}
          visualArtsStyle={visualArtsStyle}
          setVisualArtsStyle={setVisualArtsStyle}
          performingArtsStyle={performingArtsStyle}
          setPerformingArtsStyle={setPerformingArtsStyle}
          literaryArtsStyle={literaryArtsStyle}
          setLiteraryArtsStyle={setLiteraryArtsStyle}
          artisansStyle={artisansStyle}
          setArtisansStyle={setArtisansStyle}
          otherStyle={otherStyle}
          setOtherStyle={setOtherStyle}
        />
      </div>
      <div>
        <h1>Creator Description/Bio</h1>
        <DescriptionInputBar
          value={descriptionString}
          setValue={setDescriptionString}
          ariaLabel={"description input bar"}
        />
      </div>
      <div>
        <h1>Additional Information and Links</h1>
        <div className="additional-info-input">
          <h2>Price: </h2>

          <PriceInput
            value={priceString}
            setValue={setPriceString}
            ariaLabel={"price input bar"}
          />
        </div>
        <div className="additional-info-input">
          <h2>Website: </h2>
          <WebsiteInput
            value={websiteString}
            setValue={setWebsiteString}
            ariaLabel={"website input bar"}
          />
        </div>
        <div className="additional-info-input">
          <h2>Instagram: </h2>
          <InstagramInput
            value={instaString}
            setValue={setInstaString}
            ariaLabel={"instagram input bar"}
          />
        </div>
        <div className="additional-info-input">
          <h2>Facebook: </h2>
          <FacebookInput
            value={facebookString}
            setValue={setFacebookString}
            ariaLabel={"facebook input bar"}
          />
        </div>
        <div className="additional-info-input">
          <h2>Spotify: </h2>
          <SpotifyInput
            value={spotifyString}
            setValue={setSpotifyString}
            ariaLabel={"spotify input bar"}
          />
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="terms-and-conditions-checkbox">
        <Checkbox
          label="By checking this box, you agree to the Terms and Conditions listed within our Privacy Policy."
          value={checkedTerms}
          onChange={handleCheckedTerms}
        />
      </div>
      <br></br>
      {message}
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

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};



// can probably just check if the button is checked or not?

// would probably be good to have a feedback form as well - like "let us know what
// you wanna see!"
