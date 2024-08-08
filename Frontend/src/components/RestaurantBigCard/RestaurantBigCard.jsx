import React from "react";
import "./RestaurantBigCard.css";
import RatingStars from "../RatingStars/RatingStars";

const RestaurantBigCard = ({
  cardTitle,
  imageUrl,
  numberOfReviews,
  cardDescription,
  rating,
  index,
}) => {
  return (
    <div className="restaurant-big-card">
      <div className="restaurant-big-card-image-container">
        <img src={imageUrl} alt={`${cardTitle} image`} />
      </div>
      <div className="restaurant-big-card-contents">
        <div className="restaurant-big-card-header-wrapper">
          <div className="restaurant-big-card-header">
            <div className="restaurant-big-card-header-title">{`${
              index + 1
            }. ${cardTitle}`}</div>
            <div className="restaurant-big-card-header-rating-count">
              <RatingStars rating={rating} width={88} height={16}></RatingStars>
              <span className="number-of-reviews">
                {numberOfReviews.toLocaleString("en-US")} reviews
              </span>
            </div>
            <div className="restaurant-big-card-cuisines">
              Vietnamese, Indigenous
            </div>
          </div>
        </div>
        <div className="restaurant-big-card-description">
          <hr />
          <div className="restaurant-big-card-description-contents">
            {cardDescription}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantBigCard;
