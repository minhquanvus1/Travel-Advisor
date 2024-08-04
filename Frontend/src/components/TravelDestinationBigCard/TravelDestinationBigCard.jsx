import React from "react";
import "./TravelDestinationBigCard.css";
import { subCategory } from "../../assets/assets";

const TravelDestinationBigCard = ({ attraction, index }) => {
  const findSubCategory = (attraction) => {
    const foundSubCategory = subCategory.find(
      (subCategory) => subCategory.id === attraction.subCategoryId
    );
    console.log("foundSubCategory is", foundSubCategory);
    return foundSubCategory;
  };
  return (
    <div className="travel-destination-big-card">
      <div className="travel-destination-big-card-image-container">
        <img
          src={attraction.imageUrl}
          alt={`${attraction.attractionName} image`}
        />
      </div>
      <div className="travel-destination-big-card-contents">
        <div className="travel-destination-big-card-header-container">
          <div className="travel-destination-big-card-header">
            <div className="header-title">
              {index + 1}. {attraction.attractionName}
            </div>
            <div className="header-rating">
              <svg
                className="rating-stars"
                viewBox="0 0 128 24"
                width="68"
                height="12"
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
                {attraction.numberOfReviews.toLocaleString("en-US")} reviews
              </span>
            </div>
          </div>
          <div className="travel-destination-big-card-category">
            {findSubCategory(attraction).subCategoryName}
          </div>
        </div>
        <div className="travel-destination-big-card-description-container">
          <hr />
          <div className="travel-destination-big-card-description">
            {attraction.description}
            {/* <span className="description-more-dotted">
              ...
              <span className="description-more">More</span>
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelDestinationBigCard;
