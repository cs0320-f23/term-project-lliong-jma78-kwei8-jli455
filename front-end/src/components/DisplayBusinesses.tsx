import React, { useState } from "react";
import { business_dataset } from "../mocks/business/mock_businesses";
import Switch from 'react-switch';

export default function DisplayBusiness(){
    const[showMocked, setShowMocked] = useState<boolean>(false);

    const [filters, setFilters] = useState(Array(8).fill(false));
    
    let filteredMock = [...business_dataset]

    const toggleFilter = (index) => {
        const filtersCopy = [...filters]
        filtersCopy[index] = !filtersCopy[index]
        setFilters(filtersCopy)
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
            <button onClick={() => toggleFilter(0)}>Restaurants/Eateries</button>
            <p></p>
            <button onClick={() => toggleFilter(1)}>Groceries</button>
            <p></p>
            <button onClick={() => toggleFilter(2)}>Services</button>
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