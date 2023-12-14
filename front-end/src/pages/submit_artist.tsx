import React, { useState } from "react";
import {
  DescriptionInputBar,
  NameInputBar,
} from "./creators/submit_creator_input";
import { CreatorTypes } from "./creators/submit_creator_type";

// after sbumitting do we want to give a thank you message? probably, and then say
// feel free to submit another?????

export default function SubmitArtist() {
  const [nameString, setNameString] = useState<string>("");

  const [descriptionString, setDescriptionString] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [checkedTerms, setCheckedTerms] = useState<boolean>(false);
  const handleCheckedTerms = () => {
    setCheckedTerms(!checkedTerms);
  };

  function handleSubmit() {}
  return (
    <div className="submit-artist-page">
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
        <CreatorTypes />
      </div>
      <div>
        <h1>Creator Description/Bio</h1>
        <DescriptionInputBar
          value={descriptionString}
          setValue={setDescriptionString}
          ariaLabel={"description input bar"}
        />
      </div>
      <div className="terms-and-conditions-checkbox">
        <Checkbox
          label="By checking this box, you agree to the Terms and Conditions listed within our Privacy Policy."
          value={checkedTerms}
          onChange={handleCheckedTerms}
        />
      </div>
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

// set of buttons to choose type - probably give a small highlight to it to? and
// then change if person deselects??
// check box to agree - how to make mandatory
// submit button that actually calls the fetch

// can probably just check if the button is checked or not

// would probably be good to have a feedback form as well - like "let us know what
// you wanna see!"
