import React, { useState } from "react";

// options:
// sort by most popular to least popular and vice versa
// sort by duration - longest to shortest and vice versa
//

// potentially logos - like big clock to small clock maybeee

// should not be able to select both popularity/duration options but you can do one
// popularity and one duration

// submit button for calling handlers?
export function FilterBox() {
  const [checkedLToMPopular, setCheckedLToMPopular] = useState<boolean>(false);
  const [checkedMToLPopular, setCheckedMToLPopular] = useState<boolean>(false);
  const [checkedSToLDuration, setCheckedSToLDuration] =
    useState<boolean>(false);
  const [checkedLToSDuration, setCheckedLToSDuration] =
    useState<boolean>(false);

  const handleLToMPopular = () => {
    setCheckedLToMPopular(!checkedLToMPopular);
  };

  const handleMToLPopular = () => {
    setCheckedMToLPopular(!checkedMToLPopular);
  };

  const handleSToLDuration = () => {
    setCheckedSToLDuration(!checkedSToLDuration);
  };

  const handleLToSDuration = () => {
    setCheckedLToSDuration(!checkedLToSDuration);
  };

  return (
    <div className="filter-box">
      Sort Songs!
      <br></br>
      <br></br>
      <div className="checkboxes">
        <div>
          <h2>Popularity</h2>
          <Checkbox
            label="most popular to least popular"
            value={checkedMToLPopular}
            onChange={handleMToLPopular}
          />
          <br></br>
          <br></br>
          <Checkbox
            label="least popular to most popular"
            value={checkedLToMPopular}
            onChange={handleLToMPopular}
          />
        </div>
        <div>
          <br></br>
          <h2>Duration</h2>
          <Checkbox
            label="shortest duration to longest duration"
            value={checkedSToLDuration}
            onChange={handleSToLDuration}
          />
          <br></br>
          <br></br>
          <Checkbox
            label="longest duration to shortest duration"
            value={checkedLToSDuration}
            onChange={handleLToSDuration}
          />
        </div>
      </div>
      <br></br>
      <button className="sort-submit-button">Submit</button>
    </div>
  );
}

// cite site?
const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};
