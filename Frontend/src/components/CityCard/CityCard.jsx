import React, { useContext } from "react";
import "./CityCard.css";
import { Link } from "react-router-dom";
import { CityContext } from "../../context/CityContextProvider";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";

const CityCard = ({ city }) => {
  const { checkAndSetCityState } = useContext(CityContext);

  return (
    <Link
      to={`/cities/${replaceWhiteSpaceWithUnderScore(city.name)}`}
      className="city-link"
      onClick={() => checkAndSetCityState(city.name)}
    >
      <div className="city-card">
        <img src={city.imageUrl} alt="city image" />
        <h2>{city.name}</h2>
      </div>
    </Link>
  );
};

export default CityCard;
