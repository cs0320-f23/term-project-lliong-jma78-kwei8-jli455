import React, { useState } from "react";

export default function DropDownMenu(){

    const[areArtistsVisible, setArtistsVisible] = useState<boolean>(false)

    function handleExploreCreators(){
        console.log("clicked");
        setArtistsVisible(true)
    }

    return(
        <div className="dropdown-menu">
            <ul style={{padding: "unset", margin:"unset"}}>
                <h3 onClick={handleExploreCreators}>Explore Creators</h3>
                <h3>Explore Businesses</h3>
            </ul>

            <div>
                {areArtistsVisible ? <Artists></Artists> : null}
            </div>

        </div>
    );
}

