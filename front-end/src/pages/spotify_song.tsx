import React from "react";
import "../styles/styles.css";

interface SongProps {
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
      <p>song name here</p>
      <p>artist here</p>
    </div>
  );
}
