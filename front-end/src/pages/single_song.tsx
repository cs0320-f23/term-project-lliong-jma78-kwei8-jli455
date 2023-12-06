import React from "react";
import "../styles/styles.css";

/**
 * props for each individual song
 */
export interface SongProps {
  name: string;
  duration: number;
  artists: string;
  album: string;
  popularity: number;
  genre: string;
}

/**
 * function representing a single song component that will be displayed
 * displays song artist, album, duration, popularity, and genre
 * @param props 
 * @returns 
 */
export function Song(props: SongProps) {
  return (
    <div className="song_single">
      <h1>{props.name}</h1>
      <br></br>
      <h2>artist: {props.artists}</h2>
      <h2>album: {props.album}</h2>
      <h2>duration: {props.duration}</h2>
      <h2>popularity: {props.popularity}</h2>
      <h2>genre: {props.genre}</h2>
    </div>
  );
}
