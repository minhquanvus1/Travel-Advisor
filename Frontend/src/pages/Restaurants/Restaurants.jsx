import React, { useContext, useEffect } from "react";
import "./Restaurants.css";
import { CityContext } from "../../context/CityContextProvider";
import RestaurantsHeader from "../../components/RestaurantsHeader/RestaurantsHeader";
import RestaurantsService from "../../components/RestaurantsService/RestaurantsService";
import { Link } from "react-router-dom";
import { cities } from "../../assets/assets";
import CityCard from "../../components/CityCard/CityCard";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";

const Restaurants = () => {
  const { setCityState } = useContext(CityContext);
  useEffect(() => {
    setCityState("");
  }, []);
  return (
    <div className="restaurants-section">
      <RestaurantsHeader></RestaurantsHeader>
      <div className="restaurants">
        <div className="restaurants-service-container">
          <RestaurantsService></RestaurantsService>
        </div>
        <div className="restaurants-in-top-cities-container">
          <div className="restaurants-in-top-cities-header">
            <h3 className="title">Restaurants in top destinations</h3>
            <a href="#">See all</a>
          </div>
          <div className="restaurants-in-top-cities-list">
            {cities.length > 0 &&
              cities.map((city, index) => {
                return (
                  <Link
                    to={`/cities/${replaceWhiteSpaceWithUnderScore(
                      city.name
                    )}/restaurants`}
                    key={city.id}
                  >
                    <CityCard city={city}></CityCard>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
