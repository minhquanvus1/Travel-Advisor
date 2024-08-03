import React from "react";
import "./Restaurants.css";
import RestaurantsHeader from "../../components/RestaurantsHeader/RestaurantsHeader";
import RestaurantsService from "../../components/RestaurantsService/RestaurantsService";

const Restaurants = () => {
  return (
    <div className="restaurants-section">
      <RestaurantsHeader></RestaurantsHeader>
      <div className="restaurants">
        <div className="restaurants-service-container">
          <RestaurantsService></RestaurantsService>
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
