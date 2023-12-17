import { SongProps } from "../pages/spotify/single_song";
import { dur_least_to_most, dur_most_to_least, pop_dur_least_to_most, pop_dur_most_to_least, pop_least_to_most, pop_most_to_least } from "./mock_songs";





interface FilterProps {
    checkedLToMPopular: boolean;
    setCheckedLToMPopular: React.Dispatch<React.SetStateAction<boolean>>
      checkedMToLPopular: boolean;
    setCheckedMToLPopular: React.Dispatch<React.SetStateAction<boolean>>
  checkedSToLDuration: boolean;
    setCheckedSToLDuration: React.Dispatch<React.SetStateAction<boolean>>
    checkedLToSDuration: boolean;
    setCheckedLToSDuration: React.Dispatch<React.SetStateAction<boolean>>
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>
}

 function handleSubmitMock(props: FilterProps) {
    let songsToDisplayArray = Array<Map<string, string | string[] | number>>()

    if (props.checkedLToMPopular && props.checkedMToLPopular) {
      console.log("cannot do both");
      props.setMessage("Please check only one box in each category");
    } else {
      if (props.checkedLToSDuration && props.checkedSToLDuration) {
        props.setMessage("Please check only one box in each category");
      } else {
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
        const songArtistsArray: string[] = songsToDisplayArray[i].get("artists");
        const songArtists: string = songArtistsArray.join();

        const songAlbum: string = songsToDisplayArray[i].get("album");
        const songDuration: number = songsToDisplayArray[i].get("duration");
        const songPopularity: number = songsToDisplayArray[i].get("popularity");

        // need to fix mocks to add genre
        const song: SongProps = {
          name: songName,
          artists: songArtists,
          album: songAlbum,
          duration: songDuration,
          popularity: songPopularity,
          genre: genre,
        };

      }
    }