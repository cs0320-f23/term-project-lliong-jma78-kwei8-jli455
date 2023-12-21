import React, { useEffect, useState } from "react";
import { business_dataset } from "../mocks/business/mock_businesses";
import Switch from 'react-switch';
import BusinessCard from "./BusinessCard";
import foodIcon from '../images/food_icon.png'
import groceryIcon from '../images/grocery_icon.png'
import service from '../images/service_icon.png'
import { getJSON, overlayData, pointFill } from "./overlays";
import MapBox from "./MapBox";
import { Layer, MapLayerMouseEvent, Popup, Source, ViewStateChangeEvent } from "react-map-gl";
import { APIKey } from "../../private/key";


export default function DisplayBusiness(){
    const[mockedPoints, setMockedPoints] = useState<GeoJSON.FeatureCollection | undefined>();
    const[points, setPoints] = useState<GeoJSON.FeatureCollection | undefined>();

    useEffect(() => {
        setPoints(getJSON(""))
        setMockedPoints(filteredGeo)

    }, []);

    console.log(points)

    //MOCKING DATA ----------------------------------------------------------------------------
    const[showMocked, setShowMocked] = useState<boolean>(false);
    const[updateMock, setUpdate] = useState<boolean>(false); 

    let filteredMock = [...business_dataset]

    const filteredGeo: GeoJSON.FeatureCollection ={
        type: 'FeatureCollection',
        features:[]
    }

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

    // function toggleMocked(){
    //     setShowMocked(!showMocked);
    // }

    // filteredMock.forEach((item, index) => {
    //     const feat: GeoJSON.Feature = {
    //         "type": 'Feature', 
    //         'properties':{
    //           name: item.name,
    //           site: item.url,
    //           phone: item.phone,
    //           address1: item.location['address1'],
    //           address2: item.location['address2'],
    //           city: item.location['city'],
    //           state: item.location['state']
    //         },
    //         "geometry": {
    //           "coordinates": [(item.latitude), (item.longitude)],
    //           "type": "Point"
    //         }
    //       }
    //       filteredGeo.features.push(feat)
    // })
    // BACKEND ----------------

    // let backendData = [{}]
    // let mockedData = [{}]

    // mockedPoints?.features.forEach((item, index) => {
    //     mockedData.push(item.properties)
    // })

    // mockedData.shift()

    // points?.features.forEach((item, index) => {
    //     backendData.push(item.properties)
    // })

    // backendData.shift()

    return(
        // <div style={{display: "flex"}}>
            <div className="businesses-container" style={{paddingLeft:"10px", display:"inline-grid"}}>
                <h1 style={{alignContent:"center"}}>Explore Businesses</h1>
                <div>
                    {/* <h2>Filter By <Switch onChange={toggleMocked} checked={showMocked}></Switch></h2> */}
                    
                    <div style={{display:"flex", gap:"15px"}}>
                        <button onClick={() => toggleFilter(0)}><img src={foodIcon}></img><span>Restaurants/Eateries</span></button>
                        <button onClick={() => toggleFilter(1)}><img src={groceryIcon}></img><span>Groceries</span></button>
                        <button onClick={() => toggleFilter(2)}><img src={service}></img><span>Services</span></button>
                    </div>
                    <p></p>
                    <hr style={{borderTop:"2px solid #8b1a10", width:"100vw"}}></hr>
                </div>
                <div>
                    <div className="Cards">
                        {filteredMock.map((item, index) => (
                            <div>
                                {BusinessCard(item)}
                            </div>
                    ))}
                    </div> 
                </div>
            </div>

    )
    
}