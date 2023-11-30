import "./styles/App.css";
import React from "react";
import Navbar from "./components/NavBarElements";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./pages/home";
// import About from "./pages/about";
//import { Artists } from "./pages/explore_artists";
import { Song } from "./pages/spotify_song";

/**
 * This is the main class that runs our app.
 * @returns
 */
function App() {
  return (
    <div className="App">
      <Song
        name={"name"}
        duration={100}
        artists={["artist!"]}
        album={"album"}
        popularity={100}
        genre={"pop"}
      />
      <Song
        name={"name"}
        duration={100}
        artists={["artist!"]}
        album={"album"}
        popularity={100}
        genre={"pop"}
      />
    </div>
  );
}

export default App;
