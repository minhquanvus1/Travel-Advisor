import React from "react";
import "./Tours.css";
import ToursAdvantageBanner from "../../components/ToursAdvantageBanner/ToursAdvantageBanner";

const Tours = () => {
  return (
    <div className="tours-section">
      <div className="tours">
        <ToursAdvantageBanner></ToursAdvantageBanner>
      </div>
    </div>
  );
};

export default Tours;
