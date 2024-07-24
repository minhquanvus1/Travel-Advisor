import React, { useContext } from "react";
import "./ThingsToDoInACityHeader.css";
import { CityContext } from "../../context/CityContextProvider";

const ThingsToDoInACityHeader = () => {
  const { cityState } = useContext(CityContext);
  return (
    <div className="things-to-do-in-a-city-header">
      <div className="things-to-do-in-a-city-content-left">
        <div className="things-to-do-in-a-city-image-container">
          <img
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/33/f1/0b/caption.jpg?w=600&h=500&s=1"
            alt={`things to do in ${cityState} header image`}
          />
        </div>
      </div>
      <div className="things-to-do-in-a-city-content-right">
        <h1 className="things-to-do-in-a-city-content-right-title">
          Things to Do in {cityState}
        </h1>
        <div className="things-to-do-in-a-city-content-right-description">
          Explore must-see sights and activities: War Remnants Museum, Cu Chi
          Tunnels, Art Galleries, Shopping Malls. For tailored recommendations,
          try our AI trip-planning service.
        </div>
      </div>
    </div>
  );
};

export default ThingsToDoInACityHeader;
