import React, { useEffect, useState } from "react";
import Map, {Layer, MapLayerMouseEvent, Popup, Source, ViewStateChangeEvent} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css"
import { APIKey } from "../../private/key";
import { getJSON, pointFill } from "./overlays";

interface map{
  data: any
}

export default function MapBox(props: map){
  const pvdLatitude = 41.82780
  const pvdLongitude = -71.40125
  const initialZoom = 15

  const bosLatitude = 42.36332
  const bosLongitude = -71.09684
  
  const[viewPVD, setPVD] = useState({
    longitude: pvdLongitude,
    latitude: pvdLatitude,
    zoom: initialZoom
  })

  const[viewBos, setBos] = useState({
    longitude: bosLongitude,
    latitude: bosLatitude,
    zoom: initialZoom
  })

  let points = props.data
  let feats = points.features
  // const[points, setPoints] = useState<GeoJSON.FeatureCollection | undefined>();

  const[popupData, setPopup] = useState({longitude: 0.00, latitude: 0.00, name:""});
  const[showPop, setShow] = useState<boolean>(false);

  /**
   * This function finds a specific feature given coordinates
   * @param targetCoords - [longitude, latitude]
   * @returns - the feature found 
   */
  function findFeatureByCoords(targetCoords: number[]){

    let foundFeat: GeoJSON.Feature;                 // an empty GeoJSON.Feature

    // iterate through until a feature is found (if any)
    while(foundFeat === undefined){
        // loop there every feature in the features list 
        for(const item of feats){
            if(item.geometry.type === 'Point'){         // checks to make sure the type is a 'point'
                // retrieves the coords of the feature
                const itemCoords = item.geometry.coordinates
                // console.log(itemCoords[1] - targetCoords[0])
                // checks to see if the difference between targetCoords and itemCoords - if marginal, it's safe to assume we're in the bubble to view popup
                if(Math.abs(itemCoords[0] - targetCoords[1]) <= 0.001 && Math.abs(itemCoords[1] - targetCoords[0]) <= 0.001){
                    foundFeat = item;           // update the foundfeat to the specific feature
                    console.log(targetCoords)
                    return foundFeat
                }
            }
        }
        return null        
    }
  }

  // this function compiles the information for the popup based on the MapLayerMouseEvent e
  function displayPopUp(e:MapLayerMouseEvent){
    let coordsVar = [e.lngLat.lng, e.lngLat.lat]        // retrieves the coords

    let businessName = "" 

    // finds the property that matches the coords from the MapLayerMouseEvent
    const business = findFeatureByCoords(coordsVar)?.properties

    // updates the vars
    if(business !== undefined && business !== null){
        businessName = business.name;
    }

    // updates the popupData field 
    setPopup({
        longitude: coordsVar[0],
        latitude: coordsVar[1],
        name: businessName,
    })

    setShow(true)       // update the boolean field
  }

  // this function resets the popup data to empty
  function resetPopUp(){
      setPopup({longitude: 0.00, latitude: 0.00, name: ""})
  }

  console.log(popupData)

  return(
    <div>
      {true ? 
        <Map
        mapboxAccessToken={APIKey}
        longitude={viewPVD.longitude}
        latitude={viewPVD.latitude}
        zoom={viewPVD.zoom}

        onMove={(ev: ViewStateChangeEvent) => setPVD(ev.viewState)}
        style={{width: window.innerWidth, height: window.innerHeight}}
        mapStyle={"mapbox://styles/mapbox/outdoors-v12"}
        onClick={(ev:MapLayerMouseEvent) => displayPopUp(ev)}    

      >
        {!(points == undefined) ? <Source id='businesses' type='geojson' data={points}>
          <Layer {...pointFill}></Layer>
        </Source> : ""}
        {showPop ? (
        <Popup
            latitude={popupData.latitude}
            longitude={popupData.longitude}
            onClose={() => resetPopUp}
            closeButton={false}
            closeOnClick={false}
          >
            <div>
              <b>Name:</b> {popupData.name}
            </div>
          </Popup>) : resetPopUp}
      </Map>      
      : <Map
          mapboxAccessToken={APIKey}
          longitude={viewBos.longitude}
          latitude={viewBos.latitude}
          zoom={viewBos.zoom}

          onMove={(ev: ViewStateChangeEvent) => setBos(ev.viewState)}
          style={{width: window.innerWidth, height: window.innerHeight}}
          mapStyle={"mapbox://styles/mapbox/outdoors-v12"}
        >
          {!(points == undefined) ? <Source id='businesses' type='geojson' data={points}>
            <Layer {...pointFill}></Layer>
          </Source> : ""}
          {showPop ? (<Popup
            latitude={popupData.latitude}
            longitude={popupData.longitude}
            onClose={() => resetPopUp}
            closeButton={false}
            closeOnClick={false}
          >
            <div>
              <b>Name:</b> {popupData.name}
            </div>
          </Popup>) : resetPopUp}
        </Map>}
    </div>

  )

}

