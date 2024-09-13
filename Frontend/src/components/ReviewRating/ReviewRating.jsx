import React from "react";
import "./ReviewRating.css";

const ReviewRating = ({ rating, setRating }) => {
  const handleRatingChange = (e) => {
    const rating = parseInt(e.target.id.split("-")[1]);
    setRating(rating);
  };
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
        <label htmlFor="rate-5" className="fas fa-star"></label>
        <input
          type="radio"
          name="rate"
          id="rate-4"
          checked={rating === 4}
          onChange={handleRatingChange}
        />
        <label htmlFor="rate-4" className="fas fa-star"></label>
        <input
          type="radio"
          name="rate"
          id="rate-3"
          checked={rating === 3}
          onChange={handleRatingChange}
        />
        <label htmlFor="rate-3" className="fas fa-star"></label>
        <input
          type="radio"
          name="rate"
          id="rate-2"
          checked={rating === 2}
          onChange={handleRatingChange}
        />
        <label htmlFor="rate-2" className="fas fa-star"></label>
        <input
          type="radio"
          name="rate"
          id="rate-1"
          checked={rating === 1}
          onChange={handleRatingChange}
        />
        <label htmlFor="rate-1" className="fas fa-star"></label>
      </div>
    </div>
  );
};

export default ReviewRating;
