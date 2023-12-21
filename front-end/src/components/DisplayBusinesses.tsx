import React, { useEffect, useState } from "react";
import { business_dataset } from "../mocks/business/mock_businesses";
import Switch from 'react-switch';
import BusinessCard from "./BusinessCard";
import foodIcon from '../images/food_icon.png'
import groceryIcon from '../images/grocery_icon.png'
import service from '../images/service_icon.png'
import { getJSON, overlayData } from "./overlays";


export default function DisplayBusiness(){

    //MOCKING DATA ----------------------------------------------------------------------------
    const[showMocked, setShowMocked] = useState<boolean>(false);

    let filteredMock = [...business_dataset]

    const [filters, setFilters] = useState(Array(3).fill(false));

    const toggleFilter = (index) => {
        const filtersCopy = [false, false, false]
        filtersCopy[index] = !filtersCopy[index]
        setFilters(filtersCopy)
        filteredMock = [...business_dataset]
    }

    if(filters[0]){
        filteredMock = filteredMock.filter((item) => item['business'] == 'restaurants')
    }
    
    if(filters[1]){
        filteredMock = filteredMock.filter((item) => item['business'] == 'groceries')
    }
    if(filters[2]){
        filteredMock = filteredMock.filter((item) => item['business'] == 'services')
    }

    function toggleMocked(){
        setShowMocked(!showMocked);
    }

    //BACKEND -----------------------------------------------------------------------------------

    const[overlay, setOverlay] = useState<GeoJSON.FeatureCollection | undefined>();
    const[points, setPoints] = useState<GeoJSON.FeatureCollection | undefined>();
    const[popupData, setPopup] = useState({longitude: 0.00, latitude: 0.00, name: ""});
    const[showPop, setShow] = useState<boolean>(false);

    let backendInfo: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features:[]
    }

    console.log(getJSON())

    // setPoints(getJSON)

    if(points != undefined){
        
    }


    return(
        <div className="businesses-container" style={{paddingLeft:"10px"}}>
            <h2>Filter By <Switch onChange={toggleMocked} checked={showMocked}></Switch></h2>
            
            <div style={{display:"flex", gap:"15px"}}>
                <button onClick={() => toggleFilter(0)}><img src={foodIcon}></img><span>Restaurants/Eateries</span></button>
                <button onClick={() => toggleFilter(1)}><img src={groceryIcon}></img><span>Groceries</span></button>
                <button onClick={() => toggleFilter(2)}><img src={service}></img><span>Services</span></button>
            </div>
            <p></p>
            <hr style={{borderTop:"2px solid #8b1a10"}}></hr>
            {showMocked ? <div>
                {filteredMock.map((item, index) => (
                    <div>
                        {BusinessCard(item)}
                    </div>
                ))}
            </div> : <div></div>}
        </div>
    )
    
}