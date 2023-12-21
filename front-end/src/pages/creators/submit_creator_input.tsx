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
 * Component for input box where name is entered
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

/**
 * Component for input box where description is entered
 * @param param0 Props, as above
 * @returns HTML for command box
 */
export function DescriptionInputBar({
  value,
  setValue,
  ariaLabel,
}: CreatorInputProps) {
  return (
    <div>
      <textarea
        className="creator-input"
        value={value}
        placeholder="Enter the creator's description or bio..."
        onChange={(ev) => setValue(ev.target.value)}
        aria-label={ariaLabel}
      ></textarea>
    </div>
  );
}

/**
 * Component for input box where website is entered
 * @param param0 Props, as above
 * @returns HTML for command box
 */
export function WebsiteInput({
  value,
  setValue,
  ariaLabel,
}: CreatorInputProps) {
  return (
    <div>
      <input
        type="text"
        className="creator-additional-input"
        value={value}
        placeholder="Enter website here"
        onChange={(ev) => setValue(ev.target.value)}
        aria-label={ariaLabel}
      ></input>
    </div>
  );
}

/**
 * Component for input box where price is entered
 * @param param0 Props, as above
 * @returns HTML for command box
 */
export function PriceInput({ value, setValue, ariaLabel }: CreatorInputProps) {
  return (
    <div>
      <input
        type="text"
        className="creator-additional-input"
        value={value}
        placeholder="Enter price range here"
        onChange={(ev) => setValue(ev.target.value)}
        aria-label={ariaLabel}
      ></input>
    </div>
  );
}

/**
 * Component for input box where instagram link is entered
 * @param param0 Props, as above
 * @returns HTML for command box
 */
export function InstagramInput({
  value,
  setValue,
  ariaLabel,
}: CreatorInputProps) {
  return (
    <div>
      <input
        type="text"
        className="creator-additional-input"
        value={value}
        placeholder="Enter instagram handle here (@...)"
        onChange={(ev) => setValue(ev.target.value)}
        aria-label={ariaLabel}
      ></input>
    </div>
  );
}

/**
 * Component for input box where facebook link is entered
 * @param param0 Props, as above
 * @returns HTML for command box
 */
export function FacebookInput({
  value,
  setValue,
  ariaLabel,
}: CreatorInputProps) {
  return (
    <div>
      <input
        type="text"
        className="creator-additional-input"
        value={value}
        placeholder="Enter link to Facebook page here"
        onChange={(ev) => setValue(ev.target.value)}
        aria-label={ariaLabel}
      ></input>
    </div>
  );
}

/**
 * Component for input box where spotify link is entered
 * @param param0 Props, as above
 * @returns HTML for command box
 */
export function SpotifyInput({
  value,
  setValue,
  ariaLabel,
}: CreatorInputProps) {
  return (
    <div>
      <input
        type="text"
        className="creator-additional-input"
        value={value}
        placeholder="Enter link to Spotify page here"
        onChange={(ev) => setValue(ev.target.value)}
        aria-label={ariaLabel}
      ></input>
    </div>
  );
}
