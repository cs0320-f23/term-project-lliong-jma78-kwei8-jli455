import React, {useEffect, useState} from "react";
import logo from "../images/nugget-dino3.png";
import accountLogo from "../images/account-icon.png"
import { Route, Router, useNavigate } from "react-router-dom";
import "../styles/DropDown.css"

export default function DropDownNav(){

    const [showExplore, setShowExplore] = useState<boolean>(false);
    const [showSubmit, setShowSubmit] = useState<boolean>(false);

    const navigate = useNavigate();

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
                <header id="header-row" aria-label="dropdown navigation bar" style={{float:"right"}}>
                    {/* <div className="nav-pages">
                        <div>
                            <img src={logo} style={{left:"10px", float: "left", position:"absolute", width:"90px", height:"90px", paddingTop:"0px"}}></img>

                        </div>
                        <div><h1 style={{left: "10px", float: "left", position: "absolute"}}>Ablaze</h1>
                        </div>
                    </div> */}
                    <div className="nav-pages" onMouseEnter={handleHoverExplore} onMouseLeave={handleMouseLeave}>
                        <h2>Explore</h2>
                        {showExplore ? 
                            <div>
                                <div className="dropdown-menu">
                                    <ul style={{padding: "unset", margin: "unset"}}>
                                        <h3 onClick={() => navigate("/explore_artists")}>Explore Artists</h3>
                                        <h3 onClick={() => navigate("/explore_businesses")}>Explore Businesses</h3>
                                    </ul>
                                </div>
                            </div> : null}
                    </div>
                    <div className="nav-pages" onMouseEnter={handleHoverSubmit} onMouseLeave={handleMouseLeave}>
                        <h2>Submit</h2>
                        {showSubmit ? 
                            <div>
                                <div className="dropdown-menu">
                                    <ul style={{padding: "unset", margin: "unset"}}>
                                        <h3 onClick={() => navigate("/submit_artists")}>Submit Artists</h3>
                                        <h3 onClick={() => navigate("/submit_businesses")}>Submit Businesses</h3>
                                    </ul>
                                </div>
                            </div>
                        : null}
                    </div>
                    <div className="nav-pages">
                        <h2 onClick={() => navigate("/resources")}>Resources</h2>
                    </div>
                    <div className="nav-pages">
                        <img src={accountLogo} className="acc-logo"></img>
                    </div>
                </header>
            </nav>
        </div>
    );
}