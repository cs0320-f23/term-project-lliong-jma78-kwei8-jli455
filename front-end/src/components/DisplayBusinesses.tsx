import React, { useState } from "react";
import { business_dataset } from "../mocks/business/mock_businesses";
import Switch from 'react-switch';

export default function DisplayBusiness(){
    const[showMocked, setShowMocked] = useState<boolean>(false);
    
    let filteredMock = [...business_dataset]

    const [filters, setFilters] = useState(Array(3).fill(false)); 

    // function filterRestaurants(){
    //     filteredMock = [...business_dataset]
    //     if(showMocked){
    //         console.log("yah")
    //         filteredMock = filteredMock.filter((item) => item['business'] === 'restaurants')
    //     }
    //     console.log(filteredMock)
    // }

    // function filterGroceries(){
    //     filteredMock = [...business_dataset]
    //     if(showMocked){
    //         console.log("woo")
    //         filteredMock = filteredMock.filter((item) => item['business'] === 'groceries')
    //     }
    // }

    // function filterServices(){
    //     filteredMock = [...business_dataset]
    //     if(showMocked){
    //         console.log("may")
    //         filteredMock = filteredMock.filter((item) => item['business'] === 'services')
    //     }
    //     console.log(filteredMock)
    // }

    const toggleFilter = (index) => {
        const filtersCopy = [...filters]  // copy the state array
        filtersCopy[index] = !filtersCopy[index] // toggle it
        setFilters(filtersCopy)
        console.log(filters)
      }

    if(filters[0] && !filters[1] && !filters[2]){
        filteredMock = filteredMock.filter((item) => item['business'] == 'restaurants')
    }
    else if(filters[1] && !filters[0] && !filters[2]){
        filteredMock = filteredMock.filter((item) => item['business'] == 'groceries')
    }
    else if(filters[2] && !filters[0] && !filters[1]){
        console.log("hit")
        filteredMock = filteredMock.filter((item) => item['business'] == 'services')
    }
    else{
        filteredMock = [...business_dataset]
    }

    function toggleMocked(){
        setShowMocked(!showMocked);
    }

    return(
        <div className="businesses-container" style={{paddingLeft:"10px"}}>
            <h2>Filter By</h2>
            <button onClick={() => toggleFilter(0)}>Restaurants/Eateries</button>
            <p></p>
            <button onClick={() => toggleFilter(1)}>Groceries</button>
            <p></p>
            <button onClick={() => toggleFilter(2)}>Services</button>
            {/* <button onClick={filterRestaurants}>Restaurants/Eateries</button>
            <p></p>
            <button onClick={filterGroceries}>Groceries</button>
            <p></p>
            <button onClick={filterServices}>Services</button> */}
            <hr style={{borderTop:"1px solid red"}}></hr>
            {/* <button onClick={toggleMocked}>Show Mocked</button> */}
            <Switch onChange={toggleMocked} checked={showMocked}></Switch>
            {showMocked ? <div>
                {filteredMock.map((item, index) => (
                    <h4>{item.name}</h4>
                ))}

            </div> : <div></div>}
        </div>
    )
    
}