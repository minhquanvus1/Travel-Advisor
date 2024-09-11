import React, { useState, useEffect, createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { axiosInstance } from "../apis/axiosInstance";
import { useAxiosFunction } from "../hooks/useAxiosFunction";
import { useAccessToken } from "../hooks/useAccessToken";

export const UserContext = createContext(null);
const UserContextProvider = ({ children }) => {
  const { user } = useAuth0();
  const { token } = useAccessToken();
  const [userFromDb, userFromDbError, userFromDbLoading, axiosFetch] =
    useAxiosFunction();
  const [reload, setReload] = useState(false);

  const refetchUser = () => {
    setReload((prev) => !prev);
  };
  useEffect(() => {
    if (user && token) {
      axiosFetch({
        axiosInstance: axiosInstance,
        method: "GET",
        url: `/secure/users/search/findBySubject?subject=${encodeURIComponent(
          user.sub
        )}`,
        requestConfig: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    }
  }, [user, token, reload]);
  console.log("userFromDb is", userFromDb);
  const contextValue = {
    userFromDb,
    userFromDbError,
    userFromDbLoading,
    refetchUser,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
