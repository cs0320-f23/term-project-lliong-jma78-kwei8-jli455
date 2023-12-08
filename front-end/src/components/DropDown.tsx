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
                    <div className="nav-pages" style={{}}>
                        <img src={logo} style={{width: "90px", height:"80px", paddingInline:"50px"}} onClick={() => navigate("/home")}></img>
                    </div>
                    <div className="nav-pages" style={{float:"left", paddingRight:"50vw"}}>
                        <h1 onClick={() => navigate("/home")} style={{fontSize:"40px"}}>Ablaze</h1>
                    </div>   
                    <div className="nav-pages" onMouseEnter={handleHoverExplore} onMouseLeave={handleMouseLeave}>
                        <h2 style={{paddingTop:"25px"}}>Explore</h2>
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
                        <h2 style={{paddingTop:"25px"}}>Submit</h2>
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
                        <h2 style={{paddingTop:"25px"}} onClick={() => navigate("/resources")}>Resources</h2>
                    </div>
                    <div className="nav-pages">
                        <h2 style={{paddingTop:"25px"}} onClick={() => navigate("/about")}>About</h2>
                    </div>
                    <div className="nav-pages">
                        <img src={accountLogo} style={{paddingTop:"25px"}} className="acc-logo"></img>
                    </div>

                </header>
            </nav>
        </div>
    );
}