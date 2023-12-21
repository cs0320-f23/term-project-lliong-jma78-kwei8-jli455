import React, {useState} from "react";
import logo from "../images/nugget-dino3.png";
import accountLogo from "../images/account-icon.png"
import { Link, Outlet } from "react-router-dom";
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
                            <h1 style={{fontSize:"5vh", color:"#4f100a"}}>Ablaze</h1>
                        </Link>
                    </div>
                    <div className="nav-pages" onMouseEnter={handleHoverExplore} onMouseLeave={handleMouseLeave}>
                        <h2>Explore</h2>
                        {showExplore ? 
                            <div>
                                <div className="dropdown-menu">
                                    <ul style={{padding: "unset", margin: "unset"}} className="drop-down">
                                        <h3 style={{color:"#4f100a"}}>
                                            <Link to="/explore_artists" style={{color:"#4f100a"}}>Explore Artists</Link>
                                        </h3>
                                        <h3 style={{color:"#4f100a"}}>
                                            <Link to="/explore_businesses" style={{color:"#4f100a"}}>Explore Businesses</Link>
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
                                        <h3 style={{color:"#4f100a"}}><Link to="/submit_artists" style={{color:"#4f100a"}}>Submit Artists</Link></h3>
                                        <h3 style={{color:"#4f100a"}}><Link to="/submit_businesses" style={{color:"#4f100a"}}>Submit Businesses</Link></h3>
                                    </ul>
                                </div>
                            </div>
                        : null}
                    </div>
                    <div className="nav-pages">
                        <h2 style={{color:"#4f100a"}}><Link to="/resources" style={{color:"#4f100a"}}>Resources</Link></h2>
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