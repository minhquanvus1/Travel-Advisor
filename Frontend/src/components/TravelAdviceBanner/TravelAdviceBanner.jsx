import React from "react";
import "./TravelAdviceBanner.css";

const TravelAdviceBanner = () => {
  return (
    <div className="travel-advice-banner">
      <h2 className="travel-advice-banner-title">Travel Advice</h2>
      <div className="travel-advice-boxes">
        <a href="#" className="travel-advice-box">
          <img
            src="https://static.tacdn.com/img2/brand/feed/fact_sheet_best_time_to_visit.svg"
            width="88"
            height="80"
            alt="best time to visit image"
          />
          <div className="travel-advice-box-title">Best time to visit</div>
        </a>
        <a href="#" className="travel-advice-box">
          <img
            src="https://static.tacdn.com/img2/brand/feed/fact_sheet_getting_around.svg"
            width="88"
            height="80"
            alt="getting around image"
          />
          <div className="travel-advice-box-title">Getting around</div>
        </a>
        <a href="#" className="travel-advice-box">
          <img
            src="https://static.tacdn.com/img2/brand/feed/fact_sheet_local_customs.svg"
            width="88"
            height="80"
            alt="local customs image"
          />
          <div className="travel-advice-box-title">Local customs</div>
        </a>
        <a href="#" className="travel-advice-box">
          <img
            src="https://static.tacdn.com/img2/brand/feed/fact_sheet_tips.svg"
            width="88"
            height="80"
            alt="tips from the pros image"
          />
          <div className="travel-advice-box-title">Tips from the pros</div>
        </a>
      </div>
    </div>
  );
};

export default TravelAdviceBanner;
