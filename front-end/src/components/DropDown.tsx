import React, { useState } from "react";

interface dropdown{
    artistsIsActive: boolean;
    businessIsActive: boolean;
}

export default function DropDownMenu(props: dropdown){

    const setArtists = () => {
        props.artistsIsActive = true
    }

    const setBusinesses = () => {
        props.businessIsActive = true
    }

    return(
        <div className="dropdown-menu">
            <ul style={{padding: "unset", margin:"unset"}}>
                <h3 onClick={setArtists}>Explore Creators</h3>
                <h3 onClick={setBusinesses}>Explore Businesses</h3>
            </ul>
        </div>
    );
}

