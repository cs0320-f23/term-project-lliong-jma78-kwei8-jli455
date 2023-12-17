import React, { useEffect, useRef } from "react";
import { Creator, CreatorProps } from "./single_creator";
import { small_creators_dataset } from "../../mocks/mock_creators";

// how to stop components shifting around when screen width changes? though I guess this
// is a problem for both spotify and creators


// interface for this file
interface CreatorPageProps {
  creators: CreatorProps[];
  setCreators: React.Dispatch<React.SetStateAction<CreatorProps[]>>;
}

// interface with fields expected from creator json response
interface jsonCreatorResponse {
  result: string;
  // is this the right type? do i need to change to a dict
  data: Array<Map<string, object>>;
}

// check valid and invalid?
// is this right/complete?
// type predicate to check if successful creator repsonse
function isCreatorResponse(rjson: any): rjson is jsonCreatorResponse {
  if (!("result" in rjson)) return false;
  if (!("data" in rjson)) return false;
  if (!(rjson["result"] === "success")) {
    return false;
  }
  return true;
}

// need to check if this updates after pages are connected

// array for storing all current creators
export const allCreators: CreatorProps[] = [];

/**
 * function that fetches the existing set of creators from backend and adds each to the
 * allCreators array
 * @param props 
 * @returns 
 */
function getCreators(props: CreatorPageProps) {
  const url = "http://localhost:323/creators";

  return fetch(url)
    .then((response: Response) => response.json())
    .then((json) => {
      if (!isCreatorResponse(json)) {
        // how/what to tell user?
        console.log("not a valid response");
      } else {
        const data = json.data;
        console.log(data.length);

        for (let i = 0; i < data.length; i++) {
          const creatorMap = data[i];
          const creatorName = creatorMap["name"];
          const creatorType = creatorMap["type"];
          const creatorDescription = creatorMap["description"];
          const creatorWebsite = creatorMap["website"];
          const creatorInstagram = creatorMap["instagram"];
          const creatorFacebook = creatorMap["facebook"];
          const creatorSpotify = creatorMap["spotify"];
          const creatorPrice = creatorMap["price"];
          const creatorID = creatorMap["id"];

          const creator: CreatorProps = {
            name: creatorName,
            type: creatorType,
            description: creatorDescription,
            website: creatorWebsite,
            instagram: creatorInstagram,
            facebook: creatorFacebook,
            spotify: creatorSpotify,
            price: creatorPrice,
            id: creatorID,
          };

          allCreators.push(creator);
        }
        console.log("all creators");
        console.log(allCreators);
        return allCreators;
      }
    })
    .catch((error) => console.log("error"));
}

// function for mock creators
function getMockCreators(props: CreatorPageProps) {
  for (let i = 0; i < small_creators_dataset.length; i++) {
    const creatorName: string = small_creators_dataset[i].get("name");

    // not sure if this enum will work...
    const creatorType: string = small_creators_dataset[i].get("type");
    const creatorDescription: string =
      small_creators_dataset[i].get("description");
    const creatorWebsite: string | undefined =
      small_creators_dataset[i].get("website");
    const creatorInstagram: string | undefined =
      small_creators_dataset[i].get("instagram");
    const creatorFacebook: string | undefined =
      small_creators_dataset[i].get("facebook");
    const creatorSpotify: string | undefined =
      small_creators_dataset[i].get("spotify");
    const creatorPrice: string | undefined =
      small_creators_dataset[i].get("price");
    const creatorID: string = small_creators_dataset[i].get("id");

    const creator: CreatorProps = {
      name: creatorName,
      type: creatorType,
      description: creatorDescription,
      website: creatorWebsite,
      instagram: creatorInstagram,
      facebook: creatorFacebook,
      spotify: creatorSpotify,
      price: creatorPrice,
      id: creatorID,
    };

    allCreators.push(creator);
  }
  return allCreators;
}

// perhaps add mock images

/**
 * component that displays all of the creators on the page
 * @param props 
 * @returns 
 */
export function Creators(props: CreatorPageProps) {
  const mockCreatorsRef = useRef(false);

  // useEffect(() => {
  //   if (mockCreatorsRef.current) return;
  //   mockCreatorsRef.current = true;
  //   props.setCreators(getMockCreators(props)), [];
  // });

  // do i need a [] or something for it to change depending on
  useEffect(() => {
    if (mockCreatorsRef.current) return;
    mockCreatorsRef.current = true;
    getCreators(props).then((response) => {
      console.log("setting");
      if (response != undefined) {
        props.setCreators(response);
      }
    }),
      [];
  });

  return (
    <div className="creator-grid">
      {props.creators?.map((creator, index) => (
        <Creator
          name={creator.name}
          type={creator.type}
          description={creator.description}
          website={creator.website}
          instagram={creator.instagram}
          facebook={creator.facebook}
          spotify={creator.spotify}
          price={creator.price}
          id={creator.id}
        />
      ))}
    </div>
  );
}
