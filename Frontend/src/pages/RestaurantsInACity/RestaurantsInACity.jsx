import React, { useContext } from "react";
import "./RestaurantsInACity.css";
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

  return (
    <div className="restaurants-in-city-section">
      {error && (
        <div
          style={{ display: "grid", placeItems: "center", height: "100dvh" }}
        >
          City ${cityState} has no restaurants
        </div>
      )}
      {loading && (
        <div
          style={{ display: "grid", placeItems: "center", height: "100dvh" }}
        >
          Loading...
        </div>
      )}
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
