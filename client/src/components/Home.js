import React, { useEffect, useState } from "react";
import {
  getAllSongs,
  favouritesSong,
  getAllUsers,
  removeFavourites,
} from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

import Filter from "./Filter";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { motion } from "framer-motion";
import { GrPlayFill } from "react-icons/gr";
import { RiAddFill } from "react-icons/ri";
import { TiTick } from "react-icons/ti";

import AlertSuccess from "./AlertSuccess";
import AlertError from "./AlertError";

const Home = () => {
  const [
    {
      searchTerm,
      allSongs,
      artistFilter,
      filterTerm,
      albumFilter,
      languageFilter,
    },
    dispatch,
  ] = useStateValue();

  const [filteredSongs, setFilteredSongs] = useState(null);

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = allSongs.filter(
        (data) =>
          data.artist.toLowerCase().includes(searchTerm) ||
          data.language.toLowerCase().includes(searchTerm) ||
          data.name.toLowerCase().includes(searchTerm) ||
          data.artist.includes(artistFilter)
      );
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.artist === artistFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [artistFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.category.toLowerCase() === filterTerm
    );
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [filterTerm]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.album === albumFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [albumFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.language === languageFilter
    );
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [languageFilter]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center bg-primary">
      <Header />
      <SearchBar />

      {searchTerm.length > 0 && (
        <p className="my-4 text-base text-textColor">
          Searched for :
          <span className="text-xl text-cartBg font-semibold">
            {searchTerm}
          </span>
        </p>
      )}

      <Filter setFilteredSongs={setFilteredSongs} />

      <div className="w-full h-auto flex items-center justify-evenly gap-4 flex-wrap p-4">
        <HomeSongContainer musics={filteredSongs ? filteredSongs : allSongs} />
      </div>
    </div>
  );
};

export const HomeSongContainer = ({ musics }) => {
  const [{ isSongPlaying, song, user, favourite }, dispatch] = useStateValue();

  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  user && isLoading && setIsLoading(false);

  console.log(isLoading, user, musics);

  const addSongToContext = (index) => {
    //console.log("index" , index)
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
    }
  };

  const addSongsToFavourites = (userId, songId) => {
    console.log("songId", songId);
    console.log("userId", userId);

    favouritesSong(userId, songId).then((res) => {
      console.log("res", res);
      if (res.data.success) {
        setAlert("success");
        setAlertMsg(res.data.msg);
        getAllUsers().then((data) => {
          console.log("data", data);
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      } else {
        setAlert("error");
        setAlertMsg(res.data.msg);
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      }
      //setFavouriteId(songId);
      //setIsFavourite(true);
    });
  };

  const removeFavourite = (userId, songId) => {
    removeFavourites(userId, songId).then((res) => {
      console.log("Remove-res", res);
      //setFavouriteId(songId);
      if (res.data.success) {
        setAlert("success");
        setAlertMsg(res.data.msg);
        getAllUsers().then((data) => {
          console.log("data", data);
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      } else {
        setAlert("error");
        setAlertMsg(res.data.msg);
        setTimeout(() => {
          setAlert(false);
        }, 4000);
      }
      //setFavouriteId("");
      //setIsFavourite(false);
    });
  };

  const renderSongs = (definedUser, definedMusic) => {
    //console.log(definedUser.user.favourites, definedMusic);
    return (
      <>
        {definedMusic?.map((data, index) => (
          <motion.div
            key={data._id}
            whileTap={{ scale: 0.8 }}
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
          >
            <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={data.imageURL}
                alt=""
                className=" w-full h-full rounded-lg object-cover"
              />
            </div>

            <p className="text-base text-headingColor font-semibold my-2">
              {data.name.length > 25 ? `${data.name.slice(0, 25)}` : data.name}
              <span className="block text-sm text-gray-400 my-1">
                {data.artist}
              </span>
            </p>
            <div className="flex gap-4 px-4">
              <button onClick={() => addSongToContext(index)}>
                <GrPlayFill className="text-textColor group-hover:text-headingColor text-xl cursor-pointer"></GrPlayFill>
              </button>
              <div></div>

              {/*console.log(data)*/}

              {definedUser.user.favourites.some(
                (favorite) => favorite.songId === data._id
              ) ? (
                
                <button
                  onClick={() =>
                    removeFavourite(definedUser?.user._id, data._id)
                    
                  }
                >
                  <TiTick className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer"></TiTick>
                </button>
              ) : (
                <button
                  onClick={() =>
                    addSongsToFavourites(definedUser?.user._id, data._id)
                  }
                >
                  <RiAddFill className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer"></RiAddFill>
                </button>
              )}
            </div>
            {alert && (
              <>
                {alert === "success" ? (
                  <AlertSuccess msg={alertMsg} />
                ) : (
                  <AlertError msg={alertMsg} />
                )}
              </>
            )}

            {isLoading && (
              <div className="absolute inset-0 bg-card animate-pulse"></div>
            )}
          </motion.div>
        ))}
      </>
    );
  };

  return user && renderSongs(user, musics);
};

export default Home;
