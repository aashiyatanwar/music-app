import React from "react";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { getFavouritesSongs, getSongById, getAllSongs } from "../api";
import Header from './Header'

const MyFavourites = () => {
  const [{ user }, dispatch] = useStateValue();

  const showFavouriteSongs = (songId) => {
    console.log(songId);
    getFavouritesSongs(songId).then((res) => {
      console.log("res ", res);
      if (res) {
        getAllSongs().then((data) => {
          console.log("data ", data);
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: data.data,
          });
        });
      }
    });
  };
  //console.log(user?.user.favourites);

  return (
    <div>
      <Header/>
      Myfavourites
      {user?.user.favourites.map((data , key) => {
        //key={data._id}
        { 
          console.log("id", data.songId);
        }
        showFavouriteSongs(data.songId);
      })}
    </div>
  );
};

export default MyFavourites;
