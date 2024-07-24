import React from "react";
import "./TravelDestinationBigCard.css";

const TravelDestinationBigCard = () => {
  return (
    <div className="travel-destination-big-card">
      <div className="travel-destination-big-card-image-container">
        <img
          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/11/d4/2a/bitexco-financial-tower.jpg?w=500&h=400&s=1"
          alt=""
        />
      </div>
      <div className="travel-destination-big-card-contents">
        <div className="travel-destination-big-card-header-container">
          <div className="travel-destination-big-card-header">
            <div className="header-title">1. Bitexco Financial Tower</div>
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
              <span className="number-of-reviews">6,260 reviews</span>
            </div>
          </div>
          <div className="travel-destination-big-card-category">Landmarks</div>
        </div>
        <div className="travel-destination-big-card-description-container">
          <hr />
          <div className="travel-destination-big-card-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            voluptas et voluptatum distinctio exercitationem sit, quisquam cum
            repudiandae eius in. Repellat reprehenderit impedit corporis ipsa
            quibusdam cupiditate praesentium consequuntur voluptatem.
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
