import React, { useContext } from "react";
import "./RestaurantsInACity.css";
import { restaurants, cities } from "../../assets/assets";
import { CityContext } from "../../context/CityContextProvider";
import RestaurantBigCard from "../../components/RestaurantBigCard/RestaurantBigCard";
import { Link, useParams } from "react-router-dom";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";
import { replaceUnderScoreWithWhiteSpace } from "../../functions/replaceUnderScoreWithWhiteSpace";

const RestaurantsInACity = () => {
  const { cityName } = useParams();
  const { cityState } = useContext(CityContext);
  const findRestaurantsInThisCity = () => {
    if (!cityName) return;
    const foundCity = cities.find(
      (city) => city.name === replaceUnderScoreWithWhiteSpace(cityName)
    );
    console.log("foundCity in restaurants is", foundCity);
    const allRestaurantsInThisCity = restaurants.filter(
      (restaurant) => restaurant.cityId === foundCity.id
    );
    if (allRestaurantsInThisCity.length === 0) {
      console.log("this city has no restaurants");
      return;
    }
    console.log("all restaurants are", allRestaurantsInThisCity);
    return allRestaurantsInThisCity;
  };
  const allRestaurantsInThisCity = findRestaurantsInThisCity();
  return (
    <div className="restaurants-in-city-section">
      {!allRestaurantsInThisCity && `City ${cityState} has no restaurants`}
      {allRestaurantsInThisCity && (
        <>
          <h1 className="restaurants-in-city-section-title">
            Restaurants in {replaceUnderScoreWithWhiteSpace(cityName)}
          </h1>
          <div className="restaurants-in-city-section-contents">
            <div className="restaurant-small-card-list">
              {allRestaurantsInThisCity.map((restaurant, index) => (
                <div
                  key={restaurant.id}
                  style={{
                    width: "clamp(272px, 70%, 100%)",
                    height: "clamp(min-content, 14vw, 17vw)",
                  }}
                >
                  <Link
                    to={`/cities/${cityName}/restaurants/${replaceWhiteSpaceWithUnderScore(
                      restaurant.name
                    )}`}
                  >
                    <RestaurantBigCard
                      index={index}
                      imageUrl={restaurant.imageUrl}
                      cardTitle={restaurant.name}
                      numberOfReviews={restaurant.numberOfReviews}
                      cardDescription={restaurant.description}
                    ></RestaurantBigCard>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantsInACity;
