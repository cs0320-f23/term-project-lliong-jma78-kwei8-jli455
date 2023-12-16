import React, { useState } from "react";
import {
  BsBook,
  BsCamera,
  BsMusicNoteBeamed,
  BsPalette,
  BsPersonArmsUp,
} from "react-icons/bs";
import { TfiPencil, TfiRulerAlt } from "react-icons/tfi";
import { HiMiniWrenchScrewdriver, HiStar } from "react-icons/hi2";

// should i be using enums.........
// i feel like this isn't very extensible??

interface CreatorTypeProps {
  creatorType: string;
  setCreatorType: React.Dispatch<React.SetStateAction<string>>;
}

export function CreatorTypes(props: CreatorTypeProps) {
  console.log(props.creatorType);
  // is there a better way to do this......
  const [visualArtsStyle, setVisualArtsStyle] = useState<string>(
    "creator-filter-button"
  );
  const [performingArtsStyle, setPerformingArtsStyle] = useState<string>(
    "creator-filter-button"
  );
  const [literaryArtsStyle, setLiteraryArtsStyle] = useState<string>(
    "creator-filter-button"
  );
  const [artisansStyle, setArtisansStyle] = useState<string>(
    "creator-filter-button"
  );
  const [otherStyle, setOtherStyle] = useState<string>("creator-filter-button");

  // maybe these should return a string
  function setVisualArts() {
    props.setCreatorType("visual arts");
    setVisualArtsStyle("creator-filter-button-clicked");
    setPerformingArtsStyle("creator-filter-button");
    setLiteraryArtsStyle("creator-filter-button");
    setArtisansStyle("creator-filter-button");
    setOtherStyle("creator-filter-button");
  }

  function setPerformingArts() {
    props.setCreatorType("performing arts");
    setPerformingArtsStyle("creator-filter-button-clicked");
    setVisualArtsStyle("creator-filter-button");
    setLiteraryArtsStyle("creator-filter-button");
    setArtisansStyle("creator-filter-button");
    setOtherStyle("creator-filter-button");
  }

  function setLiteraryArts() {
    props.setCreatorType("literary arts");
    setLiteraryArtsStyle("creator-filter-button-clicked");
    setPerformingArtsStyle("creator-filter-button");
    setVisualArtsStyle("creator-filter-button");
    setArtisansStyle("creator-filter-button");
    setOtherStyle("creator-filter-button");
  }

  function setArtisans() {
    props.setCreatorType("artisans");
    setArtisansStyle("creator-filter-button-clicked");
    setLiteraryArtsStyle("creator-filter-button");
    setPerformingArtsStyle("creator-filter-button");
    setVisualArtsStyle("creator-filter-button");

    setOtherStyle("creator-filter-button");
  }

  function setOther() {
    props.setCreatorType("other");
    setOtherStyle("creator-filter-button-clicked");

    setArtisansStyle("creator-filter-button");
    setLiteraryArtsStyle("creator-filter-button");
    setPerformingArtsStyle("creator-filter-button");
    setVisualArtsStyle("creator-filter-button");
  }

  return (
    <div className="submit-creator-type">
      <button className={visualArtsStyle} onClick={() => setVisualArts()}>
        Visual Arts <br></br>
        <div className="icons">
          <BsPalette />
          <BsCamera />
        </div>
      </button>
      <button
        className={performingArtsStyle}
        onClick={() => setPerformingArts()}
      >
        Performing Arts
        <br></br>
        <div className="icons">
          <BsMusicNoteBeamed />
          <BsPersonArmsUp />
        </div>
      </button>
      <button className={literaryArtsStyle} onClick={() => setLiteraryArts()}>
        Literary Arts <br></br>
        <div className="icons">
          <TfiPencil />
          <BsBook />
        </div>
      </button>
      <button className={artisansStyle} onClick={() => setArtisans()}>
        Artisans
        <br></br>
        <div className="icons">
          <TfiRulerAlt />
          <HiMiniWrenchScrewdriver />
        </div>
      </button>
      <button className={otherStyle} onClick={() => setOther()}>
        Other <br></br>
        <div className="icons">
          <HiStar />
        </div>
      </button>
    </div>
  );
}
