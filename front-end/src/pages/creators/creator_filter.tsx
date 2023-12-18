import React from "react";
import {
  BsBook,
  BsCamera,
  BsMusicNoteBeamed,
  BsPalette,
  BsPersonArmsUp,
} from "react-icons/bs";
import { TfiPencil, TfiRulerAlt } from "react-icons/tfi";
import { HiMiniWrenchScrewdriver, HiStar } from "react-icons/hi2";
import { CreatorProps } from "./single_creator";
import { allCreators } from "./creator_contents";

// maybe add somewhere the different types of visual arts, performing arts, etc.
// because i don't there are enough icons to display the wide range
// open url in new tab? is this automatic?

// perhaps a "see all" button

interface FilterProps {
  creators: CreatorProps[];
  setCreators: React.Dispatch<React.SetStateAction<CreatorProps[]>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

interface jsonCreatorResponse {
  result: string;
  // is this the right type?
  data: Array<Map<string, string>>;
}

function isCreatorResponse(rjson: any): rjson is jsonCreatorResponse {
  if (!("result" in rjson)) return false;
  if (!("data" in rjson)) return false;
  if (!(rjson["result"] === "success")) {
    return false;
  }
  return true;
}

// FIX! why are there so many showing up
// do on clicks for buttons
export function CreatorFilterButtons(props: FilterProps) {
  // wait do we want to be able to filter for multiple ? or just one at a time?

  // would i have to end up calling this every time that the button is clicked?

  function filterMockVisualArts() {
    console.log("visual arts creators");
    console.log(allCreators);
    const visualArtCreators: CreatorProps[] = [];
    for (let i = 0; i < allCreators.length; i++) {
      if (allCreators[i].type == "visual arts") {
        visualArtCreators.push(allCreators[i]);
      }
    }
    props.setCreators(visualArtCreators);
  }

  function filterVisualArts() {
    console.log("visual arts creators");

    const url =
      "http://localhost:323/creators?action=filtertype&&type=visual arts";
    return fetch(url)
      .then((response: Response) => response.json())
      .then((json) => {
        if (!isCreatorResponse(json)) {
          console.log("not a json visual arts");
        } else {
          const visualArtCreators: CreatorProps[] = [];
          const data = json.data;

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

            visualArtCreators.push(creator);
          }
          if (visualArtCreators.length == 0) {
            props.setMessage("no visual arts creators at this time");
          } else {
            props.setMessage("");
          }
          props.setCreators(visualArtCreators);
        }
      });
  }

  function filterPerformingArtsMock() {
    const performingArtCreators: CreatorProps[] = [];
    for (let i = 0; i < allCreators.length; i++) {
      if (allCreators[i].type == "performing arts") {
        performingArtCreators.push(allCreators[i]);
      }
    }
    props.setCreators(performingArtCreators);
  }

  function filterPerformingArts() {
    const url =
      "http://localhost:323/creators?action=filtertype&&type=performing arts";
    return fetch(url)
      .then((response: Response) => response.json())
      .then((json) => {
        if (!isCreatorResponse(json)) {
          console.log("not a json performing arts");
        } else {
          const performingArtCreators: CreatorProps[] = [];
          const data = json.data;

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

            performingArtCreators.push(creator);
          }
          if (performingArtCreators.length == 0) {
            props.setMessage("no performing arts creators at this time");
          } else {
            props.setMessage("");
          }
          props.setCreators(performingArtCreators);
        }
      });
  }

  function filterLiteraryArtsMock() {
    const literaryArtCreators: CreatorProps[] = [];
    for (let i = 0; i < allCreators.length; i++) {
      if (allCreators[i].type == "literary arts") {
        literaryArtCreators.push(allCreators[i]);
      }
    }
    props.setCreators(literaryArtCreators);
  }

  function filterLiteraryArts() {
    const url =
      "http://localhost:323/creators?action=filtertype&&type=literary arts";
    return fetch(url)
      .then((response: Response) => response.json())
      .then((json) => {
        if (!isCreatorResponse(json)) {
          console.log("not a json literary arts");
        } else {
          const literaryArtCreators: CreatorProps[] = [];
          const data = json.data;

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

            literaryArtCreators.push(creator);
          }
          if (literaryArtCreators.length == 0) {
            props.setMessage("no literary arts creators at this time");
          } else {
            props.setMessage("");
          }
          props.setCreators(literaryArtCreators);
        }
      });
  }

  function filterArtisansMock() {
    const artisanCreators: CreatorProps[] = [];
    for (let i = 0; i < allCreators.length; i++) {
      if (allCreators[i].type == "artisans") {
        artisanCreators.push(allCreators[i]);
      }
    }
    props.setCreators(artisanCreators);
  }

  function filterArtisans() {
    const url =
      "http://localhost:323/creators?action=filtertype&&type=artisans";
    return fetch(url)
      .then((response: Response) => response.json())
      .then((json) => {
        if (!isCreatorResponse(json)) {
          console.log("not a json artisans");
        } else {
          const artisanCreators: CreatorProps[] = [];
          const data = json.data;

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

            artisanCreators.push(creator);
          }
          if (artisanCreators.length == 0) {
            props.setMessage("no artisans at this time");
          } else {
            props.setMessage("");
          }
          props.setCreators(artisanCreators);
        }
      });
  }

  function filterOthersMock() {
    const otherCreators: CreatorProps[] = [];
    for (let i = 0; i < allCreators.length; i++) {
      if (allCreators[i].type == "other") {
        otherCreators.push(allCreators[i]);
      }
    }
    props.setCreators(otherCreators);
  }

  function filterOthers() {
    const url = "http://localhost:323/creators?action=filtertype&&type=other";
    return fetch(url)
      .then((response: Response) => response.json())
      .then((json) => {
        if (!isCreatorResponse(json)) {
          console.log("not a json others");
        } else {
          const otherCreators: CreatorProps[] = [];
          const data = json.data;

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

            otherCreators.push(creator);
          }
          if (otherCreators.length == 0) {
            props.setMessage("no other creators at this time");
          } else {
            props.setMessage("");
          }
          props.setCreators(otherCreators);
        }
      });
  }

  function seeAllCreators() {
    props.setCreators(allCreators);
    props.setMessage("");
  }

  // do i need a .then because it seems to be working fine without...
  return (
    <div className="creator-filters">
      <button
        className="creator-filter-button"
        onClick={() => filterVisualArts().then()}
      >
        Visual Arts <br></br>
        <div className="icons">
          <BsPalette />
          <BsCamera />
        </div>
      </button>
      <button
        className="creator-filter-button"
        onClick={() => filterPerformingArts().then()}
      >
        Performing Arts
        <br></br>
        <div className="icons">
          <BsMusicNoteBeamed />
          <BsPersonArmsUp />
        </div>
      </button>
      <button
        className="creator-filter-button"
        onClick={() => filterLiteraryArts().then()}
      >
        Literary Arts <br></br>
        <div className="icons">
          <TfiPencil />
          <BsBook />
        </div>
      </button>
      <button
        className="creator-filter-button"
        onClick={() => filterArtisans().then()}
      >
        Artisans
        <br></br>
        <div className="icons">
          <TfiRulerAlt />
          <HiMiniWrenchScrewdriver />
        </div>
      </button>
      <button
        className="creator-filter-button"
        onClick={() => filterOthers().then()}
      >
        Other <br></br>
        <div className="icons">
          <HiStar />
        </div>
      </button>
      <button
        className="creator-filter-button"
        onClick={() => seeAllCreators()}
      >
        See All! <br></br>
      </button>
    </div>
  );
}
