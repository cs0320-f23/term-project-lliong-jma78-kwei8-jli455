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

interface numberInputProps {
  numValue: string;
  setNumValue: Dispatch<SetStateAction<string>>;
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
        placeholder="Enter genres here..."
        onChange={(ev) => setValue(ev.target.value)}
        aria-label={ariaLabel}
      ></input>
    </div>
  );
}

/**
 * search bar for entering number of songs to be displayed
 * @param param0
 * @returns
 */
export function NumberInput({
  numValue,
  setNumValue,
  ariaLabel,
}: numberInputProps) {
  return (
    <div>
      <input
        type="text"
        className="search-input"
        value={numValue}
        placeholder="Enter number of songs here..."
        onChange={(ev) => setNumValue(ev.target.value)}
        aria-label={ariaLabel}
      ></input>
    </div>
  );
}
