import React, {useEffect, useState} from "react";
import logo from "../images/nugget-dino3.png";
import accountLogo from "../images/account-icon.png"
import { Link, Outlet, Route, Router, useNavigate } from "react-router-dom";
import "../styles/DropDown.css"

export default function DropDownNav(){

    const [showExplore, setShowExplore] = useState<boolean>(false);
    const [showSubmit, setShowSubmit] = useState<boolean>(false);

    function handleHoverExplore(){
        setShowExplore(true);
    }

    function handleHoverSubmit(){
        setShowSubmit(true);
    }

    function handleMouseLeave(){
        setShowSubmit(false);
        setShowExplore(false);
    }

    return(
        <div id="nav-bar">
            <nav className="nav-container">
                <header id="header-row" aria-label="dropdown navigation bar">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} style={{width:"110px", height:"100px", float:"left", paddingLeft:"0.5vw"}}></img>
                        </Link>
                    </div>
                    <div className="title" style={{float:"left", paddingRight:"50vw", paddingLeft:"6vw", paddingTop:"1vh"}}>
                        <Link to="/">
                            <h1 style={{fontSize:"5vh"}}>Ablaze</h1>
                        </Link>
                    </div>
                    <div className="nav-pages" onMouseEnter={handleHoverExplore} onMouseLeave={handleMouseLeave}>
                        <h2>Explore</h2>
                        {showExplore ? 
                            <div>
                                <div className="dropdown-menu">
                                    <ul style={{padding: "unset", margin: "unset"}} className="drop-down">
                                        <h3>
                                            <Link to="/explore_artists">Explore Artists</Link>
                                        </h3>
                                        <h3>
                                            <Link to="/explore_businesses">Explore Businesses</Link>
                                        </h3>
                                    </ul>
                                </div>
                            </div> : null}
                    </div>
                    <div className="nav-pages" onMouseEnter={handleHoverSubmit} onMouseLeave={handleMouseLeave}>
                        <h2>Submit</h2>
                        {showSubmit ? 
                            <div>
                                <div className="dropdown-menu">
                                    <ul style={{padding: "unset", margin: "unset"}} className="drop-down">
                                        <h3><Link to="/submit_artists">Submit Artists</Link></h3>
                                        <h3><Link to="/submit_businesses">Submit Businesses</Link></h3>
                                    </ul>
                                </div>
                            </div>
                        : null}
                    </div>
                    <div className="nav-pages">
                        <h2><Link to="/resources">Resources</Link></h2>
                    </div>
                    <div className="nav-pages">
                        <img src={accountLogo} className="acc-logo"></img>
                    </div>
                </header>
            </nav>
            <Outlet />
        </div>
    );
}