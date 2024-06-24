import React, { useState, useMemo } from "react";
import "./Searchbar.css";

const Searchbar = () => {
  const [searchCategory, setSearchCategory] = useState("All");
  const getSearchHeader = (searchCategory) => {
    switch (searchCategory) {
      case "All":
        return "Where to";
      case "City":
        return "City to visit";
      case "Restaurants":
        return "Find places to eat";
      case "Travel_Category":
        return "Travel by Category";
      case "Travel_Destinations":
        return "Find Travel Destinations";
      default:
        return "Where to";
    }
  };

  const searchHeader = useMemo(
    () => getSearchHeader(searchCategory),
    [searchCategory]
  );

  const getSearchInputPlaceHolder = (searchCategory) => {
    switch (searchCategory) {
      case "All":
        return "Places to go, restaurants...";
      case "City":
        return "City to visit";
      case "Restaurants":
        return "Restaurants...";
      case "Travel_Category":
        return "Spiritual, wellness, family...";
      case "Travel_Destinations":
        return "Destinations...";
      default:
        return "Places to go, restaurants...";
    }
  };

  const searchInputPlaceHolder = useMemo(
    () => getSearchInputPlaceHolder(searchCategory),
    [searchCategory]
  );
  return (
    <div className="search-bar">
      <h2>{searchHeader}</h2>
      <ul className="category">
        <li
          className={searchCategory === "All" ? "active" : ""}
          onClick={() => setSearchCategory("All")}
        >
          <i className="fa-solid fa-house"></i>
          Search All
        </li>
        <li
          className={searchCategory === "City" ? "active" : ""}
          onClick={() => setSearchCategory("City")}
        >
          <i className="fa-solid fa-city"></i>
          City
        </li>
        <li
          className={searchCategory === "Restaurants" ? "active" : ""}
          onClick={() => setSearchCategory("Restaurants")}
        >
          <i className="fa-solid fa-utensils"></i>
          Restaurants
        </li>
        <li
          className={searchCategory === "Travel_Category" ? "active" : ""}
          onClick={() => setSearchCategory("Travel_Category")}
        >
          <i className="fa-solid fa-list"></i>
          Travel Category
        </li>
        <li
          className={searchCategory === "Travel_Destinations" ? "active" : ""}
          onClick={() => setSearchCategory("Travel_Destinations")}
        >
          <i className="fa-solid fa-location-dot"></i>
          Travel Destinations
        </li>
      </ul>
      <div className="search-bar-container">
        <div className="row">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder={searchInputPlaceHolder} />
          <button>Search</button>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
