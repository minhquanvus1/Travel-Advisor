import React from "react";
import "./TravelDestinationBigCard.css";
import { subCategory } from "../../assets/assets";
import RatingStars from "../RatingStars/RatingStars";

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
              <RatingStars
                rating={attraction.rating}
                width={68}
                height={12}
              ></RatingStars>

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
