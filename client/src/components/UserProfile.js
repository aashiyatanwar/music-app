import React, { useState, useEffect } from "react";
import Header from "./Header";
import { getUserById, getAllUsers } from "../api";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const UserProfile = () => {
  const [{ user }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    (userId) => {
      ///console.log(userId)
      setIsLoading(true);
      if (!user) {
        getUserById(userId).then((data) => {
          dispatch({
            type: actionType.SET_USER,
            user: data.data,
          });
        });
      }
    },
    [user]
  );

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <Header />

      {user && (
        <div className="relative w-400 h-420 rounded-md flex items-center justify-center gap-2 px-10 py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md">
          <div className="w-275 h-275 flex items-center justify-center">
            <img
              src={user?.user?.imageURL}
              alt=""
              className="w-50 h-50 object-cover rounded-md  shadow-md"
            />
          </div>
          <div>
            <p className="text-lg text-textColor font-semibold w-400 text-justify">
              Name : {user?.user.name}
            </p>
            <p className="text-lg text-textColor font-semibold w-400 text-justify">
              Email : {user?.user.email}
            </p>
            <p className="text-lg text-textColor font-semibold w-400 text-justify">
              Verified : {user?.user.email_verfied ? "True" : "False"}
            </p>
            <p className="text-lg text-textColor font-semibold w-400 text-justify">
              Created At : {user?.user.createdAt}
            </p>
            <p className="text-lg text-textColor font-semibold w-400 text-justify">
              Role : {user?.user.role}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
