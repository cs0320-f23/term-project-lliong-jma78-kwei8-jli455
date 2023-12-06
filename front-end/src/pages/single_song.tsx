import React from "react";
import "../styles/styles.css";

export interface SongProps {
  name: string;
  duration: number;
  artists: string;
  album: string;
  popularity: number;
  genre: string;
}

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
