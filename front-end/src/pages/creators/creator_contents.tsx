// searching both name and description
// filter by price range
// buttons for different kinds of creators
import React, { useEffect, useRef } from "react";
import { Creator, CreatorProps } from "./single_creator";
import { small_creators_dataset } from "../../mocks/mock_creators";

// how to stop components shifting around when screen width changes? though I guess this
// is a problem for both spotify and creators

// drop down box for selecting types

// visual art, performing art, literary art, artisans, other

// should i be using an enum??
// export enum typeOfCreator {
//   visual_art = "visual art",
//   performing_art = "performing art",
//   literary_art = "literary art",
//   artisans = "artisans",
//   other = "other",
// }

interface CreatorPageProps {
  creators: CreatorProps[];
  setCreators: React.Dispatch<React.SetStateAction<CreatorProps[]>>;
}

export const allCreators: CreatorProps[] = [];

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
export function Creators(props: CreatorPageProps) {
  const mockCreatorsRef = useRef(false);

  useEffect(() => {
    if (mockCreatorsRef.current) return;
    mockCreatorsRef.current = true;
    props.setCreators(getMockCreators(props)), [];
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
