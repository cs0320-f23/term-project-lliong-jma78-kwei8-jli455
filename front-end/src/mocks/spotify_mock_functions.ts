import { SongProps } from "../pages/spotify/single_song";
import {
  dur_least_to_most,
  dur_most_to_least,
  pop_dur_least_to_most,
  pop_dur_most_to_least,
  pop_least_to_most,
  pop_most_to_least,
} from "./mock_songs";

interface FilterProps {
  checkedLToMPopular: boolean;
  setCheckedLToMPopular: React.Dispatch<React.SetStateAction<boolean>>;
  checkedMToLPopular: boolean;
  setCheckedMToLPopular: React.Dispatch<React.SetStateAction<boolean>>;
  checkedSToLDuration: boolean;
  setCheckedSToLDuration: React.Dispatch<React.SetStateAction<boolean>>;
  checkedLToSDuration: boolean;
  setCheckedLToSDuration: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setSongs: React.Dispatch<React.SetStateAction<SongProps[]>>;
}

function handleFilterMock(props: FilterProps) {
  let songsToDisplayArray = Array<Map<string, string | string[] | number>>();

  if (props.checkedLToMPopular && props.checkedMToLPopular) {
    console.log("cannot do both");
    props.setMessage("Please check only one box in each category");
  } else {
    if (props.checkedLToSDuration && props.checkedSToLDuration) {
      props.setMessage("Please check only one box in each category");
    } else {
      const songsToDisplay: SongProps[] = [];
      props.setMessage("");
      if (props.checkedLToMPopular) {
        songsToDisplayArray = pop_least_to_most;

        if (props.checkedLToSDuration && !props.checkedSToLDuration) {
          songsToDisplayArray = pop_least_to_most;
        }

        if (!props.checkedLToSDuration && props.checkedSToLDuration) {
          songsToDisplayArray = pop_dur_least_to_most;
        }
      } else {
        if (props.checkedMToLPopular) {
          songsToDisplayArray = pop_most_to_least;

          if (props.checkedLToSDuration && !props.checkedSToLDuration) {
            songsToDisplayArray = pop_most_to_least;
          }

          if (!props.checkedLToSDuration && props.checkedSToLDuration) {
            songsToDisplayArray = pop_dur_most_to_least;
          }
        } else {
          if (props.checkedLToSDuration) {
            songsToDisplayArray = dur_least_to_most;
          }

          if (props.checkedSToLDuration) {
            songsToDisplayArray = dur_most_to_least;
          }
        }
      }

      for (let i = 0; i < songsToDisplayArray.length; i++) {
        const songName: string = songsToDisplayArray[i].get("name");

        // fix to extract value from array
        const songArtistsArray: string[] =
          songsToDisplayArray[i].get("artists");
        const songArtists: string = songArtistsArray.join();

        const songAlbum: string = songsToDisplayArray[i].get("album");
        const songDuration: number = songsToDisplayArray[i].get("duration");
        const songPopularity: number = songsToDisplayArray[i].get("popularity");
        const songGenre: string = songsToDisplayArray[i].get("genre");

        // need to fix mocks to add genre
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
}

export function getMockSongs(props: SpotifyPageProps) {
  const songArray = small_song_dataset;

  // do better error checking

  for (let i = 0; i < songArray.length; i++) {
    const songName: string = songArray[i].get("name");

    // fix to extract value from array
    const songArtistsArray: string[] = songArray[i].get("artists");
    const songArtists: string = songArtistsArray.join();

    const songAlbum: string = songArray[i].get("album");
    const songDuration: number = songArray[i].get("duration");
    const songPopularity: number = songArray[i].get("popularity");
    const songGenre: string = songArray[i].get("genre");

    const song: SongProps = {
      name: songName,
      artists: songArtists,
      album: songAlbum,
      duration: songDuration,
      popularity: songPopularity,
      genre: songGenre,
    };

    allSongs.push(song);

    //props.setSongs([...props.songs]);
    console.log(props.songs);
  }

  return allSongs;
}

function handleSubmitMock() {
  console.log("handle submit mock");
  const songsToDisplay: SongProps[] = [];

  // check when there are multiple genres
  const commandStringArray: string[] = commandString.split(",");

  if (commandString) {
    // maybe checking if genres array is empty
    // result is error and validgenres=[]
    if (!allGenres.includes(commandString)) {
      setMessage("Please enter a valid genre!");
    } else {
      setMessage("");
      for (let i = 0; i < allSongs.length; i++) {
        if (allSongs[i].genre == commandString) {
          songsToDisplay.push(allSongs[i]);
        }
      }
      props.setSongs(songsToDisplay);
    }
  }

  // what about for multiple genres???
  // for multple genres maybe say "----" is not valid

  // is this too many if statements rippppp

  if (numCommandString) {
    const num = parseInt(numCommandString);

    if (isNaN(num)) {
      setMessage("Please enter a valid number!");
      if (!allGenres.includes(commandString)) {
        setMessage("Please enter a valid genre and a valid number!");
      }
    } else {
      if (num < 0) {
        setMessage("Please enter a number greater than or equal to zero");
      } else {
        setMessage("");
        if (!commandString) {
          const splicedSongs = allSongs.slice(0, num);
          props.setSongs(splicedSongs);
        } else {
          if (!allGenres.includes(commandString)) {
            setMessage("Please enter a valid genre!");
            const splicedSongs = allSongs.slice(0, num);
            props.setSongs(splicedSongs);
            console.log("invalid genre but valid number");
          } else {
            setMessage("");
            if (songsToDisplay) {
              songsToDisplay.splice(num);
              props.setSongs(songsToDisplay);
              console.log("num songs display");
            }
          }
        }
      }
    }
  }

  setCommandString("");
  setNumCommandString("");
}
