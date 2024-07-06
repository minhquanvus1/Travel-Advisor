import React from "react";
import "./TravelDestinationsHeader.css";

const TravelDestinationsHeader = () => {
  return (
    <div className="travel-destinations-header">
      <div className="search-bar-wrapper">
        <div className="search-bar">
          <h2>Find Things to Do anywhere</h2>
          <div className="search-bar-container">
            <div className="row">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search by Travel Destination, attraction"
              />
              <button>Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelDestinationsHeader;
