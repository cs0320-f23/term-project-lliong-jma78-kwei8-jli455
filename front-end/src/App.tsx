import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import DropDownNav from "./components/DropDown";

import Home from "./pages/home";
import AboutPage from "./pages/about";
import Businesses from "./pages/explore_businesses";
import SubmitArtist from "./pages/creators/submit_creator";
import SubmitBusinesses from "./pages/submit_business";
import Resources from "./pages/resources";

import { SpotifyPage } from "./pages/spotify/spotify-page";
import { CreatorPage } from "./pages/creators/creator_page";
import { Creator } from "./pages/creators/single_creator";
import { NameInputBar } from "./pages/creators/submit_creator_input";
import { DeleteCreator } from "./pages/creators/delete_creator";
import SubmitCreator from "./pages/creators/submit_creator";

// Pages To Add
//<SpotifyPage /> from spotify_page
//<CreatorPage /> from creator_page
//<SubmitCreator /> from submit_creator (renamed submit artist)
//<DeleteCreator /> from delete_creator

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <DropDownNav />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/explore_artists" element={<CreatorPage />} />
          <Route path="/explore_businesses" element={<Businesses />} />
          <Route path="/submit_artists" element={<SubmitCreator />} />
          <Route path="/submit_businesses" element={<SubmitBusinesses />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
