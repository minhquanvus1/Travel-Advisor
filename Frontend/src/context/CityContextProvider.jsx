import React, { useState, useEffect, createContext } from "react";
import { cities } from "../assets/assets";
import { useLocation } from "react-router-dom";
export const CityContext = createContext(null);
const CityContextProvider = ({ children }) => {
  const [cityState, setCityState] = useState(() => {
    const cityStateFromLocalStorage = localStorage.getItem("cityState");
    return cityStateFromLocalStorage ? cityStateFromLocalStorage : "";
  });
  const location = useLocation();
  const checkAndSetCityState = (cityName) => {
    const isCityNameExist = cities.some(
      (city) => city.name.toLowerCase() === cityName.toLowerCase()
    );
    console.log("isCityNameExist is", isCityNameExist);
    if (!isCityNameExist) {
      console.log(`cityName ${cityName} does not exist`);
      return;
    }
    console.log("inside checksetcitystate");
    setCityState(cityName);
  };

  useEffect(() => {
    if (!cityState) {
      localStorage.removeItem("cityState");
      return;
    }
    localStorage.setItem("cityState", cityState);
  }, [cityState, location]);
  useEffect(() => {
    console.log("cityState now is", cityState);
  });

  const contextValue = {
    cities,
    cityState,
    setCityState,
    checkAndSetCityState,
  };
  return (
    <CityContext.Provider value={contextValue}>{children}</CityContext.Provider>
  );
};

export default CityContextProvider;
