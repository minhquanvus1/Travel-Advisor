import React, { useState, useEffect } from "react";
import "./City.css";
import { useParams } from "react-router-dom";
import { cities } from "../../assets/assets";
import ExpandableDescription from "../../components/ExpandableDescription/ExpandableDescription";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";
import { replaceUnderScoreWithWhiteSpace } from "../../functions/replaceUnderScoreWithWhiteSpace";
import TravelAdviceBanner from "../../components/TravelAdviceBanner/TravelAdviceBanner";
import EssentialSection from "../../components/EssentialSection/EssentialSection";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxios } from "../../hooks/useAxios";

const City = () => {
  const { cityName } = useParams();
  // const [city, setCity] = useState(null);
  const [currentSection, setCurrentSection] = useState("");
  console.log("cityName is", replaceUnderScoreWithWhiteSpace(cityName));

  const [city, error, loading] = useAxios({
    axiosInstance: axiosInstance,
    url: `/cities/search?name=${replaceUnderScoreWithWhiteSpace(cityName)}`,
    method: "GET",
  });
  console.log("cities in City component is ", city);
  // const findCityByName = () => {
  //   const foundCity = cities.find((city) => {
  //     console.log("city.name is", city.name);
  //     return replaceWhiteSpaceWithUnderScore(city.name) === cityName;
  //   });
  //   if (!foundCity) {
  //     console.log("No city found");
  //     return;
  //   }
  //   console.log("city in function is", foundCity);
  //   return foundCity;
  // };
  useEffect(() => {
    // const foundCity = findCityByName();
    setCurrentSection("");
  }, []);

  return (
    <div className="city">
      {error && "No city found"}
      {loading && "Loading..."}
      City {cityName}
      {!Array.isArray(city) && city && (
        <>
          <div className="city-header">
            <img src={city.imageUrl} alt="city header" />
          </div>
          <div className="description-container">
            <h2>{city.name}</h2>
            <ExpandableDescription
              text={city.description}
              lineClamp={3}
            ></ExpandableDescription>
          </div>

          {city.travelAdvice && <TravelAdviceBanner></TravelAdviceBanner>}
          <div className="essential-container">
            <div className="essential-title-container">
              <h2 className="essential-title">Essential {city.name}</h2>
              <div
                style={{ fontSize: "16px", fontWeight: "400", color: "#000" }}
              >
                Pick a category to filter your recs
              </div>
            </div>
            <div className="essential-details-container">
              <EssentialSection
                title={"Things to do"}
                currentSection={"things-to-do"}
              ></EssentialSection>
              <EssentialSection
                title={"Food & drink"}
                currentSection={"restaurants"}
              ></EssentialSection>
            </div>
          </div>
          <div className="city-cuisine-section">
            <h2 className="city-cuisine-section-title">
              Cuisine in {city.name}
            </h2>
            <div className="city-cuisine-list">
              {city.cuisines.length > 0 &&
                city.cuisines.map((dish, index) => {
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
          {city.travelAdvice && (
            <div className="travel-advice-section">
              <h2>{city.name} Travel Guide</h2>
              <h3 className="travel-advice-title">
                What is the best way to get there?
              </h3>
              {city.travelAdvice.gettingTheres.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <h4 className="travel-advice-subtitle">{item.mode}</h4>
                    <p className="travel-advice-description">{item.advice}</p>
                  </React.Fragment>
                );
              })}
              <h3 className="travel-advice-title">Do I need a Visa?</h3>
              <p className="travel-advice-description">
                {city.travelAdvice.visa}
              </p>
              <h3 className="travel-advice-title">
                When is the best time to visit?
              </h3>
              <p className="travel-advice-description">
                {city.travelAdvice.bestTimeToVisit}
              </p>
              <h3 className="travel-advice-title">Get around</h3>
              {city.travelAdvice.gettingArounds.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <h4 className="travel-advice-subtitle">{item.mode}</h4>
                    <p className="travel-advice-description">{item.advice}</p>
                  </React.Fragment>
                );
              })}
              <h3 className="travel-advice-title">On the ground</h3>
              {city.travelAdvice.onTheGrounds.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <h4 className="travel-advice-subtitle">{item.question}</h4>
                    <p className="travel-advice-description">{item.answer}</p>
                  </React.Fragment>
                );
              })}
              <h3 className="travel-advice-title">How much do I tip?</h3>
              <p className="travel-advice-description">
                {city.travelAdvice.tipping}
              </p>
              <h3 className="travel-advice-title">
                Are there local customs I should know?
              </h3>
              {city.travelAdvice.customs.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <h4 className="travel-advice-subtitle">{item.name}</h4>
                    <p className="travel-advice-description">{item.advice}</p>
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default City;
