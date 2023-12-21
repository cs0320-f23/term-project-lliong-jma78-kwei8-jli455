import React, { useEffect, useRef } from "react";
import { Creator, CreatorProps } from "./single_creator";
import { small_creators_dataset } from "../../mocks/mock_creators";

// interface for this file
interface CreatorPageProps {
  creators: CreatorProps[];
  setCreators: React.Dispatch<React.SetStateAction<CreatorProps[]>>;
}

// interface with fields expected from creator json response
interface jsonCreatorResponse {
  result: string;
  data: Array<Map<string, object>>;
}

// type predicate to check if successful creator repsonse
function isCreatorResponse(rjson: any): rjson is jsonCreatorResponse {
  if (!("result" in rjson)) return false;
  if (!("data" in rjson)) return false;
  if (!(rjson["result"] === "success")) {
    return false;
  }
  return true;
}

// array for storing all current creators
export let allCreators: CreatorProps[] = [];

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
        const currentCreators: CreatorProps[] = [];
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

          currentCreators.push(creator);
        }
        console.log("all creators");
        console.log(currentCreators);
        allCreators = currentCreators;
        return currentCreators;
      }
    })
    .catch((error) => console.log("error"));
}

/**
 * component that displays all of the creators on the page
 * @param props
 * @returns
 */
export function Creators(props: CreatorPageProps) {
  const creatorsRef = useRef(false);

  useEffect(() => {
    console.log("creator contents use effect");
    if (creatorsRef.current) return;
    creatorsRef.current = true;
    getCreators(props).then((response) => {
      if (response != undefined) {
        props.setCreators(response);
      }
    }),
      [];
  });

  return (
    <div className="creator-grid" aria-label="list of creators">
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
