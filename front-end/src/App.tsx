import "./styles/App.css";
import React from "react";
import Navbar from "./components/NavBarElements";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { SpotifyPage } from "./pages/spotify-page";

/**
 * This is the main class that runs our app.
 * @returns
 */
function App() {
  return (
    <div className="App">
      <SpotifyPage />
    </div>
  );
}

export default App;

// should we make page contents shrink as the page shrinks?
