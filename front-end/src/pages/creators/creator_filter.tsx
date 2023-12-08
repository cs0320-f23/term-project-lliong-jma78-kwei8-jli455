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

// maybe add somewhere the different types of visual arts, performing arts, etc.
// because i don't there are enough icons to display the wide range
// open url in new tab? is this automatic?

// do on clicks for buttons
export function CreatorFilterButtons() {
  // wait do we want to be able to filter for multiple ? or just one at a time?
  return (
    <div className="creator-filters">
      <button className="creator-filter-button">
        Visual Arts <br></br>
        <div className="icons">
          <BsPalette />
          <BsCamera />
        </div>
      </button>
      <button className="creator-filter-button">
        Performing Arts
        <br></br>
        <div className="icons">
          <BsMusicNoteBeamed />
          <BsPersonArmsUp />
        </div>
      </button>
      <button className="creator-filter-button">
        Literary Arts <br></br>
        <div className="icons">
          <TfiPencil />
          <BsBook />
        </div>
      </button>
      <button className="creator-filter-button">
        Artisans
        <br></br>
        <div className="icons">
          <TfiRulerAlt />
          <HiMiniWrenchScrewdriver />
        </div>
      </button>
      <button className="creator-filter-button">
        Other <br></br>
        <div className="icons">
          <HiStar />
        </div>
      </button>
    </div>
  );
}
