import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function NavBarElements(){
  return(
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/explore_artists">Explore Artists</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}