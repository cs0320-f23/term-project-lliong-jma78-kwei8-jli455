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
}

// do on clicks for buttons
export function CreatorFilterButtons(props: FilterProps) {
  // wait do we want to be able to filter for multiple ? or just one at a time?

  // would i have to end up calling this every time that the button is clicked?
  function filterVisualArts() {
    const visualArtCreators: CreatorProps[] = [];
    for (let i = 0; i < allCreators.length; i++) {
      if (allCreators[i].type == "Visual Arts") {
        visualArtCreators.push(allCreators[i]);
      }
    }
    props.setCreators(visualArtCreators);
  }

  function filterPerformingArts() {
    const performingArtCreators: CreatorProps[] = [];
    for (let i = 0; i < allCreators.length; i++) {
      if (allCreators[i].type == "Performing Arts") {
        performingArtCreators.push(allCreators[i]);
      }
    }
    props.setCreators(performingArtCreators);
  }

  function filterLiteraryArts() {
    const literaryArtCreators: CreatorProps[] = [];
    for (let i = 0; i < allCreators.length; i++) {
      if (allCreators[i].type == "Literary Arts") {
        literaryArtCreators.push(allCreators[i]);
      }
    }
    props.setCreators(literaryArtCreators);
  }

  function filterArtisans() {
    const artisanCreators: CreatorProps[] = [];
    for (let i = 0; i < allCreators.length; i++) {
      if (allCreators[i].type == "Artisans") {
        artisanCreators.push(allCreators[i]);
      }
    }
    props.setCreators(artisanCreators);
  }

  function filterOthers() {
    const otherCreators: CreatorProps[] = [];
    for (let i = 0; i < allCreators.length; i++) {
      if (allCreators[i].type == "Other") {
        otherCreators.push(allCreators[i]);
      }
    }
    props.setCreators(otherCreators);
  }

  return (
    <div className="creator-filters">
      <button
        className="creator-filter-button"
        onClick={() => filterVisualArts()}
      >
        Visual Arts <br></br>
        <div className="icons">
          <BsPalette />
          <BsCamera />
        </div>
      </button>
      <button
        className="creator-filter-button"
        onClick={() => filterPerformingArts()}
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
        onClick={() => filterLiteraryArts()}
      >
        Literary Arts <br></br>
        <div className="icons">
          <TfiPencil />
          <BsBook />
        </div>
      </button>
      <button
        className="creator-filter-button"
        onClick={() => filterArtisans()}
      >
        Artisans
        <br></br>
        <div className="icons">
          <TfiRulerAlt />
          <HiMiniWrenchScrewdriver />
        </div>
      </button>
      <button className="creator-filter-button" onClick={() => filterOthers()}>
        Other <br></br>
        <div className="icons">
          <HiStar />
        </div>
      </button>
      <button
        className="creator-filter-button"
        onClick={() => props.setCreators(allCreators)}
      >
        See All! <br></br>
      </button>
    </div>
  );
}
