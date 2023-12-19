import React from "react";
import "../../styles/styles.css";
import { FaFacebookSquare, FaInstagramSquare, FaSpotify } from "react-icons/fa";
import { IoLink } from "react-icons/io5";

/**
 * interface with all of the fields that a creator can have
 * name, type, description, and id are required while other fields are optional
 */
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

/**
 * component to represent a single creator
 * will display name
 * @param props
 * @returns
 */
export function Creator(props: CreatorProps) {
  // or should it be checking if it's an empty string?
  /**
   * function that adds the text "Price Range: " if creator has a price
   * @returns
   */
  function getPrice() {
    if (props.price != undefined) {
      return "Price Range: " + props.price;
    } else {
      return undefined;
    }
  }

  // could unit test these potentially?
  function getWebsite() {
    if (props.website != undefined) {
      return (
        <a href={props.website} target="_blank" rel="noreferrer">
          <IoLink color="#8b1a10" />
        </a>
      );
    }
  }

  // do we want to change this to just a link?
  function getInstagram() {
    if (props.instagram != undefined) {
      const link = "https://www.instagram.com/" + props.instagram.substring(1);
      return (
        <a href={link} target="_blank" rel="noreferrer">
          <FaInstagramSquare color="#8b1a10" />
        </a>
      );
    }
  }

  function getFacebook() {
    if (props.facebook != undefined) {
      return (
        <a href={props.facebook} target="_blank" rel="noreferrer">
          <FaFacebookSquare color="#8b1a10" />
        </a>
      );
    }
  }

  function getSpotify() {
    if (props.spotify != undefined) {
      return (
        <a href={props.spotify} target="_blank" rel="noreferrer">
          <FaSpotify color="#8b1a10" />
        </a>
      );
    }
  }

  return (
    <div className="creator-single" data-testid="test:single-creator">
      <br></br>
      <h1>{props.name}</h1>
      <br></br>
      <h2>{props.description}</h2>

      <h2>{getPrice()}</h2>
      <div>
        <h2 className="website-icons">
          {getWebsite()}
          {getInstagram()}
          {getFacebook()}
          {getSpotify()}
        </h2>
      </div>
      <div className="creator-type">{props.type}</div>
      <div className="creator-id">#{props.id}</div>

      <div></div>
    </div>
  );
}
