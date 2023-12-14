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
interface CreatorInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

/**
 * Component to wrap input box
 * @param param0 Props, as above
 * @returns HTML for command box
 */
export function NameInputBar({
  value,
  setValue,
  ariaLabel,
}: CreatorInputProps) {
  return (
    // index automatically into input box?
    <div>
      <input
        type="text"
        className="creator-input"
        value={value}
        placeholder="Enter the creator's name..."
        onChange={(ev) => setValue(ev.target.value)}
        aria-label={ariaLabel}
      ></input>
    </div>
  );
}

// i think it would be nice if the box changed size if the text wrapped
export function DescriptionInputBar({
  value,
  setValue,
  ariaLabel,
}: CreatorInputProps) {
  return (
    <div>
      <input
        type="text"
        className="creator-input"
        value={value}
        placeholder="Enter the creator's description or bio..."
        onChange={(ev) => setValue(ev.target.value)}
        aria-label={ariaLabel}
      ></input>
    </div>
  );
}
