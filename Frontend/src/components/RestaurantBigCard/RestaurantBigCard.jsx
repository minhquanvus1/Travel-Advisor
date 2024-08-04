import React from "react";
import "./RestaurantBigCard.css";

const RestaurantBigCard = ({
  cardTitle,
  imageUrl,
  numberOfReviews,
  cardDescription,
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
              <svg
                className="rating-stars"
                viewBox="0 0 128 24"
                width="88"
                height="16"
                aria-labelledby=":lithium-Rclkco6f1l9klt5vlq:"
              >
                <title id=":lithium-Rclkco6f1l9klt5vlq:">
                  5.0 of 5 bubbles
                </title>
                <path
                  d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z"
                  transform=""
                ></path>
                <path
                  d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z"
                  transform="translate(26 0)"
                ></path>
                <path
                  d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z"
                  transform="translate(52 0)"
                ></path>
                <path
                  d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z"
                  transform="translate(78 0)"
                ></path>
                <path
                  d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z"
                  transform="translate(104 0)"
                ></path>
              </svg>
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
