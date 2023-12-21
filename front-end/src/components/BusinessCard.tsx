import React from "react"
import foodIcon from '../images/food_icon.png'
import groceryIcon from '../images/grocery_icon.png'
import service from '../images/service_icon.png'

export default function BusinessCard(props){
    // let icon = ""

    // if(props.business == 'restaurants'){
    //     icon = foodIcon
    // }
    // else if(props.business == 'groceries'){
    //     icon = groceryIcon
    // }
    // else{
    //     icon = service
    // }

    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
    };

    return(
        <div style={{borderRadius: "30px", width: "18vw",
            height: "25vh",
            border: "2px solid #8b1a10",
            backgroundColor: "none",
            position: "relative"}}>
            <div style={{paddingLeft:"10px"}}>
                {/* <img src={icon} style={{width:'3vw', height:'5vh', paddingInline:"10px", paddingTop:"8px"}}></img> */}
                <h3>{props.name}</h3>
                <h5>{props.address1}, {props.address2} 
                {props.city}, {props.state}</h5>
                <h5>{props.phone}</h5>
                <button onClick={() => openInNewTab(props.url)} style={{height:"5vh"}}>Learn More</button>
            </div>
        </div>
    )
}