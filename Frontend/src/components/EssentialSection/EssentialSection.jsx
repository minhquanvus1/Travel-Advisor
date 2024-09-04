import React from "react";
import "./EssentialSection.css";
import { Link, useParams } from "react-router-dom";
import RatingStars from "../RatingStars/RatingStars";
import { replaceUnderScoreWithWhiteSpace } from "../../functions/replaceUnderScoreWithWhiteSpace";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxios } from "../../hooks/useAxios";

const EssentialSection = ({ title, currentSection }) => {
  const { cityName } = useParams();

  const apiUrl =
    currentSection === "things-to-do"
      ? `/cities/${replaceUnderScoreWithWhiteSpace(cityName)}/attractions`
      : currentSection === "restaurants"
      ? `/cities/${replaceUnderScoreWithWhiteSpace(cityName)}/restaurants`
      : null;

  if (!apiUrl) {
    console.error("Invalid currentSection is ", currentSection);
    return <div></div>;
  }
  const [data, error, loading] = useAxios({
    axiosInstance: axiosInstance,
    url: apiUrl,
    method: "GET",
  });

  const attractions = currentSection === "things-to-do" ? data : [];
  const restaurants = currentSection === "restaurants" ? data : [];
  // const findAllAttractionsInThisCity = () => {
  //   const currentCity = cities.find(
  //     (city) => city.name === replaceUnderScoreWithWhiteSpace(cityName)
  //   );
  //   if (!currentCity) {
  //     console.log(`This city ${cityName} does not exist`);
  //     return;
  //   }
  //   const allAttractionsInCurrentCity = attractions.filter(
  //     (attraction) => attraction.cityId === currentCity.id
  //   );
  //   return allAttractionsInCurrentCity;
  // };
  // const findRestaurantsInThisCity = () => {
  //   if (!cityName) return;
  //   const foundCity = cities.find(
  //     (city) => city.name === replaceUnderScoreWithWhiteSpace(cityName)
  //   );
  //   console.log("foundCity in restaurants is", foundCity);
  //   const allRestaurantsInThisCity = restaurants.filter(
  //     (restaurant) => restaurant.cityId === foundCity.id
  //   );
  //   // if (allRestaurantsInThisCity.length === 0) {
  //   //   console.log("this city has no restaurants");
  //   //   return;
  //   // }
  //   console.log("all restaurants are", allRestaurantsInThisCity);
  //   return allRestaurantsInThisCity;
  // };
  // const allRestaurantsInThisCity =
  //   currentSection === "restaurants" && findRestaurantsInThisCity();
  // const allAttractionsInThisCity =
  //   currentSection === "things-to-do" && findAllAttractionsInThisCity();
  // console.log("allAttractionsInThisCity are", allAttractionsInThisCity);
  // console.log("allRestaurantsInThisCity are", allRestaurantsInThisCity);
  // const findSubCategory = (attraction) => {
  //   const foundSubCategory = subCategory.find(
  //     (subCategory) => subCategory.id === attraction.subCategoryId
  //   );
  //   console.log("foundSubCategory is", foundSubCategory);
  //   return foundSubCategory;
  // };
  return (
    <div className="essential-section">
      {loading && "Loading..."}
      {error && "No data found"}
      <div className="essential-section-title-container">
        <h3 className="essential-section-title">{title}</h3>
        <Link to={`/cities/${cityName}/${currentSection}`}>See all</Link>
      </div>
      <div className="essential-items-list">
        {currentSection === "things-to-do" &&
          attractions.length > 0 &&
          attractions.slice(0, 6).map((attraction, index) => (
            <Link
              to={`/cities/${replaceWhiteSpaceWithUnderScore(
                cityName
              )}/attractions/${replaceWhiteSpaceWithUnderScore(
                attraction.name
              )}`}
              className="city-link"
              key={attraction.id}
            >
              <div className="small-card">
                <div className="image-container">
                  <img
                    src={attraction.imageUrl}
                    alt={`${attraction.name} image`}
                  />
                </div>
                <div className="card-contents">
                  <div className="card-title">{attraction.name}</div>
                  <div className="card-rating-count">
                    <RatingStars
                      rating={attraction.rating}
                      width={68}
                      height={12}
                    ></RatingStars>
                    <span>
                      {attraction.numberOfReviews.toLocaleString("en-US")}
                    </span>
                  </div>
                  <div
                    className="attraction-subcategory"
                    style={{ fontSize: "14px" }}
                  >
                    {attraction.subcategoryName}
                  </div>
                </div>
              </div>
            </Link>
          ))}

        {currentSection === "restaurants" &&
          restaurants.length > 0 &&
          restaurants.slice(0, 6).map((restaurant, index) => (
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
                    alt={`${restaurant.name} image`}
                  />
                </div>
                <div className="card-contents">
                  <div className="card-title">{restaurant.name}</div>
                  <div className="card-rating-count">
                    <RatingStars
                      rating={restaurant.rating}
                      width={68}
                      height={12}
                    ></RatingStars>
                    <span>
                      {restaurant.numberOfReviews.toLocaleString("en-US")}
                    </span>
                  </div>
                  <span className="cuisines-list">
                    Cuisines: &nbsp;
                    {restaurant.cuisines.length > 0 &&
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
