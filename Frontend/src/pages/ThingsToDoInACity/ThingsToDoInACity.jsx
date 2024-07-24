import React from "react";
import "./ThingsToDoInACity.css";
import ThingsToDoInACityHeader from "../../components/ThingsToDoInACityHeader/ThingsToDoInACityHeader";
import { Link } from "react-router-dom";
import TravelDestinationBigCard from "../../components/TravelDestinationBigCard/TravelDestinationBigCard";

const ThingsToDoInACity = () => {
  return (
    <div className="things-to-do-in-a-city-section">
      <div className="things-to-do-in-a-city">
        <ThingsToDoInACityHeader></ThingsToDoInACityHeader>
        <hr />
        <div className="top-attractions-section">
          <div className="top-attractions-title-container">
            <h2 className="top-attractions-title">
              Top Attractions in Ho Chi Minh City
            </h2>
            <Link to="/" className="attractions-link">
              See all
            </Link>
          </div>
          <div className="top-attractions-list">
            <TravelDestinationBigCard></TravelDestinationBigCard>
            <TravelDestinationBigCard></TravelDestinationBigCard>
            <TravelDestinationBigCard></TravelDestinationBigCard>
            <TravelDestinationBigCard></TravelDestinationBigCard>
            <TravelDestinationBigCard></TravelDestinationBigCard>
            <TravelDestinationBigCard></TravelDestinationBigCard>
            <TravelDestinationBigCard></TravelDestinationBigCard>
            <TravelDestinationBigCard></TravelDestinationBigCard>
            <TravelDestinationBigCard></TravelDestinationBigCard>
            <TravelDestinationBigCard></TravelDestinationBigCard>
          </div>
          <Link to="/" className="attractions-link">
            See all
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThingsToDoInACity;
