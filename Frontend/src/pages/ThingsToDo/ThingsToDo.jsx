import React, { useContext, useEffect } from "react";
import "./ThingsToDo.css";
import { CityContext } from "../../context/CityContextProvider";
import TravelDestinationsHeader from "../../components/TravelDestinationsHeader/TravelDestinationsHeader";
import TravelDestinationsService from "../../components/TravelDestinationsService/TravelDestinationsService";
import { cities, attractions, subCategory } from "../../assets/assets";
import { Link } from "react-router-dom";
import CityCard from "../../components/CityCard/CityCard";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";
import RatingStars from "../../components/RatingStars/RatingStars";

const ThingsToDo = () => {
  const { setCityState } = useContext(CityContext);
  useEffect(() => {
    setCityState("");
  }, []);
  const findSubCategory = (attraction) => {
    const foundSubCategory = subCategory.find(
      (subCategory) => subCategory.id === attraction.subCategoryId
    );
    console.log("foundSubCategory is", foundSubCategory);
    return foundSubCategory;
  };
  const findCityById = (cityId) => {
    const foundCity = cities.find((city) => city.id === cityId);
    return foundCity;
  };

  return (
    <div className="things-to-do-section">
      <TravelDestinationsHeader></TravelDestinationsHeader>
      <div className="things-to-do">
        <TravelDestinationsService></TravelDestinationsService>
        <div className="top-destinations-section">
          <div className="top-destinations-container">
            <div className="title">Top destinations in Vietnam</div>
            <div className="restaurants-in-top-cities-list">
              {cities.length > 0 &&
                cities.slice(0, 4).map((city, index) => {
                  return (
                    <Link
                      to={`/cities/${replaceWhiteSpaceWithUnderScore(
                        city.name
                      )}/things-to-do`}
                      key={city.id}
                    >
                      <CityCard city={city}></CityCard>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="top-destinations-section">
          <div className="top-destinations-container">
            <div className="title">Top attractions in Vietnam</div>
            <div className="restaurants-in-top-cities-list">
              {attractions.length > 0 &&
                attractions.slice(0, 4).map((attraction, index) => {
                  const foundCity = findCityById(attraction.cityId);
                  return (
                    <Link
                      to={`/cities/${replaceWhiteSpaceWithUnderScore(
                        foundCity?.name
                      )}/attractions/${replaceWhiteSpaceWithUnderScore(
                        attraction.attractionName
                      )}`}
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
                          <div className="card-title">
                            {attraction.attractionName}
                          </div>
                          <div className="card-rating-count">
                            {/* <svg
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
                            </svg> */}
                            <RatingStars
                              rating={attraction.rating}
                              width={68}
                              height={12}
                            ></RatingStars>

                            <span>
                              {attraction.numberOfReviews.toLocaleString(
                                "en-US"
                              )}
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
                  );
                })}
            </div>
          </div>
        </div>
        <div className="recommendation-info-section">
          <div className="title">Top things to do and attractions near me</div>
          <div className="description">
            Explore the best things to do around the world on Travel Advisor to
            get recommendations and read reviews from those who have been there
            before. From family-friendly activities and adventure excursions to
            city tours, museums and iconic attractions, discover amazing
            experiences near and far to start planning your next trip.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThingsToDo;
