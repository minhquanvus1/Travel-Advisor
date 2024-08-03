import React from "react";
import "./CityCard.css";

const CityCard = ({ city }) => {
  return (
    <div className="city-card">
      <div className="image-container">
        <img src={city.imageUrl} alt="city image" />
      </div>
      <h2>{city.name}</h2>
    </div>
  );
};

export default CityCard;
