import { FeatureCollection } from "geojson"
import { CircleLayer, FillLayer, LineLayer } from "react-map-gl"

export function getJSON(term: string): GeoJSON.FeatureCollection | undefined{
    let url = ""

    if(term == 'restaurants'){
        url = "http://localhost:323/business?searchTerm=restaurants"
    }
    else if(term == 'groceries'){
        url = "http://localhost:323/business?searchTerm=groceries"
    }
    else if(term == 'services'){
        url = "http://localhost:323/business?searchTerm=services"
    }
    else{
        url = "http://localhost:323/business?searchTerm=?"
    }

    const data: GeoJSON.FeatureCollection = {
        type: 'FeatureCollection',
        features: []
    }

    new Promise((resolve, reject) => {
        fetch(url)
        .then(response => response.json())
        .then(json => {
            if(data.features.length < 1){
                Object.keys(json).forEach((key) => {
                    let businessName = key
                    let businessDict = json[key]["businesses"][0]
                    let url = businessDict['url']
                    let busAdd1 = businessDict['location']['address1']
                    let busAdd2 = businessDict['location']['address2']
                    let busCity = businessDict['location']['city']
                    let busState = businessDict['location']['state']
                    let busLat = parseFloat(businessDict['coordinates']['latitude'])
                    let busLong = parseFloat(businessDict['coordinates']['longitude'])
                    let busPhone = businessDict['phone']
            
                    const newFeat: GeoJSON.Feature = {
                        "type": 'Feature',
                        "properties": {
                            name: businessName,
                            site: url,
                            phone: busPhone,
                            address1: busAdd1,
                            address2: busAdd2,
                            city: busCity,
                            state: busState                         
                        },
                        "geometry":{
                            "coordinates": [busLong, busLat],
                            "type": "Point"
                        }
                    }            
                    data.features.push(newFeat)
                })
            }
            // if(term != ""){
            //     data.features = []
            //     Object.keys(json).forEach((key) => {
            //         let businessDict = json[key][0]
            //         let url = businessDict['url']

            //         let busAdd1 = businessDict['location']['address1']
            //         let busAdd2 = businessDict['location']['address2']
            //         let busCity = businessDict['location']['city']
            //         let busState = businessDict['location']['state']
            //         let busLat = parseFloat(businessDict['coordinates']['latitude'])
            //         let busLong = parseFloat(businessDict['coordinates']['longitude'])
            //         let busPhone = businessDict['phone']
            // })}
        }).then(finish => resolve(finish))
    })
    return data
}

export const pointFill: CircleLayer = {
    id: "businesses", 
    type: "circle", 
    paint:{
        'circle-radius': 10, 
        'circle-color': '#0000FF', 
        'circle-opacity': 0.5
    }
}