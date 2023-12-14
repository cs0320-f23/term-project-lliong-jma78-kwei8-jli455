import "../../styles/styles.css";
import React from "react";
import { Dispatch, SetStateAction } from "react";

/**
 * Props to wrap input box
 * Fields:
 * value – entered value
 * setValue – setter for entered value
 * ariaLabel – marks interactivity
 */
interface NameInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

/**
 * Component to wrap input box
 * @param param0 Props, as above
 * @returns HTML for command box
 */
export function Searchbar({ value, setValue, ariaLabel }: SearchbarProps) {
  return (
    // index automatically into input box?
    <div>
      <input
        type="text"
        className="search-input"
        value={value}
        placeholder="Search for creators by name or description!"
        onChange={(ev) => setValue(ev.target.value)}
        aria-label={ariaLabel}
      ></input>
    </div>
  );
}
