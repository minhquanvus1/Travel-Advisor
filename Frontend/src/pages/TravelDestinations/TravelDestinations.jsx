import React from "react";
import "./TravelDestinations.css";
import TravelDestinationsHeader from "../../components/TravelDestinationsHeader/TravelDestinationsHeader";
import TravelDestinationsService from "../../components/TravelDestinationsService/TravelDestinationsService";

const TravelDestinations = () => {
  return (
    <div className="travel-destinations-section">
      <TravelDestinationsHeader></TravelDestinationsHeader>
      <div className="travel-destinations">
        <TravelDestinationsService></TravelDestinationsService>
      </div>
    </div>
  );
};

export default TravelDestinations;
