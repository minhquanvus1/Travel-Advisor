import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const useAccessToken = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const response = await getAccessTokenSilently();
          setToken(response);
        } catch (error) {
          console.log("Error while fetching Token ", error);
        }
      }
    };
    getToken();
  }, [isAuthenticated]);
  useEffect(() => {
    console.log("token current is", token);
  }, [token]);

  return { token };
};
