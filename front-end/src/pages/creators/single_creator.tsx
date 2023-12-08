import React from "react";
import { typeOfCreator } from "./creator_contents";
import "../../styles/styles.css";

export interface CreatorProps {
  name: string;
  type: typeOfCreator;
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

// potentially change css
export function Creator(props: CreatorProps) {
  return (
    <div className="creator-single">
      <br></br>
      <h1>{props.name}</h1>
      <br></br>
      <h2>{props.description}</h2>
      <h2>{props.website}</h2>
      <h2>{props.instagram}</h2>
      <h2>{props.facebook}</h2>
      <h2>{props.spotify}</h2>
      <h2>{props.price}</h2>
      <div className="creator-id">#{props.id}</div>

      <div></div>
    </div>
  );
}
