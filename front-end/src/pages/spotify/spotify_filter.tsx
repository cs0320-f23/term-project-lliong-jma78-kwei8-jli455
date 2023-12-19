import React, { useState } from "react";
import { SongProps } from "./single_song";

// options:
// sort by most popular to least popular and vice versa
// sort by duration - longest to shortest and vice versa
//

// potentially logos - like big clock to small clock maybeee

// should not be able to select both popularity/duration options but you can do one
// popularity and one duration

// submit button for calling handlers?

interface FilterProps {
  setSongs: React.Dispatch<React.SetStateAction<SongProps[]>>;
}

interface jsonSpotifyResponse {
  result: string;
}

interface jsonSpotifyResponseWithData {
  result: string;
  data: Array<Map<string, object>>;
}

function isSpotifyResponse(rjson: any): rjson is jsonSpotifyResponse {
  if (!("result" in rjson)) return false;
  return true;
}

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

  // need to mock filtering?
  // clicking submit and nothing is selected, should do nothing? or send message

  // songs must be loaded before ranking? this means you have to search for songs
  // before ranking, not ranking the existing ones? check with backend

  function handleSubmit() {
    let url = "http://localhost:323/sortspotify?";

    // if result is error - please search for set of songs before sorting
    // result and details field

    // otherwise it is result and data with songs

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
    // if you don't select any filters, nothing should change right if you click
    // submit button?
    console.log(url);
    // saying to load songs before search even though it should say cannot select two in one category
    // do a catch block for the url to say "please select filters to sort songs"

    // once you have searched songs, you can keep filtering on those
    // will tell you to load songs the first time you try to filter without selecting
    // anything! make sure this is the case
  }

  return (
    <div className="filter-box">
      Sort Songs!
      <br></br>
      <br></br>
      <div className="checkboxes">
        <div>
          <h2>Popularity</h2>
          <Checkbox
            label="most popular to least popular"
            value={checkedMToLPopular}
            onChange={handleMToLPopular}
          />
          <br></br>
          <br></br>
          <Checkbox
            label="least popular to most popular"
            value={checkedLToMPopular}
            onChange={handleLToMPopular}
          />
        </div>
        <div>
          <br></br>
          <h2>Duration</h2>
          <Checkbox
            label="shortest duration to longest duration"
            value={checkedSToLDuration}
            onChange={handleSToLDuration}
          />
          <br></br>
          <br></br>
          <Checkbox
            label="longest duration to shortest duration"
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

// cite site?
const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};
