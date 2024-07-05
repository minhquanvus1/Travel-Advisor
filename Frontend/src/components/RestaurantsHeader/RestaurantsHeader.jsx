import React from "react";
import "./RestaurantsHeader.css";

const RestaurantsHeader = () => {
  return (
    <div className="restaurants-header">
      <div className="search-bar-wrapper">
        <div className="search-bar">
          <h2>Find your perfect restaurants</h2>
          <div className="search-bar-container">
            <div className="row">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="City or Restaurant name" />
              <button>Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsHeader;
