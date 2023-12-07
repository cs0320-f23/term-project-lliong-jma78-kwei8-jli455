import React, { useEffect, useState } from "react";

import Map, {Layer, MapLayerMouseEvent, Source, ViewStateChangeEvent} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css"

import { APIKey } from "../private/key";
// import { geoLayer, overlayData } from "./overlay";

export default function MapBox(){
    const pvdLatitude = 41.82780
    const pvdLongitude = -71.40125
    const initialZoom = 20


    const[viewState, setViewState] = useState({
        longitude: pvdLongitude,
        latitude: pvdLatitude,
        zoom: initialZoom
    })

    const [pointData, setPointData] = useState({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-71.41254,41.82429],
            },
            properties: {
              title: 'Providence',
            },
          },
          // Add more points as needed
        ],
      });

    const[overlay, setOverlay] = useState<GeoJSON.FeatureCollection | undefined>(undefined);

    // useEffect(() => {
    //     setOverlay(overlayData())
    // }, []);

    function onMapClick(e: MapLayerMouseEvent){
        console.log(e.lngLat.lat);
        console.log(e.lngLat.lng)
    }



    //returning the map component 
    return(
        <Map 
        
        mapboxAccessToken={APIKey}
        longitude={viewState.longitude}
        latitude={viewState.latitude}
        zoom={viewState.zoom}

        onMove={(ev: ViewStateChangeEvent) => setViewState(ev.viewState)}

        style={{width: window.innerWidth, height:window.innerHeight}}

        mapStyle={"mapbox://styles/mapbox/outdoors-v12"}

        onClick={(ev:MapLayerMouseEvent) => onMapClick(ev)}
        
        >
            {/* <Source id="geo_data" type="geojson" data={overlayData()}>            
                <Layer {...geoLayer}></Layer>
            </Source    > */}

            {/* <Source id="income_highlight" type="geojson" data={pointData}></Source> */}
        </Map>
    )
}
