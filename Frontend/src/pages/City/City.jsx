import React, { useState, useEffect } from "react";
import "./City.css";
import { useParams } from "react-router-dom";
import { cities } from "../../assets/assets";
import ExpandableDescription from "../../components/ExpandableDescription/ExpandableDescription";

const City = () => {
  const { cityName } = useParams();
  const [city, setCity] = useState(null);
  console.log("cityName is", cityName);
  const findCityByName = () => {
    const foundCity = cities.find((city) => {
      console.log("city.name is", city.name);
      return city.name === cityName;
    });
    if (!foundCity) {
      console.log("No city found");
      return;
    }
    console.log("city in function is", foundCity);
    setCity(foundCity);
    return foundCity;
  };
  useEffect(() => {
    findCityByName();
  }, []);
  return (
    <div className="city">
      {!city && "No city found"}
      City {cityName}
      {city && (
        <>
          <div className="city-header">
            <img src={city && city.imageUrl} alt="city header" />
          </div>
          <ExpandableDescription
            title={city.name}
            text={city.description}
          ></ExpandableDescription>
          <div className="city-cuisine-section">
            <h2 className="city-cuisine-section-title">
              Cuisine in {city.name}
            </h2>
            <div className="city-cuisine-list">
              {city.cuisine.map((dish, index) => {
                return (
                  <div key={dish.id} className="cuisine-card">
                    <img src={dish.imageUrl} alt={dish.name} />
                    <div className="dish-details">
                      <h2>{dish.name}</h2>
                      <p>{dish.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default City;
