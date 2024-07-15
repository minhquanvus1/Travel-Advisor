import React, { useState, useEffect, useContext } from "react";
import "./City.css";
import { useParams } from "react-router-dom";
import { cities } from "../../assets/assets";
import ExpandableDescription from "../../components/ExpandableDescription/ExpandableDescription";
import { useLocation } from "react-router-dom";
import { CityContext } from "../../context/CityContextProvider";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";
import { replaceUnderScoreWithWhiteSpace } from "../../functions/replaceUnderScoreWithWhiteSpace";
import TravelAdviceBanner from "../../components/TravelAdviceBanner/TravelAdviceBanner";

const City = () => {
  const { cityName } = useParams();
  const [city, setCity] = useState(null);
  const location = useLocation();
  const { setCityState, checkAndSetCityState } = useContext(CityContext);
  console.log("cityName is", cityName);

  const findCityByName = () => {
    const foundCity = cities.find((city) => {
      console.log("city.name is", city.name);
      return replaceWhiteSpaceWithUnderScore(city.name) === cityName;
    });
    if (!foundCity) {
      console.log("No city found");
      return;
    }
    console.log("city in function is", foundCity);
    setCity(foundCity);
    return foundCity;
  };
  useEffect(() => {
    findCityByName();
  }, []);
  // useEffect(() => {
  //   if (!cityState) {
  //     switch (location.pathname) {
  //       case `/cities/${replaceWhiteSpaceWithUnderScore(cityName)}`:
  //         checkAndSetCityState(replaceUnderScoreWithWhiteSpace(cityName));
  //         break;
  //       default:
  //         setCityState("");
  //     }
  //   }
  // }, [location.pathname]);
  return (
    <div className="city">
      {!city && "No city found"}
      City {cityName}
      {city && (
        <>
          <div className="city-header">
            <img src={city && city.imageUrl} alt="city header" />
          </div>
          <ExpandableDescription
            title={city.name}
            text={city.description}
          ></ExpandableDescription>
          <TravelAdviceBanner></TravelAdviceBanner>
          <div className="city-cuisine-section">
            <h2 className="city-cuisine-section-title">
              Cuisine in {city.name}
            </h2>
            <div className="city-cuisine-list">
              {city.cuisine.map((dish, index) => {
                return (
                  <div key={dish.id} className="cuisine-card">
                    <img src={dish.imageUrl} alt={dish.name} />
                    <div className="dish-details">
                      <h2>{dish.name}</h2>
                      <p>{dish.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default City;
