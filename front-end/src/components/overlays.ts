import { FeatureCollection } from "geojson"
import { CircleLayer, FillLayer, LineLayer } from "react-map-gl"

function isFeatureCollection(json:any): json is FeatureCollection{
    return json.type === "FeatureCollection";
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
        .then(json => console.log(json))
            // if(data.features.length < 1){
            //     for(let i = 0; i < json.length; i++){
                    
            //         let businessName = json[i]
            //         let businessDict = json[i][0]
            //         let url = businessDict[3]
            //         let businessLat = parseFloat(businessDict[7][0])
            //         let businessLong = parseFloat(businessDict[7][1])
            //         let businessAddress1 = businessDict[10][0]
            //         let businessAddress2 = businessDict[10][1]
            //         let businessCity = businessDict[10][2]
            //         let businessState = businessDict[10][4]
            //         let businessPhone = businessDict[11]

            //         const newFeat: GeoJSON.Feature = {
            //             "type": 'Feature',
            //             "properties": {
            //                 name: businessName,
            //                 site: url,
            //                 address1: businessAddress1,
            //                 address2: businessAddress2,
            //                 city: businessCity,
            //                 state: businessState,
            //                 phone: businessPhone
            //             },
            //             "geometry":{
            //                 "coordinates": [businessLat, businessLong],
            //                 "type": "Point"

            //             }
            //         }
            //         data.features.push(newFeat)
            //     }

            // }
        // }).then(final_json => isFeatureCollection(data) ? resolve(data) : resolve(undefined))
        })    
}

export function overlayData(): Promise<GeoJSON.FeatureCollection | undefined>{
    const business_data = getJSON()
    console.log(business_data)
    return business_data; 
}
