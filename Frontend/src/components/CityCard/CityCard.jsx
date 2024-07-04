import React from "react";
import "./CityCard.css";
import { Link } from "react-router-dom";

const CityCard = ({ city }) => {
  return (
    <Link to={`/cities/${city.name}`} className="city-link">
      <div className="city-card">
        <img src={city.imageUrl} alt="city image" />
        <h2>{city.name}</h2>
      </div>
    </Link>
  );
};

export default CityCard;
