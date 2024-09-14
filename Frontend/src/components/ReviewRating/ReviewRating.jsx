import React, { useState } from "react";
import "./ReviewRating.css";

const ReviewRating = ({ rating, setRating }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const handleRatingChange = (e) => {
    const rating = parseInt(e.target.id.split("-")[1]);
    setRating(rating);
  };
  const handleMouseEnter = (ratingValue) => {
    setHoveredRating(ratingValue);
    console.log("mouse entered");
  };
  const handleMouseLeave = () => {
    setHoveredRating(0);
  };
  const ratingText = (ratingValue) => {
    switch (ratingValue) {
      case 1:
        return "Terrible";
      case 2:
        return "Poor";
      case 3:
        return "Average";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "";
    }
  };
  console.log("hoveredRating is ", hoveredRating);
  return (
    <div className="star-widget-container">
      <div className="star-widget">
        <input
          type="radio"
          name="rate"
          id="rate-5"
          checked={rating === 5}
          onChange={handleRatingChange}
        />
        <label
          htmlFor="rate-5"
          className="fas fa-star"
          onMouseEnter={() => handleMouseEnter(5)}
          onMouseLeave={handleMouseLeave}
        ></label>
        <input
          type="radio"
          name="rate"
          id="rate-4"
          checked={rating === 4}
          onChange={handleRatingChange}
        />
        <label
          htmlFor="rate-4"
          className="fas fa-star"
          onMouseEnter={() => handleMouseEnter(4)}
          onMouseLeave={handleMouseLeave}
        ></label>
        <input
          type="radio"
          name="rate"
          id="rate-3"
          checked={rating === 3}
          onChange={handleRatingChange}
        />
        <label
          htmlFor="rate-3"
          className="fas fa-star"
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={handleMouseLeave}
        ></label>
        <input
          type="radio"
          name="rate"
          id="rate-2"
          checked={rating === 2}
          onChange={handleRatingChange}
        />
        <label
          htmlFor="rate-2"
          className="fas fa-star"
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
        ></label>
        <input
          type="radio"
          name="rate"
          id="rate-1"
          checked={rating === 1}
          onChange={handleRatingChange}
        />
        <label
          htmlFor="rate-1"
          className="fas fa-star"
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
        ></label>
      </div>
      <div className="rating-text">
        {hoveredRating !== 0 ? ratingText(hoveredRating) : ratingText(rating)}
      </div>
    </div>
  );
};

export default ReviewRating;
