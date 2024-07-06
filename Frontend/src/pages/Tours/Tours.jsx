import React from "react";
import "./Tours.css";
import ToursAdvantageBanner from "../../components/ToursAdvantageBanner/ToursAdvantageBanner";
import ToursHeader from "../../components/ToursHeader/ToursHeader";

const Tours = () => {
  return (
    <div className="tours-section">
      <ToursHeader></ToursHeader>
      <div className="tours">
        <ToursAdvantageBanner></ToursAdvantageBanner>
      </div>
    </div>
  );
};

export default Tours;
