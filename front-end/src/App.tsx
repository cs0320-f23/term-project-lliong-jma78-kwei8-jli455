import "./styles/App.css";
import React from "react";
import Navbar from "./components/NavBarElements";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// import Home from "./pages/home";
// import About from "./pages/about";
//import { Artists } from "./pages/explore_artists";
import { Song, SongProps } from "./pages/single_song";
import { getMockSongs, SpotifySongs } from "./pages/explore_spotify";

import { small_song_dataset } from "./mocks/mock_songs";
import { Searchbar } from "./pages/search_bar";

/**
 * This is the main class that runs our app.
 * @returns
 */
function App() {
  const [songs, setSongs] = useState<SongProps[]>([]);
  const [commandString, setCommandString] = useState<string>("");


  return (
    <div className="App">
      <Searchbar
        value={commandString}
        setValue={setCommandString}
        ariaLabel={"search bar"}
      />
      <SpotifySongs songs={songs} setSongs={setSongs} />
    </div>
  );
}

export default App;
