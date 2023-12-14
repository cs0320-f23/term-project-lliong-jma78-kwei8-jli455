import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
//import NavBarElements from "./components/NavBarElements";
import DropDownNav from "./components/DropDown";

import Home from "./pages/home";
import AboutPage from "./pages/about";
import Businesses from "./pages/explore_businesses";
import SubmitArtist from "./pages/submit_artist";
import SubmitBusinesses from "./pages/submit_business";
import Resources from "./pages/resources";

import { SpotifyPage } from "./pages/spotify/spotify-page";
import { CreatorPage } from "./pages/creators/creator_page";
import { Creator } from "./pages/creators/single_creator";
import { NameInputBar } from "./pages/creators/submit_creator_input";

//<SpotifyPage />
//<CreatorPage />

export default function App() {
  return (
    <div>
      {/* <Router>
          <Routes>
              <Route path="/home" element={<Home/>}/>
              <Route path="/" element={<Home/>}/>
              <Route path="/about" element={<AboutPage/>}/>
              <Route path="/explore_artists" element={<CreatorPage/>}/>
              <Route path="/explore_businesses" element={<Businesses/>}/>
              <Route path="/submit_artists" element={<SubmitArtist/>}/>
              <Route path="/submit_businesses" element={<SubmitBusinesses/>}/>
              <Route path="/resources" element={<Resources/>}/>
          </Routes>

        </Router> */}

      <SubmitArtist />
    </div>
  );
}

// should we make page contents shrink as the page shrinks?
