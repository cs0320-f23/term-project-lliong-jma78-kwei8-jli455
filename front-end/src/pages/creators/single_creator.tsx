import React from "react";
//import { typeOfCreator } from "./creator_contents";
import "../../styles/styles.css";

import { FaFacebookSquare, FaInstagramSquare, FaSpotify } from "react-icons/fa";
import { IoLink } from "react-icons/io5";

export interface CreatorProps {
  name: string;
  type: string;
  description: string;
  website: string | undefined;
  instagram: string | undefined;
  facebook: string | undefined;
  spotify: string | undefined;
  price: string | undefined;
  id: string;
}

// learn more button for description popup?

// add logos for social media
// do we want to add contact info as one field? like email?

// potentially change css
export function Creator(props: CreatorProps) {
  return (
    <div className="creator-single">
      <br></br>
      <h1>{props.name}</h1>
      <br></br>
      <h2>{props.description}</h2>

      <h2>{props.price}</h2>
      <div>
        <h2 className="icons">
          {props.website && <IoLink />}
          {props.instagram && <FaInstagramSquare />}
          {props.facebook && <FaFacebookSquare />}
          {props.spotify && <FaSpotify />}
        </h2>
      </div>
      <div className="creator-type">{props.type}</div>
      <div className="creator-id">#{props.id}</div>

      <div></div>
    </div>
  );
}
