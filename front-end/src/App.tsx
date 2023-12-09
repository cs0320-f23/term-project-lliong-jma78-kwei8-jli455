import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter, useNavigate } from "react-router-dom"; 
import DropDownNav from "./components/DropDown";

import Home from "./pages/home";
import AboutPage from "./pages/about";
import {Artists} from "./pages/explore_artists";
import Businesses from "./pages/explore_businesses";
import SubmitArtist from "./pages/submit_artist";
import SubmitBusinesses from "./pages/submit_business";
import Resources from "./pages/resources";

export default function App() {

  return (
      <div>
        <BrowserRouter>
          <DropDownNav/>
          <Routes>
            {/* <Route path="/" element={}> */}
              <Route path="/home" element={<Home/>}/>
              <Route path="/about" element={<AboutPage/>}/>
              <Route path="/explore_artists" element={<Artists/>}/>
              <Route path="/explore_businesses" element={<Businesses/>}/>
              <Route path="/submit_artists" element={<SubmitArtist/>}/>
              <Route path="/submit_businesses" element={<SubmitBusinesses/>}/>
              <Route path="/resources" element={<Resources/>}/>
            {/* </Route> */}
          </Routes>
        </BrowserRouter>
      </div>


  );
}