import React from "react";
import "../styles/styles.css";

export interface SongProps {
  name: string;
  duration: number;
  artists: string[];
  album: string;
  popularity: number;
  genre: string;
}

export function Song(props: SongProps) {
  // probably get the info here from another file?

  return (
    <div className="song_single">
      <h1>song name here</h1>
      <h2>artist here</h2>
    </div>
  );
}
