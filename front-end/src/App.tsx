import "./styles/App.css";
import React from "react";
import Navbar from "./components/NavBarElements";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Song, SongProps } from "./pages/single_song";
import { getMockSongs, SpotifySongs } from "./pages/explore_spotify";

import { small_song_dataset } from "./mocks/mock_songs";
import { Search } from "./pages/search";
import { FilterBox } from "./pages/filter";

/**
 * This is the main class that runs our app.
 * @returns
 */
function App() {
  const [songs, setSongs] = useState<SongProps[]>([]);

  return (
    <div className="App">
      <Search />
      <br></br>
      <br></br>

      <FilterBox />

      <SpotifySongs songs={songs} setSongs={setSongs} />
    </div>
  );
}

export default App;

// should we make page contents shrink as the page shrinks?
