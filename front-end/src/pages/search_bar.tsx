import "../styles/styles.css";
import React from "react";
import { Dispatch, SetStateAction } from "react";

// probably two input boxes, one for number of songs and one for genre
/**
 * Props to wrap input box
 * Fields:
 * value – entered value
 * setValue – setter for entered value
 * ariaLabel – marks interactivity
 */
interface SearchbarProps {
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
    <div className="searchbar-container">
      <input
        type="text"
        className="search-input"
        value={value}
        placeholder="Enter a genre here..."
        onChange={(ev) => setValue(ev.target.value)}
        aria-label={ariaLabel}
      ></input>
    </div>
  );
}
