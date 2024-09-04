import React, { useContext, useEffect } from "react";
import "./ThingsToDo.css";
import { CityContext } from "../../context/CityContextProvider";
import TravelDestinationsHeader from "../../components/TravelDestinationsHeader/TravelDestinationsHeader";
import TravelDestinationsService from "../../components/TravelDestinationsService/TravelDestinationsService";
// import { cities, subCategory } from "../../assets/assets";
import { Link } from "react-router-dom";
import CityCard from "../../components/CityCard/CityCard";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";
import RatingStars from "../../components/RatingStars/RatingStars";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxios } from "../../hooks/useAxios";

const ThingsToDo = () => {
  const { cities, setCityState } = useContext(CityContext);
  useEffect(() => {
    setCityState("");
  }, []);

  const [attractions, error, loading] = useAxios({
    axiosInstance: axiosInstance,
    url: "/attractions",
    method: "GET",
  });

  // const findSubCategory = (attraction) => {
  //   const foundSubCategory = subCategory.find(
  //     (subCategory) => subCategory.id === attraction.subCategoryId
  //   );
  //   console.log("foundSubCategory is", foundSubCategory);
  //   return foundSubCategory;
  // };
  // const findCityById = (cityId) => {
  //   const foundCity = cities.find((city) => city.id === cityId);
  //   return foundCity;
  // };

  return (
    <div className="things-to-do-section">
      <TravelDestinationsHeader></TravelDestinationsHeader>
      <div className="things-to-do">
        <TravelDestinationsService></TravelDestinationsService>
        <div className="top-destinations-section">
          <div className="top-destinations-container">
            <div className="title">Top destinations in Vietnam</div>
            <div className="restaurants-in-top-cities-list">
              {cities.length <= 0 && "No cities found to find Top Destinations"}
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
              {error && "No attractions found"}
              {loading && "Loading..."}
              {attractions.length > 0 &&
                attractions.slice(0, 4).map((attraction, index) => {
                  return (
                    <Link
                      to={`/cities/${replaceWhiteSpaceWithUnderScore(
                        attraction.cityName
                      )}/attractions/${replaceWhiteSpaceWithUnderScore(
                        attraction.name
                      )}`}
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
                              {attraction.numberOfReviews.toLocaleString(
                                "en-US"
                              )}
                            </span>
                          </div>
                          <div
                            className="attraction-subcategory"
                            style={{ fontSize: "14px" }}
                          >
                            {attraction.subCategoryName}
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
