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
interface IDInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

// i think it would be nice if the box changed size if the text wrapped
export function IDInputBar({ value, setValue, ariaLabel }: IDInputProps) {
  return (
    <div>
      <input
        type="text"
        value={value}
        className="creator-input"
        placeholder="Enter the ID of the creator profile...."
        onChange={(ev) => setValue(ev.target.value)}
        aria-label={ariaLabel}
      ></input>
    </div>
  );
}
