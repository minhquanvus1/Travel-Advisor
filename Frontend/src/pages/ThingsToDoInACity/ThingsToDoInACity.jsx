import React, { useContext } from "react";
import "./ThingsToDoInACity.css";
import ThingsToDoInACityHeader from "../../components/ThingsToDoInACityHeader/ThingsToDoInACityHeader";
import { Link } from "react-router-dom";
import TravelDestinationBigCard from "../../components/TravelDestinationBigCard/TravelDestinationBigCard";
import { CityContext } from "../../context/CityContextProvider";
import { cities, subCategory, attractions } from "../../assets/assets";

const ThingsToDoInACity = () => {
  const { cityState } = useContext(CityContext);
  const findAttractionsInThisCity = () => {
    if (!cityState) return;
    const foundCity = cities.find((city) => city.name === cityState);
    console.log("foundCity in thingstodoinacity is", foundCity);
    const allAttractionsInThisCity = attractions.filter(
      (attraction) => attraction.cityId === foundCity.id
    );
    if (allAttractionsInThisCity.length === 0) {
      console.log("this city has no attractions");
      return;
    }
    console.log("all attractions are", allAttractionsInThisCity);
    return allAttractionsInThisCity;
  };
  const allAttractionsInThisCity = findAttractionsInThisCity();
  return (
    <div className="things-to-do-in-a-city-section">
      <div className="things-to-do-in-a-city">
        <ThingsToDoInACityHeader></ThingsToDoInACityHeader>
        <hr />
        <div className="top-attractions-section">
          <div className="top-attractions-title-container">
            <h2 className="top-attractions-title">
              Top Attractions in Ho Chi Minh City
            </h2>
            <Link to="/" className="attractions-link">
              See all
            </Link>
          </div>
          <div className="top-attractions-list">
            {!allAttractionsInThisCity &&
              `City ${cityState} has no attractions`}
            {allAttractionsInThisCity &&
              allAttractionsInThisCity.map((attraction, index) => {
                return (
                  <TravelDestinationBigCard
                    key={attraction.id}
                    index={index}
                    attraction={attraction}
                  ></TravelDestinationBigCard>
                );
              })}
          </div>
          <Link to="/" className="attractions-link">
            See all
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThingsToDoInACity;
