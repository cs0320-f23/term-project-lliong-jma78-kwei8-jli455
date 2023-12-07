import React, { useState } from "react";

// options:
// sort by most popular to least popular and vice versa
// sort by duration - longest to shortest and vice versa
//
export function FilterBox() {
  const [checkedLToMPopular, setCheckedLToMPopular] = useState<boolean>(false);

  const handleLToMPopular = () => {
    setCheckedLToMPopular(!checkedLToMPopular);
  };

  return (
    <div className="filter-box">
      Sort Songs!
      <br></br>
      <br></br>
      <div className="checkboxes">
        <Checkbox
          label="most popular to least popular"
          value={checkedLToMPopular}
          onChange={handleLToMPopular}
        />

        <br></br>
        <br></br>

        <Checkbox
          label="least popular to most popular"
          value={checkedLToMPopular}
          onChange={handleLToMPopular}
        />

        <br></br>
        <br></br>

        <Checkbox
          label="shortest duration to longest duration"
          value={checkedLToMPopular}
          onChange={handleLToMPopular}
        />

        <br></br>
        <br></br>

        <Checkbox
          label="longest duration to shortest duration"
          value={checkedLToMPopular}
          onChange={handleLToMPopular}
        />
      </div>
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
