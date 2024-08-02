import React from "react";
import "./EssentialSection.css";
import { Link, useParams } from "react-router-dom";
import {
  cities,
  attractions,
  restaurants,
  subCategory,
} from "../../assets/assets";
import { replaceUnderScoreWithWhiteSpace } from "../../functions/replaceUnderScoreWithWhiteSpace";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";

const EssentialSection = ({ title, currentSection }) => {
  const { cityName } = useParams();
  const findAllAttractionsInThisCity = () => {
    const currentCity = cities.find(
      (city) => city.name === replaceUnderScoreWithWhiteSpace(cityName)
    );
    if (!currentCity) {
      console.log(`This city ${cityName} does not exist`);
      return;
    }
    const allAttractionsInCurrentCity = attractions.filter(
      (attraction) => attraction.cityId === currentCity.id
    );
    return allAttractionsInCurrentCity;
  };
  const findRestaurantsInThisCity = () => {
    if (!cityName) return;
    const foundCity = cities.find(
      (city) => city.name === replaceUnderScoreWithWhiteSpace(cityName)
    );
    console.log("foundCity in restaurants is", foundCity);
    const allRestaurantsInThisCity = restaurants.filter(
      (restaurant) => restaurant.cityId === foundCity.id
    );
    // if (allRestaurantsInThisCity.length === 0) {
    //   console.log("this city has no restaurants");
    //   return;
    // }
    console.log("all restaurants are", allRestaurantsInThisCity);
    return allRestaurantsInThisCity;
  };
  const allRestaurantsInThisCity =
    currentSection === "restaurants" && findRestaurantsInThisCity();
  const allAttractionsInThisCity =
    currentSection === "things-to-do" && findAllAttractionsInThisCity();
  console.log("allAttractionsInThisCity are", allAttractionsInThisCity);
  console.log("allRestaurantsInThisCity are", allRestaurantsInThisCity);
  const findSubCategory = (attraction) => {
    const foundSubCategory = subCategory.find(
      (subCategory) => subCategory.id === attraction.subCategoryId
    );
    console.log("foundSubCategory is", foundSubCategory);
    return foundSubCategory;
  };
  return (
    <div className="essential-section">
      <div className="essential-section-title-container">
        <h3 className="essential-section-title">{title}</h3>
        <Link to={`/cities/${cityName}/${currentSection}`}>See all</Link>
      </div>
      <div className="essential-items-list">
        {currentSection === "things-to-do" &&
          allAttractionsInThisCity?.length > 0 &&
          allAttractionsInThisCity.slice(0, 6).map((attraction, index) => (
            <Link
              to={`/cities/${replaceWhiteSpaceWithUnderScore(
                cityName
              )}/attractions/${replaceWhiteSpaceWithUnderScore(
                attraction.attractionName
              )}`}
              className="city-link"
              key={attraction.id}
            >
              <div className="small-card">
                <div className="image-container">
                  <img
                    src={attraction.imageUrl}
                    alt={`${attraction.attractionName} image`}
                  />
                </div>
                <div className="card-contents">
                  <div className="card-title">{attraction.attractionName}</div>
                  <div className="card-rating-count">
                    <svg
                      viewBox="0 0 128 24"
                      width="68"
                      height="12"
                      aria-labelledby=":lithium-Rlokd979qilt5vlq:"
                    >
                      <title id=":lithium-Rlokd979qilt5vlq:"></title>
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
                        d="M 12 0C5.389 0 0 5.389 0 12c0 6.62 5.389 12 12 12 6.62 0 12-5.379 12-12S18.621 0 12 0zm0 2a9.984 9.984 0 0110 10 9.976 9.976 0 01-10 10z"
                        transform="translate(104 0)"
                      ></path>
                    </svg>
                    <span>
                      {attraction.numberOfReviews.toLocaleString("en-US")}
                    </span>
                  </div>
                  <div
                    className="attraction-subcategory"
                    style={{ fontSize: "14px" }}
                  >
                    {findSubCategory(attraction).subCategoryName}
                  </div>
                </div>
              </div>
            </Link>
          ))}

        {currentSection === "restaurants" &&
          allRestaurantsInThisCity.length > 0 &&
          allRestaurantsInThisCity.slice(0, 6).map((restaurant, index) => (
            <Link
              to={`/cities/${replaceWhiteSpaceWithUnderScore(
                cityName
              )}/restaurants/${replaceWhiteSpaceWithUnderScore(
                restaurant.name
              )}`}
              className="city-link"
              key={restaurant.id}
            >
              <div className="small-card">
                <div className="image-container">
                  <img
                    src={restaurant.imageUrl}
                    alt={`${restaurant.attractionName} image`}
                  />
                </div>
                <div className="card-contents">
                  <div className="card-title">{restaurant.name}</div>
                  <div className="card-rating-count">
                    <svg
                      viewBox="0 0 128 24"
                      width="68"
                      height="12"
                      aria-labelledby=":lithium-Rlokd979qilt5vlq:"
                    >
                      <title id=":lithium-Rlokd979qilt5vlq:"></title>
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
                        d="M 12 0C5.389 0 0 5.389 0 12c0 6.62 5.389 12 12 12 6.62 0 12-5.379 12-12S18.621 0 12 0zm0 2a9.984 9.984 0 0110 10 9.976 9.976 0 01-10 10z"
                        transform="translate(104 0)"
                      ></path>
                    </svg>
                    <span>
                      {restaurant.numberOfReviews.toLocaleString("en-US")}
                    </span>
                  </div>
                  <span className="cuisines-list">
                    Cuisines: &nbsp;
                    {restaurant.cuisines.length >= 3 &&
                      restaurant.cuisines.slice(0, 3).map((cuisine, index) => {
                        return (
                          <span key={index} style={{ fontSize: "14px" }}>
                            {index > 0 && <span>, </span>}
                            {cuisine.name}
                          </span>
                        );
                      })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default EssentialSection;
