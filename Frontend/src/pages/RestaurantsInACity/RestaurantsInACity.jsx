import React, { useContext } from "react";
import "./RestaurantsInACity.css";
import SmallCard from "../../components/SmallCard/SmallCard";
import { restaurants, cities } from "../../assets/assets";
import { CityContext } from "../../context/CityContextProvider";
import RestaurantBigCard from "../../components/RestaurantBigCard/RestaurantBigCard";
import TravelDestinationBigCard from "../../components/TravelDestinationBigCard/TravelDestinationBigCard";

const RestaurantsInACity = () => {
  const { cityState } = useContext(CityContext);
  const findRestaurantsInThisCity = () => {
    if (!cityState) return;
    const foundCity = cities.find((city) => city.name === cityState);
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
            Restaurants in {cityState}
          </h1>
          <div className="restaurants-in-city-section-contents">
            <div className="restaurant-small-card-list">
              {allRestaurantsInThisCity.map((restaurant, index) => (
                <RestaurantBigCard
                  key={restaurant.id}
                  index={index}
                  imageUrl={restaurant.imageUrl}
                  cardTitle={restaurant.name}
                  numberOfReviews={restaurant.numberOfReviews}
                  cardDescription={restaurant.description}
                ></RestaurantBigCard>
              ))}
            </div>
            <SmallCard
              imageUrl={allRestaurantsInThisCity[0].imageUrl}
              cardTitle={allRestaurantsInThisCity[0].name}
              numberOfReviews={allRestaurantsInThisCity[0].numberOfReviews}
            ></SmallCard>
            {/* <TravelDestinationBigCard></TravelDestinationBigCard> */}
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantsInACity;
