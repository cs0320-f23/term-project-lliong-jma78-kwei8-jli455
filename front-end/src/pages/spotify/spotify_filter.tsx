import { Evented } from "mapbox-gl";
import React, { useState } from "react";
import { SongProps } from "./single_song";

// props for filter box component
interface FilterProps {
  setSongs: React.Dispatch<React.SetStateAction<SongProps[]>>;
}

// fields expected in the json response, regardless of if it was successul or not
interface jsonSpotifyResponse {
  result: string;
}

// fields expected in a successful json response with data
interface jsonSpotifyResponseWithData {
  result: string;
  data: Array<Map<string, object>>;
}

/**
 * checks if fields in json are what was expected
 * @param rjson
 * @returns
 */
function isSpotifyResponse(rjson: any): rjson is jsonSpotifyResponse {
  if (!("result" in rjson)) return false;
  return true;
}

/**
 * checks if fields in successful json are what was expected
 * @param rjson
 * @returns
 */
function isSpotifyResponseWithData(
  rjson: any
): rjson is jsonSpotifyResponseWithData {
  if (!("result" in rjson)) return false;
  if (!("data" in rjson)) return false;
  if (!(rjson["result"] === "success")) {
    return false;
  }
  return true;
}

/**
 * component that has options for filtering songs
 * @param props
 * @returns
 */
export function FilterBox(props: FilterProps) {
  const [checkedLToMPopular, setCheckedLToMPopular] = useState<boolean>(false);
  const [checkedMToLPopular, setCheckedMToLPopular] = useState<boolean>(false);
  const [checkedSToLDuration, setCheckedSToLDuration] =
    useState<boolean>(false);
  const [checkedLToSDuration, setCheckedLToSDuration] =
    useState<boolean>(false);

  const [message, setMessage] = useState<string>("");

  const handleLToMPopular = () => {
    setCheckedLToMPopular(!checkedLToMPopular);
  };

  const handleMToLPopular = () => {
    setCheckedMToLPopular(!checkedMToLPopular);
  };

  const handleSToLDuration = () => {
    setCheckedSToLDuration(!checkedSToLDuration);
  };

  const handleLToSDuration = () => {
    setCheckedLToSDuration(!checkedLToSDuration);
  };

  /**
   * function that calls to the backend to sort songs by popularity and/or duration
   */
  function handleSubmit() {
    let url = "http://localhost:323/sortspotify?";

    if (checkedLToMPopular && checkedMToLPopular) {
      console.log("cannot do both");
      setMessage("Please check only one box in each category");
    } else {
      if (checkedLToSDuration && checkedSToLDuration) {
        setMessage("Please check only one box in each category");
      } else {
        setMessage("");
        if (checkedLToMPopular) {
          url = url + "popularity=ascending";

          if (checkedLToSDuration && !checkedSToLDuration) {
            url = url + "&&duration=descending";
          }

          if (!checkedLToSDuration && checkedSToLDuration) {
            url = url + "&&duration=ascending";
          }
        } else {
          if (checkedMToLPopular) {
            url = url + "popularity=descending";

            if (checkedLToSDuration && !checkedSToLDuration) {
              url = url + "&&duration=descending";
            }

            if (!checkedLToSDuration && checkedSToLDuration) {
              url = url + "&&duration=ascending";
            }
          } else {
            if (checkedLToSDuration) {
              url = url + "duration=descending";
            }

            if (checkedSToLDuration) {
              url = url + "duration=ascending";
            }
          }
        }

        fetch(url)
          .then((response: Response) => response.json())
          .then((json) => {
            if (!isSpotifyResponse(json)) {
              console.log("not a json spotify filter");
            } else {
              if (json.result == "error") {
                setMessage(
                  "Please load songs before sorting. Do a new search!"
                );
              }
              if (!isSpotifyResponseWithData(json)) {
                console.log("not a json with data");
              } else {
                const songsToDisplay: SongProps[] = [];
                const data = json.data;

                for (let i = 0; i < data.length; i++) {
                  const songMap = data[i];

                  const songName: string = songMap["name"];
                  const songArtistsArray: string[] = songMap["artists"];
                  const songArtists: string = songArtistsArray.join();

                  const songAlbum: string = songMap["album"];
                  const songDuration: number = songMap["duration"];
                  const songPopularity: number = songMap["popularity"];
                  const songGenre: string = songMap["genre"];

                  const song: SongProps = {
                    name: songName,
                    artists: songArtists,
                    album: songAlbum,
                    duration: songDuration,
                    popularity: songPopularity,
                    genre: songGenre,
                  };

                  songsToDisplay.push(song);
                }
                props.setSongs(songsToDisplay);
              }
            }
          })
          .catch((error) => {
            console.log(error);
            setMessage("Only select one box in each category");
          });
      }
    }
  }

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter" && event.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className="filter-box" onKeyDown={keyDownHandler}>
      Sort Songs!
      <br></br>
      <br></br>
      <div className="checkboxes">
        <div>
          <h2>Popularity</h2>
          <Checkbox
            label="Most Popular to Least Popular"
            value={checkedMToLPopular}
            onChange={handleMToLPopular}
          />
          <br></br>
          <br></br>
          <Checkbox
            label="Least Popular to Most Popular"
            value={checkedLToMPopular}
            onChange={handleLToMPopular}
          />
        </div>
        <div>
          <br></br>
          <h2>Duration</h2>
          <Checkbox
            label="Shortest Duration to Longest Duration"
            value={checkedSToLDuration}
            onChange={handleSToLDuration}
          />
          <br></br>
          <br></br>
          <Checkbox
            label="Longest Duration to Shortest Duration"
            value={checkedLToSDuration}
            onChange={handleLToSDuration}
          />
        </div>
      </div>
      <br></br>
      <h3>{message}</h3>
      <br></br>
      <button className="sort-submit-button" onClick={() => handleSubmit()}>
        Submit
      </button>
    </div>
  );
}

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};
