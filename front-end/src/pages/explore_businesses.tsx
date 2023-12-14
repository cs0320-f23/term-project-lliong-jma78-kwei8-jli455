import React from "react";
import '../styles/explore-business.css';
import MapBox from "../components/MapBox";

export default function Businesses(){
    return(
        <div className="business-container">
            <div style={{width:"500px"}}>
            </div>
            <div className="business-map" style={{width: "500px"}}>
                <MapBox></MapBox>
            </div>
            
        </div>
    );
}