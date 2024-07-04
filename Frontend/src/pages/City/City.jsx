import React from "react";
import "./City.css";
import { useParams } from "react-router-dom";
const City = () => {
  const { cityName } = useParams();
  console.log("cityName is", cityName);
  return <div className="city">City {cityName}</div>;
};

export default City;
