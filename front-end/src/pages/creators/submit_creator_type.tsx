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

// interface with props for the creator type buttons
interface CreatorTypeProps {
  creatorType: string;
  setCreatorType: React.Dispatch<React.SetStateAction<string>>;
  visualArtsStyle: string;
  setVisualArtsStyle: React.Dispatch<React.SetStateAction<string>>;
  performingArtsStyle: string;
  setPerformingArtsStyle: React.Dispatch<React.SetStateAction<string>>;
  literaryArtsStyle: string;
  setLiteraryArtsStyle: React.Dispatch<React.SetStateAction<string>>;
  artisansStyle: string;
  setArtisansStyle: React.Dispatch<React.SetStateAction<string>>;
  otherStyle: string;
  setOtherStyle: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * component for buttons that can be selected in order to set creator type
 * @param props 
 * @returns 
 */
export function CreatorTypes(props: CreatorTypeProps) {
  // but why is this called every time i do something on the screen, is it rerendering...
  console.log(props.creatorType);

  // is there a better way to do this......

  /**
   * sets creator type to "visual arts" and highlights that button while unhighlighting other buttons
   */
  function setVisualArts() {
    props.setCreatorType("visual arts");
    props.setVisualArtsStyle("creator-filter-button-clicked");
    props.setPerformingArtsStyle("creator-filter-button");
    props.setLiteraryArtsStyle("creator-filter-button");
    props.setArtisansStyle("creator-filter-button");
    props.setOtherStyle("creator-filter-button");
  }

  /**
   * sets creator type to "performing arts" and highlights that button while unhighlighting other buttons
   */
  function setPerformingArts() {
    props.setCreatorType("performing arts");
    props.setPerformingArtsStyle("creator-filter-button-clicked");
    props.setVisualArtsStyle("creator-filter-button");
    props.setLiteraryArtsStyle("creator-filter-button");
    props.setArtisansStyle("creator-filter-button");
    props.setOtherStyle("creator-filter-button");
  }

  /**
   * sets creator type to "literary arts" and highlights that button while unhighlighting other buttons
   */
  function setLiteraryArts() {
    props.setCreatorType("literary arts");
    props.setLiteraryArtsStyle("creator-filter-button-clicked");
    props.setPerformingArtsStyle("creator-filter-button");
    props.setVisualArtsStyle("creator-filter-button");
    props.setArtisansStyle("creator-filter-button");
    props.setOtherStyle("creator-filter-button");
  }

  /**
   * sets creator type to "artisans" and highlights that button while unhighlighting other buttons
   */
  function setArtisans() {
    props.setCreatorType("artisans");
    props.setArtisansStyle("creator-filter-button-clicked");
    props.setLiteraryArtsStyle("creator-filter-button");
    props.setPerformingArtsStyle("creator-filter-button");
    props.setVisualArtsStyle("creator-filter-button");
    props.setOtherStyle("creator-filter-button");
  }

  /**
   * sets creator type to "other" and highlights that button while unhighlighting other buttons
   */
  function setOther() {
    props.setCreatorType("other");
    props.setOtherStyle("creator-filter-button-clicked");
    props.setArtisansStyle("creator-filter-button");
    props.setLiteraryArtsStyle("creator-filter-button");
    props.setPerformingArtsStyle("creator-filter-button");
    props.setVisualArtsStyle("creator-filter-button");
  }

  return (
    <div className="submit-creator-type">
      <button className={props.visualArtsStyle} onClick={() => setVisualArts()}>
        Visual Arts <br></br>
        <div className="icons">
          <BsPalette />
          <BsCamera />
        </div>
      </button>
      <button
        className={props.performingArtsStyle}
        onClick={() => setPerformingArts()}
      >
        Performing Arts
        <br></br>
        <div className="icons">
          <BsMusicNoteBeamed />
          <BsPersonArmsUp />
        </div>
      </button>
      <button
        className={props.literaryArtsStyle}
        onClick={() => setLiteraryArts()}
      >
        Literary Arts <br></br>
        <div className="icons">
          <TfiPencil />
          <BsBook />
        </div>
      </button>
      <button className={props.artisansStyle} onClick={() => setArtisans()}>
        Artisans
        <br></br>
        <div className="icons">
          <TfiRulerAlt />
          <HiMiniWrenchScrewdriver />
        </div>
      </button>
      <button className={props.otherStyle} onClick={() => setOther()}>
        Other <br></br>
        <div className="icons">
          <HiStar />
        </div>
      </button>
    </div>
  );
}
