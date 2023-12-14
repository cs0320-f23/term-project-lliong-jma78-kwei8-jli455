import React, { useState } from "react";
import '../styles/explore-business.css';
import MapBox from "../components/MapBox";
import { Link } from "react-router-dom";
import DisplayBusiness from "../components/DisplayBusinesses.tsx";

export default function Businesses(){

    return(
        <div className="business-container">
            <div style={{width:"500px"}}>
                <DisplayBusiness></DisplayBusiness>
            </div>
            <div className="business-map" style={{width: "500px"}}>
                <MapBox></MapBox>
            </div>
            
        </div>
    );
}