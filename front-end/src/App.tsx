import React, { useState } from "react";
import Home from "./pages/home";
import AboutPage from "./pages/about";
import {Artists} from "./pages/explore_artists";
import Businesses from "./pages/explore_businesses";
import { BrowserRouter as Router, Routes, Route, BrowserRouter, useNavigate } from "react-router-dom"; 
import NavBarElements from "./components/NavBarElements";
import DropDownNav from "./components/DropDown";

export default function App() {

  return (
      <div>
        <DropDownNav></DropDownNav>
        <Router>
          <Routes>
            <Route path="/" element={<NavBarElements/>}>
              <Route index element={<Home/>}></Route>
              <Route path="/home" element={<Home/>}/>
              <Route path="/explore_artists" element={<Artists/>}/>
              <Route path="/explore_businesses" element={<Businesses/>}/>
            </Route>
          </Routes>

        </Router>

      </div>


  );
}