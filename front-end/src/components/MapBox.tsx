import React, { useState } from "react";
import Map, {Layer, MapLayerMouseEvent, Source, ViewStateChangeEvent} from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css"
import { APIKey } from "../../private/key";

export default function MapBox(){
  const pvdLatitude = 41.82780
  const pvdLongitude = -71.40125
  const initialZoom = 10

  const[viewState, setViewState] = useState({
    longitude: pvdLongitude,
    latitude: pvdLatitude,
    zoom: initialZoom
  })

  return(
    <Map
      mapboxAccessToken={APIKey}
      longitude={viewState.longitude}
      latitude={viewState.latitude}
      zoom={viewState.zoom}

      onMove={(ev: ViewStateChangeEvent) => setViewState(ev.viewState)}
      style={{width: window.innerWidth, height: window.innerHeight}}
      mapStyle={"mapbox://styles/mapbox/outdoors-v12"}
    
    >

    </Map>
  )

}

