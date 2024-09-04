import React, { useContext } from "react";
import "./RestaurantsInACity.css";
import { restaurants, cities } from "../../assets/assets";
import { CityContext } from "../../context/CityContextProvider";
import RestaurantBigCard from "../../components/RestaurantBigCard/RestaurantBigCard";
import { Link, useParams } from "react-router-dom";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";
import { replaceUnderScoreWithWhiteSpace } from "../../functions/replaceUnderScoreWithWhiteSpace";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxios } from "../../hooks/useAxios";

const RestaurantsInACity = () => {
  const { cityName } = useParams();
  const { cityState } = useContext(CityContext);

  const [allRestaurantsInThisCity, error, loading] = useAxios({
    axiosInstance: axiosInstance,
    url: `/cities/${replaceUnderScoreWithWhiteSpace(cityName)}/restaurants`,
    method: "GET",
  });

  // const findRestaurantsInThisCity = () => {
  //   if (!cityName) return;
  //   const foundCity = cities.find(
  //     (city) => city.name === replaceUnderScoreWithWhiteSpace(cityName)
  //   );
  //   console.log("foundCity in restaurants is", foundCity);
  //   const allRestaurantsInThisCity = restaurants.filter(
  //     (restaurant) => restaurant.cityId === foundCity?.id
  //   );
  //   if (allRestaurantsInThisCity.length === 0) {
  //     console.log("this city has no restaurants");
  //     return;
  //   }
  //   console.log("all restaurants are", allRestaurantsInThisCity);
  //   return allRestaurantsInThisCity;
  // };
  // const allRestaurantsInThisCity = findRestaurantsInThisCity();
  return (
    <div className="restaurants-in-city-section">
      {error && `City ${cityState} has no restaurants`}
      {loading && "Loading..."}
      {allRestaurantsInThisCity.length > 0 && (
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
                      rating={restaurant.rating}
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
