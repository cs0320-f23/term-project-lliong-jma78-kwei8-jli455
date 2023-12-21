import { CreatorProps } from "../pages/creators/single_creator";
import { small_creators_dataset } from "./mock_creators";

interface FilterProps {
  allCreators: CreatorProps[];
  setCreators: React.Dispatch<React.SetStateAction<CreatorProps[]>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

interface CreatorPageProps {
  allCreators: CreatorProps[];
  setCreators: React.Dispatch<React.SetStateAction<CreatorProps[]>>;
}

function getMockCreators(props: CreatorPageProps) {
  for (let i = 0; i < small_creators_dataset.length; i++) {
    const creatorName: string = small_creators_dataset[i].get("name");
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

    props.allCreators.push(creator);
  }
  return props.allCreators;
}

function filterMockVisualArts(props: FilterProps) {
  console.log("visual arts creators");
  console.log(props.allCreators);
  const visualArtCreators: CreatorProps[] = [];
  for (let i = 0; i < props.allCreators.length; i++) {
    if (props.allCreators[i].type == "visual arts") {
      visualArtCreators.push(props.allCreators[i]);
    }
  }
  props.setCreators(visualArtCreators);
}

function filterPerformingArtsMock(props: FilterProps) {
  const performingArtCreators: CreatorProps[] = [];
  for (let i = 0; i < props.allCreators.length; i++) {
    if (props.allCreators[i].type == "performing arts") {
      performingArtCreators.push(props.allCreators[i]);
    }
  }
  props.setCreators(performingArtCreators);
}

function filterLiteraryArtsMock(props: FilterProps) {
  const literaryArtCreators: CreatorProps[] = [];
  for (let i = 0; i < props.allCreators.length; i++) {
    if (props.allCreators[i].type == "literary arts") {
      literaryArtCreators.push(props.allCreators[i]);
    }
  }
  props.setCreators(literaryArtCreators);
}

function filterArtisansMock(props: FilterProps) {
  const artisanCreators: CreatorProps[] = [];
  for (let i = 0; i < props.allCreators.length; i++) {
    if (props.allCreators[i].type == "artisans") {
      artisanCreators.push(props.allCreators[i]);
    }
  }
  props.setCreators(artisanCreators);
}

function filterOthersMock(props: FilterProps) {
  const otherCreators: CreatorProps[] = [];
  for (let i = 0; i < props.allCreators.length; i++) {
    if (props.allCreators[i].type == "other") {
      otherCreators.push(props.allCreators[i]);
    }
  }
  props.setCreators(otherCreators);
}
