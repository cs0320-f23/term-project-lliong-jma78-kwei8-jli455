import React, { useState } from "react";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 



export default function App() {

  return (
    <div>
      {/* <Router>
        <Routes>
          <Route path="/home" element={<HomePage />}></Route>
        </Routes>
      </Router> */}
      <HomePage></HomePage>
    </div>
  );
}