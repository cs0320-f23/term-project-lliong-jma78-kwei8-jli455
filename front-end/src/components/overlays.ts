import { FeatureCollection } from "geojson"
import { CircleLayer, FillLayer, LineLayer } from "react-map-gl"

function isFeatureCollection(json:any): json is FeatureCollection{
    return json.type == "FeatureCollection";
}

export function getJSON(): Promise<GeoJSON.FeatureCollection | undefined>{
    let url = "http://localhost:323/business"

    const data: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: []
    }

    return new Promise((resolve, reject) => {
        fetch(url)
        .then(response => response.json())
        .then(json => { 
            Object.keys(json).forEach((key) => {
                console.log(key)
            })
        // }).then(done => isFeatureCollection(done) ? resolve(done) : resolve(undefined))
        })
}

// function addFeats(){
//     (Object.keys(json)).forEach((key) => {
//         let businessName = key
//         let businessDict = json[key]["businesses"][0]
//         let url = businessDict['url']
//         let busLat = parseFloat(businessDict['coordinates']['latitude'])
//         let busLong = parseFloat(businessDict['coordinates']['longitude'])
//         let busAdd1 = businessDict['location']['address1']
//         let busAdd2 = businessDict['location']['address2']
//         let busCity = businessDict['location']['city']
//         let busState = businessDict['location']['state']
//         let busPhone = businessDict['phone']

//         const newFeat: GeoJSON.Feature = {
//             "type": 'Feature',
//             "properties": {
//                 name: businessName,
//                 site: url,
//                 address1: busAdd1,
//                 address2: busAdd2,
//                 city: busCity,
//                 state: busState,
//                 phone: busPhone
//             },
//             "geometry":{
//                 "coordinates": [busLat, busLong],
//                 "type": "Point"
//             }
//         }

//         data.features.push(newFeat)
//         })
// }
