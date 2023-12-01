import React, { useState } from "react";
import '../styles/home.css'
import DropDownMenu from "../components/DropDown";
import accountImg from '../images/account-icon.png';
import logoPlaceholder from '../images/nugget-dino3.png';

export default function HomePage() {
    const[isDropDownVisible, setDropDownVisible] = useState<boolean>(false);

    const handleMouseHover = () => {
        setDropDownVisible(true);
    }

    const handleMouseLeave = () =>{
        setDropDownVisible(false);
    }



    return (
        <div id="home-page">
            <header id="header-row" aria-label="Navigation Bar" style={{float:"right"}}>
                <div className="nav-page-columns" onMouseEnter={handleMouseHover} onMouseLeave={handleMouseLeave}>
                    <h2>Explore</h2>
                    {isDropDownVisible ? <DropDownMenu></DropDownMenu> : null}
                </div>
                <div className="nav-page-columns">
                    <h2>Submit</h2>
                </div>
                <div className="nav-page-columns">
                    <h2>Resources</h2>
                </div>
                <div className="site-icons">
                    <img src={accountImg} style={{width: '50px', paddingTop:"8px", paddingLeft:"10px"}}></img>
                </div>
            </header>
            <div id="home-logo">
                <img src={logoPlaceholder}></img>
            </div>
            <div id="home-name">
                <h1 style={{textAlign:'center', fontSize:'100px'}}>Ablaze</h1>
                <h2 style={{textAlign: 'center'}}>Discover Asian American and Pacific Islander creators and businesses!</h2>
            </div>
        </div>
    );
  }
  