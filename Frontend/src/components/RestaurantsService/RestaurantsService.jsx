import React from "react";
import "./RestaurantsService.css";

const RestaurantsService = () => {
  return (
    <div className="restaurants-service-section">
      <div className="service-box">
        <div className="image-container">
          <img
            src="https://static.tacdn.com/img2/branding/homepage/messaging/icons_restaurants_tl_2x.png"
            style={{ width: "114px", height: "48px" }}
          />
        </div>
        <div className="box-title">Find the best places to eat</div>
        <div className="box-description">
          4.3 million restaurants — everything from street food to fine dining
        </div>
      </div>
      <div className="service-box">
        <div className="image-container">
          <img
            src="https://static.tacdn.com/img2/branding/homepage/messaging/icon_reviews_2x.png"
            style={{ width: "106px", height: "48px" }}
          />
        </div>
        <div className="box-title">See the latest reviews</div>
        <div className="box-description">
          Millions of restaurant reviews and photos from our global travel
          community
        </div>
      </div>
      <div className="service-box">
        <div className="image-container">
          <img
            src="https://static.tacdn.com/img2/branding/homepage/messaging/icon_bookRestaurants_tl_2x.png"
            style={{ width: "82px", height: "48px" }}
          />
        </div>
        <div className="box-title">Reserve a table</div>
        <div className="box-description">
          Make online reservations at restaurants worldwide
        </div>
      </div>
    </div>
  );
};

export default RestaurantsService;
