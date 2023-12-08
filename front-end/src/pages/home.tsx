import React, { useState } from "react";
import "../styles/home.css";
import logoPlaceholder from '../images/nugget-dino3.png';
import downArrow from '../images/down-arrow.png';
import { useNavigate } from "react-router-dom";

export default function Home() {
  // const navigate = useNavigate();

  return(
    <div className="home-page">
      <img src={logoPlaceholder} style={{paddingLeft:"42vw"}}></img>
      <h1 style={{fontSize:"100px"}}>Ablaze</h1>
      <h2 style={{textAlign:"center"}}>Support Asian-Owned Businesses and Artists</h2>
      <div style={{paddingTop:"20vh"}}>
        <h2 style={{textAlign:"center"}}>See Featured</h2>
        <img src={downArrow} 
            style={{width:"45px", height:"45px", paddingLeft:"48.5vw"}}
        ></img>
      </div>
    </div>
  )
}
