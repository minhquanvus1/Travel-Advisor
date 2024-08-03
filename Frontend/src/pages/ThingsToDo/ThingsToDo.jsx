import React from "react";
import "./ThingsToDo.css";
import TravelDestinationsHeader from "../../components/TravelDestinationsHeader/TravelDestinationsHeader";
import TravelDestinationsService from "../../components/TravelDestinationsService/TravelDestinationsService";

const ThingsToDo = () => {
  return (
    <div className="travel-destinations-section">
      <TravelDestinationsHeader></TravelDestinationsHeader>
      <div className="travel-destinations">
        <TravelDestinationsService></TravelDestinationsService>
      </div>
    </div>
  );
};

export default ThingsToDo;
