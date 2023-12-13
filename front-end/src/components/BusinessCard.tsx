import React from "react"
import { Link } from "react-router-dom"

export default function DisplayBusiness(props){
    return(
        <div className="singular-container">
            <Link to={props.url}><h3>{props.name}</h3>
            </Link>
            <button style={{borderRadius:"8px", borderColor:"red"}}>{props.business}</button>
            <p>{props.location}</p>
            <p>{props.phone}</p>
        </div>
    )
}