import React, { useState } from "react";
import { business_dataset } from "../mocks/business/mock_businesses";
import Switch from 'react-switch';

export default function DisplayBusiness(){
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

    return(
        <div className="businesses-container" style={{paddingLeft:"10px"}}>
            <h2>Filter By</h2>
            <Switch onChange={toggleMocked} checked={showMocked}></Switch>
            <p></p>
            <button onClick={() => toggleFilter(0)}>Restaurants/Eateries</button>
            {/* <button onClick={() => filterRestaurants}>Restaurants/Eateries</button> */}
            <p></p>
            <button onClick={() => toggleFilter(1)}>Groceries</button>
            <p></p>
            <button onClick={() => toggleFilter(2)}>Services</button>
            <hr style={{borderTop:"1px solid red"}}></hr>
            {/* <button onClick={toggleMocked}>Show Mocked</button> */}
            {showMocked ? <div>
                {filteredMock.map((item, index) => (
                    <h4>{item.name}</h4>
                ))}
            </div> : <div></div>}
        </div>
    )
    
}