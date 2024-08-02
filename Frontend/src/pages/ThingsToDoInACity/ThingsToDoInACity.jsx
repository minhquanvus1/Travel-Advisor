import React, { useContext, useRef, useEffect } from "react";
import "./ThingsToDoInACity.css";
import ThingsToDoInACityHeader from "../../components/ThingsToDoInACityHeader/ThingsToDoInACityHeader";
import { Link, useParams } from "react-router-dom";
import TravelDestinationBigCard from "../../components/TravelDestinationBigCard/TravelDestinationBigCard";
import { CityContext } from "../../context/CityContextProvider";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";
import {
  cities,
  subCategory,
  attractions,
  tours,
  category,
} from "../../assets/assets";

const ThingsToDoInACity = () => {
  const { cityState } = useContext(CityContext);
  const { cityName } = useParams();
  const tourDisplayListRef = useRef();
  const findAttractionsInThisCity = () => {
    if (!cityState) return;
    const foundCity = cities.find((city) => city.name === cityState);
    console.log("foundCity in thingstodoinacity is", foundCity);
    const allAttractionsInThisCity = attractions.filter(
      (attraction) => attraction.cityId === foundCity.id
    );
    if (allAttractionsInThisCity.length === 0) {
      console.log("this city has no attractions");
      return;
    }
    console.log("all attractions are", allAttractionsInThisCity);
    return allAttractionsInThisCity;
  };
  const allAttractionsInThisCity = findAttractionsInThisCity();
  const findAllToursInThisCity = () => {
    if (!cityState) return;
    const foundCity = cities.find((city) => city.name === cityState);
    const allToursInThisCity = tours.filter(
      (tour) => tour.cityId === foundCity.id
    );
    // if (allToursInThisCity.length === 0) {
    //   console.log("this city has no tours");
    //   return;
    // }
    console.log("all tours are", allToursInThisCity);
    return allToursInThisCity;
  };
  const findTourSubCategory = () => {
    const tourCategory = category.find(
      (category) => category.categoryName === "Tours"
    );
    const tourSubCategoryList = subCategory.filter(
      (item) => item.categoryId === tourCategory.id
    );
    console.log("tourSubCategoryList is", tourSubCategoryList);
    return tourSubCategoryList;
  };
  // const showNext = () => {
  //   if (tourDisplayListRef.current) {
  //     tourDisplayListRef.current.scrollBy({
  //       left: 300, // Adjust this value as needed
  //       behavior: "smooth",
  //     });
  //     updateArrows();
  //   }
  // };

  // const updateArrows = () => {
  //   const maxScrollLeft =
  //     tourDisplayListRef.current.scrollWidth -
  //     tourDisplayListRef.current.clientWidth;
  //   document.querySelector(".left-arrow").style.display =
  //     tourDisplayListRef.current.scrollLeft > 0 ? "block" : "none";
  //   document.querySelector(".right-arrow").style.display =
  //     tourDisplayListRef.current.scrollLeft < maxScrollLeft ? "block" : "none";
  // };

  // useEffect(() => {
  //   updateArrows();
  //   tourDisplayListRef.current.addEventListener("scroll", updateArrows);
  //   return () => {
  //     tourDisplayListRef.current.removeEventListener("scroll", updateArrows);
  //   };
  // }, []);
  return (
    <div className="things-to-do-in-a-city-section">
      <div className="things-to-do-in-a-city">
        <ThingsToDoInACityHeader></ThingsToDoInACityHeader>
        <hr />
        <div className="top-attractions-section">
          <div className="top-attractions-title-container">
            <h2 className="top-attractions-title">
              Top Attractions in Ho Chi Minh City
            </h2>
            <Link to="/" className="attractions-link">
              See all
            </Link>
          </div>
          <div className="top-attractions-list">
            {!allAttractionsInThisCity &&
              `City ${cityState} has no attractions`}
            {allAttractionsInThisCity &&
              allAttractionsInThisCity.map((attraction, index) => {
                return (
                  <TravelDestinationBigCard
                    key={attraction.id}
                    index={index}
                    attraction={attraction}
                  ></TravelDestinationBigCard>
                );
              })}
          </div>
          <Link to="/" className="attractions-link">
            See all
          </Link>
        </div>
        <hr />
        <ul className="tour-display-section">
          {findTourSubCategory().map((subCategory) => {
            const filteredTours = findAllToursInThisCity().filter(
              (tour) => tour.subCategoryId === subCategory.id
            );
            console.log("filteredTours are", filteredTours);
            return (
              <li key={subCategory.id}>
                <div>
                  <div className="tour-display-container">
                    <div className="tour-display-title-container">
                      <div className="tour-display-title">
                        {subCategory.subCategoryName}
                      </div>
                      <Link
                        to={`/cities/${cityName}/tours/${replaceWhiteSpaceWithUnderScore(
                          subCategory.subCategoryName
                        )}`}
                      >
                        See all
                      </Link>
                    </div>
                    <div className="tour-display-list-slider">
                      {/* <button className="left-arrow" onClick={showNext}>
                        <svg viewBox="0 0 24 24" width="24px" height="24px">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.736 20.792l-8.58-8.581 8.58-8.58 1.06 1.06-6.77 6.77h16.08v1.5H5.026l6.77 6.77-1.06 1.06z"
                          ></path>
                        </svg>
                      </button> */}
                      <div
                        className="tour-display-list"
                        ref={tourDisplayListRef}
                      >
                        {filteredTours.map((tour) => (
                          <Link
                            to={`/cities/${replaceWhiteSpaceWithUnderScore(
                              cityName
                            )}/tours/${replaceWhiteSpaceWithUnderScore(
                              tour.tourName
                            )}`}
                            className="city-link"
                            key={tour.id}
                            // style={{ maxWidth: "30%" }}
                          >
                            <div className="small-card">
                              <div className="image-container">
                                <img
                                  src={tour.imageObject.primaryImage.imageUrl}
                                  alt={`${tour.tourName} image`}
                                />
                              </div>
                              <div className="card-contents">
                                <div className="card-title">
                                  {tour.tourName}
                                </div>
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
                                    {tour.numberOfReviews.toLocaleString(
                                      "en-US"
                                    )}
                                  </span>
                                </div>
                                <div
                                  className="attraction-subcategory"
                                  style={{ fontSize: "14px" }}
                                >
                                  {subCategory.subCategoryName}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      {/* <button className="right-arrow" onClick={showNext}>
                        <svg viewBox="0 0 24 24" width="24px" height="24px">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.631 3.632l8.578 8.577-8.58 8.58-1.062-1.06 6.77-6.77-16.075.004v-1.5l16.076-.004-6.767-6.767 1.06-1.06z"
                          ></path>
                        </svg>
                      </button> */}
                    </div>
                  </div>
                </div>
                <hr />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ThingsToDoInACity;
