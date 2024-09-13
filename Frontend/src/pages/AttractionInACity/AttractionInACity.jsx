import React, { useState, useEffect } from "react";
import "./AttractionInACity.css";
import { Link, useParams } from "react-router-dom";
import {
  cities,
  attractions,
  subCategory,
  restaurants,
} from "../../assets/assets";
import { replaceUnderScoreWithWhiteSpace } from "../../functions/replaceUnderScoreWithWhiteSpace";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";
import ExpandableDescription from "../../components/ExpandableDescription/ExpandableDescription";
import Mapbox from "../../components/MapBox/Mapbox";
import RatingStars from "../../components/RatingStars/RatingStars";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxios } from "../../hooks/useAxios";
import { useAxiosFunction } from "../../hooks/useAxiosFunction";
const AttractionInACity = () => {
  const [attraction, setAttraction] = useState(null);
  const { cityName, attractionName } = useParams();
  const [openReportReviewModal, setOpenReportReviewModal] = useState(null);
  const [activeTab, setActiveTab] = useState("Reviews");
  const [
    attractionReviewsData,
    attractionReviewsDataError,
    attractionReviewsDataLoading,
    fetchAttractionReviews,
  ] = useAxiosFunction();
  const [attractionsData, attractionsDataError, attractionsDataLoading] =
    useAxios({
      axiosInstance: axiosInstance,
      url: `/cities/${replaceUnderScoreWithWhiteSpace(cityName)}/attractions`,
      method: "GET",
    });
  const [restaurantsData, restaurantsDataError, restaurantsDataLoading] =
    useAxios({
      axiosInstance: axiosInstance,
      url: `/cities/${replaceUnderScoreWithWhiteSpace(cityName)}/restaurants`,
      method: "GET",
    });

  console.log("restaurants fetched from api is", restaurantsData);
  console.log("attractions fetched from api is", attractionsData);
  console.log("attraction reviews data are ", attractionReviewsData);
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
  const findCurrentAttraction = () => {
    if (attractionsData.length <= 0) {
      console.log(`this city ${cityName} does not have any attractions`);
      return;
    }

    const currentAttraction = attractionsData.find(
      (attraction) =>
        attraction.name === replaceUnderScoreWithWhiteSpace(attractionName)
    );
    if (!currentAttraction) {
      console.log(
        `this currentAttraction ${attractionName} does not exist in this city ${cityName}`
      );
      return;
    }
    console.log("currentAttraction is", currentAttraction);
    return currentAttraction;
  };
  console.log("currentAttractionData is ", findCurrentAttraction());
  const findAttraction = () => {
    const allAttractionsInCurrentCity = findAllAttractionsInThisCity();
    if (
      !allAttractionsInCurrentCity ||
      allAttractionsInCurrentCity.length <= 0
    ) {
      console.log(`this city ${cityName} does not have any attractions`);
      return;
    }

    const currentAttraction = allAttractionsInCurrentCity?.find(
      (attraction) =>
        attraction.attractionName ===
        replaceUnderScoreWithWhiteSpace(attractionName)
    );
    if (!currentAttraction) {
      console.log(
        `this currentAttraction ${attractionName} does not exist in this city ${cityName}`
      );
      return;
    }
    console.log("currentAttraction is", currentAttraction);
    return currentAttraction;
  };
  const findRestaurantsInThisCity = () => {
    if (!cityName) return;
    const foundCity = cities.find(
      (city) => city.name === replaceUnderScoreWithWhiteSpace(cityName)
    );
    console.log("foundCity in restaurants is", foundCity);
    const allRestaurantsInThisCity = restaurants.filter(
      (restaurant) => restaurant.cityId === foundCity?.id
    );
    // if (allRestaurantsInThisCity.length === 0) {
    //   console.log("this city has no restaurants");
    //   return;
    // }
    console.log("all restaurants are", allRestaurantsInThisCity);
    return allRestaurantsInThisCity;
  };
  const allRestaurantsInThisCity = findRestaurantsInThisCity();
  const allAttractionsInThisCity = findAllAttractionsInThisCity();
  useEffect(() => {
    const currentAttraction = findCurrentAttraction();
    setAttraction(currentAttraction);
    console.log("currentAttraction inside useeffect is", currentAttraction);
  }, [cityName, attractionName, attractionsData]);
  useEffect(() => {
    if (attraction) {
      fetchAttractionReviews({
        axiosInstance: axiosInstance,
        url: `/attractions/${attraction.id}/attraction-reviews`,
        method: "GET",
      });
    }
  }, [attraction]);
  const findSubCategory = (attraction) => {
    const foundSubCategory = subCategory.find(
      (subCategory) => subCategory.id === attraction.subCategoryId
    );
    console.log("foundSubCategory is", foundSubCategory);
    return foundSubCategory;
  };
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }
  const categorizeReviews = (reviews) => ({
    excellent: reviews.filter((review) => review.rating >= 4.5),
    veryGood: reviews.filter(
      (review) => review.rating >= 4.0 && review.rating < 4.5
    ),
    average: reviews.filter(
      (review) => review.rating > 3.0 && review.rating < 4.0
    ),
    poor: reviews.filter((review) => review.rating === 3.0),
    terrible: reviews.filter((review) => review.rating < 3.0),
  });

  return (
    <div className="attraction-section">
      {attractionsDataError && "No attractions found"}
      {attractionsDataLoading && "Loading..."}
      {!attraction && (
        <h1>
          This {cityName} does not have this attraction {attractionName}
        </h1>
      )}
      {attraction && (
        <>
          <div className="attraction-header">
            <h1 className="attraction-title">{attraction.name}</h1>
            <div className="icons-container">
              <div className="icon-wrapper">
                <svg viewBox="0 0 24 24" width="20px" height="20px">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 .94l4.102 4.101-1.06 1.06-2.292-2.29V12.5h-1.5V3.81L8.959 6.103l-1.061-1.06L12 .938zM4.043 8.301C4.505 7.73 5.2 7.25 6.003 7.25H8v1.5H6.004c-.196 0-.503.134-.793.494-.28.347-.461.81-.461 1.256v7.956c0 1.17.72 1.794 1.254 1.794h11.992c.538 0 1.254-.628 1.254-1.794V10.5c0-.448-.18-.91-.46-1.257-.289-.359-.595-.493-.794-.493H16v-1.5h1.996c.806 0 1.501.48 1.963 1.052.47.585.791 1.372.791 2.198v7.956c0 1.638-1.072 3.294-2.754 3.294H6.004c-1.674 0-2.754-1.645-2.754-3.294V10.5c0-.826.322-1.614.793-2.198z"
                  ></path>
                </svg>
              </div>
              <div className="icon-wrapper">
                <svg viewBox="0 0 24 24" width="20px" height="20px">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.798 5.786A5.769 5.769 0 017.72 4.25c1.455 0 2.857.548 3.922 1.536l.005.005.341.322.332-.317a5.769 5.769 0 013.928-1.54c1.458 0 2.862.55 3.928 1.54l.004.004c1.093 1.032 1.599 2.324 1.569 3.662-.03 1.323-.578 2.643-1.5 3.785-.884 1.096-2.85 2.943-4.547 4.478a183.566 183.566 0 01-3.153 2.785l-.069.059-.489-.569.49.569-.486.416-.488-.412a101.98 101.98 0 01-7.75-7.288l-.021-.021-.02-.023c-1.725-2.115-2.203-5.32.08-7.453l.002-.002zm8.19 13.226a174.415 174.415 0 002.708-2.4c1.72-1.556 3.59-3.32 4.385-4.306.757-.939 1.148-1.948 1.168-2.877.02-.912-.313-1.795-1.097-2.536a4.269 4.269 0 00-2.904-1.138 4.269 4.269 0 00-2.903 1.136l-1.35 1.292-1.375-1.3a4.269 4.269 0 00-2.9-1.133 4.269 4.269 0 00-2.901 1.135c-1.507 1.408-1.353 3.659.042 5.385a100.45 100.45 0 007.127 6.742z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="attraction-contents">
            <div className="number-of-reviews-and-subcategory">
              <div className="number-of-reviews-container">
                <RatingStars
                  rating={attraction.rating}
                  width={88}
                  height={16}
                ></RatingStars>

                <span className="number-of-reviews">
                  {attraction.numberOfReviews.toLocaleString("en-US")} reviews
                </span>
              </div>
              <div className="attraction-subcategory">
                {attraction.subcategoryName}
              </div>
            </div>
            <div className="attraction-details-container">
              <div className="details-container">
                <div className="details-top">
                  <div className="details-top-title">About</div>
                  <div className="attraction-description">
                    <ExpandableDescription
                      text={attraction.description}
                      lineClamp={7}
                    ></ExpandableDescription>
                  </div>
                </div>
                <div className="details-bottom">
                  <div className="details-bottom-title">
                    Tours & experiences
                  </div>
                  <div className="details-bottom-description">
                    Explore different ways to experience this place
                  </div>
                  <button>See options</button>
                </div>
              </div>
              <div className="image-container">
                <img
                  src={attraction.imageUrl}
                  alt={`${attraction.name} image`}
                />
              </div>
            </div>
            <div className="area-container">
              <h2 className="area-title">The area</h2>
              <div className="area-contents">
                <div className="area">
                  {Object.keys(attraction.addressObj).length > 0 && (
                    <div className="attraction-address">
                      <span className="address">
                        {attraction.addressObj.address
                          ? `${attraction.addressObj.address} street `
                          : ""}
                        {attraction.addressObj.address &&
                          attraction.addressObj.ward &&
                          ", "}
                        {attraction.addressObj.ward
                          ? !isNaN(attraction.addressObj.ward)
                            ? `Ward ${attraction.addressObj.ward}`
                            : `${attraction.addressObj.ward} Ward`
                          : ""}
                        {attraction.addressObj.ward &&
                          attraction.addressObj.district &&
                          ", "}
                        {attraction.addressObj.district
                          ? !isNaN(attraction.addressObj.district)
                            ? `District ${attraction.addressObj.district}`
                            : `${attraction.addressObj.district} District`
                          : ""}
                        {attraction.addressObj.district &&
                          attraction.addressObj.city &&
                          ", "}
                        {attraction.addressObj.city &&
                          `${attraction.addressObj.city} City `}
                        {attraction.addressObj.postalCode &&
                          `${attraction.addressObj.postalCode} `}
                        {attraction.addressObj.country &&
                          `${attraction.addressObj.country}`}
                      </span>
                    </div>
                  )}
                  {attraction.websiteUrl && (
                    <React.Fragment>
                      <div
                        style={{
                          marginBottom: "16px",
                          fontSize: "16px",
                          fontWeight: "700",
                          color: "#000",
                        }}
                      >
                        Reach out directly
                      </div>
                      <div className="visit-website-container">
                        <a
                          href={attraction.websiteUrl}
                          className="visit-website-text"
                        >
                          Visit website
                          <svg viewBox="0 0 24 24" width="16px" height="16px">
                            <path d="M7.561 15.854l-1.415-1.415 8.293-8.293H7.854v-2h10v10h-2V7.561z"></path>
                          </svg>
                        </a>
                      </div>
                    </React.Fragment>
                  )}
                </div>
                <div className="nearby-restaurants">
                  <div className="nearby-title">Best nearby</div>
                  <div className="nearby-restaurants-title">Restaurants</div>
                  <div
                    style={{
                      marginBottom: "16px",
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#000",
                    }}
                  >{`${restaurantsData.length.toLocaleString(
                    "en-US"
                  )} within ${replaceUnderScoreWithWhiteSpace(cityName)}`}</div>
                  <div className="area-small-card-list">
                    {restaurantsDataError && "No restaurants found"}
                    {restaurantsDataLoading && "Loading..."}
                    {restaurantsData.length > 0 &&
                      restaurantsData.slice(0, 3).map((restaurant) => (
                        <div key={restaurant.id}>
                          <Link
                            to={`/cities/${cityName}/restaurants/${replaceWhiteSpaceWithUnderScore(
                              restaurant.name
                            )}`}
                          >
                            <div className="area-small-card">
                              <div className="area-small-card-image-container">
                                <img
                                  src={restaurant.imageUrl}
                                  alt={restaurant.name}
                                />
                              </div>
                              <div className="area-small-card-contents">
                                <div className="area-small-card-title">
                                  {restaurant.name}
                                </div>
                                <div className="card-rating-count">
                                  <RatingStars
                                    rating={restaurant.rating}
                                    width={68}
                                    height={12}
                                  ></RatingStars>

                                  <span>
                                    {restaurant.numberOfReviews.toLocaleString(
                                      "en-US"
                                    )}
                                  </span>
                                </div>
                                <span className="cuisines-list">
                                  Cuisines: &nbsp;
                                  {restaurant.cuisines.length > 0 &&
                                    restaurant.cuisines
                                      .slice(0, 3)
                                      .map((cuisine, index) => {
                                        return (
                                          <span
                                            key={index}
                                            style={{ fontSize: "14px" }}
                                          >
                                            {index > 0 && <span>, </span>}
                                            {cuisine.name}
                                          </span>
                                        );
                                      })}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>
                  <div className="see-all">
                    <Link
                      to={`/cities/${replaceWhiteSpaceWithUnderScore(
                        cityName
                      )}/restaurants`}
                    >
                      See all
                    </Link>
                  </div>
                </div>
                <div className="nearby-attractions">
                  <div className="nearby-attractions-title">Attractions</div>
                  <div
                    style={{
                      marginBottom: "16px",
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#000",
                    }}
                  >{`${attractionsData.length.toLocaleString(
                    "en-US"
                  )} within ${replaceUnderScoreWithWhiteSpace(cityName)}`}</div>
                  <div className="area-small-card-list">
                    {attractionsData.length > 0 &&
                      attractionsData
                        .filter((item) => item.id !== attraction.id)
                        .slice(0, 3)
                        .map((attraction) => (
                          <div key={attraction.id}>
                            <Link
                              to={`/cities/${cityName}/attractions/${replaceWhiteSpaceWithUnderScore(
                                attraction.name
                              )}`}
                            >
                              <div className="area-small-card">
                                <div className="area-small-card-image-container">
                                  <img
                                    src={attraction.imageUrl}
                                    alt={attraction.name}
                                  />
                                </div>
                                <div className="area-small-card-contents">
                                  <div className="area-small-card-title">
                                    {attraction.name}
                                  </div>
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
                                    {attraction.subcategoryName}
                                  </div>
                                  {/* <span className="cuisines-list">
                                    Cuisines: &nbsp;
                                    {restaurant.cuisines.length >= 3 &&
                                      restaurant.cuisines
                                        .slice(0, 3)
                                        .map((cuisine, index) => {
                                          return (
                                            <span key={index}>
                                              {index > 0 && <span>, </span>}
                                              {cuisine.name}
                                            </span>
                                          );
                                        })}
                                  </span> */}
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                  </div>
                  <div className="see-all">
                    <Link
                      to={`/cities/${replaceWhiteSpaceWithUnderScore(
                        cityName
                      )}/things-to-do`}
                    >
                      See all
                    </Link>
                  </div>
                </div>
                <div className="area-map">
                  <Mapbox zoom={8} stops={[attraction]}></Mapbox>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="review-section">
        <div className="review-section-header">
          <h2>Contribute</h2>
          <div className="write-review-upload-photo-btn-group">
            <Link
              to={`/attractions/${replaceWhiteSpaceWithUnderScore(
                attraction?.name
              )}/write_review`}
            >
              Write a review
            </Link>
            <a href="#">Upload a photo</a>
          </div>
        </div>
        <div className="review-and-question-answer-section">
          <div className="review-and-question-answer-section-header">
            <button
              onClick={() => setActiveTab("Reviews")}
              className={activeTab === "Reviews" ? "active" : ""}
            >
              Reviews
            </button>
            <button
              onClick={() => setActiveTab("Q&A")}
              className={activeTab === "Q&A" ? "active" : ""}
            >
              Q&A
            </button>
          </div>
          {activeTab === "Reviews" && (
            <div className="user-review-section">
              <div className="user-review-summary-section">
                <div className="user-review-summary-container">
                  <div className="user-review-summary-header">
                    <div className="user-review-summary-rating-value">
                      {attraction?.rating.toFixed(1)}
                    </div>
                    <div className="user-review-summary-number-of-reviews-container">
                      {attraction?.rating && (
                        <RatingStars
                          rating={attraction.rating}
                          width={88}
                          height={16}
                        ></RatingStars>
                      )}

                      <span className="number-of-reviews">
                        {attraction?.numberOfReviews.toLocaleString("en-US")}{" "}
                        {attraction?.numberOfReviews < 2 ? "review" : "reviews"}
                      </span>
                    </div>
                  </div>
                  <div className="user-review-summary-rating-box">
                    <div className="score-line">
                      <div className="rating-category">Excellent</div>
                      <div className="rating-score-bar">
                        <div
                          className="excellent"
                          style={{
                            width: `${
                              (categorizeReviews(attractionReviewsData)
                                .excellent.length /
                                attractionReviewsData.length) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="number-of-reviews">
                        {categorizeReviews(
                          attractionReviewsData
                        ).excellent.length.toLocaleString("en-US")}
                      </div>
                    </div>
                    <div className="score-line">
                      <div className="rating-category">Very good</div>
                      <div className="rating-score-bar">
                        <div
                          className="very-good"
                          style={{
                            width: `${
                              (categorizeReviews(attractionReviewsData).veryGood
                                .length /
                                attractionReviewsData.length) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="number-of-reviews">
                        {categorizeReviews(
                          attractionReviewsData
                        ).veryGood.length.toLocaleString("en-US")}
                      </div>
                    </div>
                    <div className="score-line">
                      <div className="rating-category">Average</div>
                      <div className="rating-score-bar">
                        <div
                          className="average"
                          style={{
                            width: `${
                              (categorizeReviews(attractionReviewsData).average
                                .length /
                                attractionReviewsData.length) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="number-of-reviews">
                        {categorizeReviews(
                          attractionReviewsData
                        ).average.length.toLocaleString("en-US")}
                      </div>
                    </div>
                    <div className="score-line">
                      <div className="rating-category">Poor</div>
                      <div className="rating-score-bar">
                        <div
                          className="poor"
                          style={{
                            width: `${
                              (categorizeReviews(attractionReviewsData).poor
                                .length /
                                attractionReviewsData.length) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="number-of-reviews">
                        {categorizeReviews(
                          attractionReviewsData
                        ).poor.length.toLocaleString("en-US")}
                      </div>
                    </div>
                    <div className="score-line">
                      <div className="rating-category">Terrible</div>
                      <div className="rating-score-bar">
                        <div
                          className="terrible"
                          style={{
                            width: `${
                              (categorizeReviews(attractionReviewsData).terrible
                                .length /
                                attractionReviewsData.length) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <div className="number-of-reviews">
                        {categorizeReviews(
                          attractionReviewsData
                        ).terrible.length.toLocaleString("en-US")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="user-review-filter-section">
                <div className="search-bar-container">
                  <div className="row">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder="Search reviews..." />
                  </div>
                </div>
              </div>
              {attractionReviewsData.length > 0 && (
                <div className="user-review-divider">
                  <hr />
                </div>
              )}

              <div className="user-review-list-section">
                {!attractionReviewsDataLoading &&
                  attractionReviewsData.length <= 0 && (
                    <div>No Reviews Found</div>
                  )}
                {attractionReviewsDataLoading && <div>Loading...</div>}
                {!attractionReviewsDataLoading &&
                  attractionReviewsData.length > 0 &&
                  attractionReviewsData.map((review, index) => (
                    <div className="user-review-card" key={review.id}>
                      {index !== 0 && <hr />}
                      <div className="user-info">
                        <div className="user-info-details-container">
                          <div className="user-info-image-container">
                            <img
                              src={review.user.imageUrl}
                              alt={`${review.user.name} image`}
                            />
                          </div>
                          <div className="user-info-details">
                            <div className="user-info-name">
                              {review.user.firstName}
                            </div>
                            <div className="user-info-country">
                              {`${review.user.city}, ${review.user.country}`}
                            </div>
                          </div>
                        </div>
                        <div className="icon-container">
                          <button className="like-button">
                            <svg viewBox="0 0 24 24" width="20px" height="20px">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M14.539 4.661l-.004.04a4.146 4.146 0 01-.003.04l-.006.072a.884.884 0 01-.016.116l-1.03 5.017h6.765a.267.267 0 01.264.301l-1.311 8.533v.002a.267.267 0 01-.267.227H7.708v-7.9l5.224-5.017 1.027-.963c.066-.054.134-.117.18-.161l.022-.02c.07-.066.132-.122.195-.172a.689.689 0 01.183-.115zm.692-1.49c.246.097.41.239.51.334.22.206.31.465.349.618.044.172.058.342.058.478v.038l-.004.038a10.513 10.513 0 00-.023.28 2.47 2.47 0 01-.043.293l-.635 3.095h4.802a1.867 1.867 0 011.849 2.13l-.002.009-1.312 8.538a1.87 1.87 0 01-1.862 1.588H6.108V10.427l5.725-5.5 1.081-1.012.03-.023.032-.029c.02-.017.038-.035.063-.058l.03-.028c.073-.068.175-.163.292-.256.218-.172.59-.425 1.068-.458.29-.02.556.01.802.108zM2.688 10.013a.8.8 0 01.8.8v10.13h-1.6v-10.13a.8.8 0 01.8-.8z"
                              ></path>
                            </svg>
                            <span>0</span>
                          </button>
                          <div className="report-review-container">
                            <button
                              className="report-review-button"
                              onClick={() =>
                                setOpenReportReviewModal((prev) => {
                                  return prev !== review.id ? review.id : null;
                                })
                              }
                            >
                              <svg
                                viewBox="0 0 24 24"
                                width="20px"
                                height="20px"
                              >
                                <path d="M5 14a2 2 0 100-4 2 2 0 000 4zM19 14a2 2 0 100-4 2 2 0 000 4zM12 14a2 2 0 100-4 2 2 0 000 4z"></path>
                              </svg>
                            </button>
                            <div
                              className={`report-review-modal ${
                                openReportReviewModal === review.id
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <div>Report this review</div>
                              <span className="top-arrow"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="user-rating">
                        {review.rating && (
                          <RatingStars
                            rating={review.rating}
                            width={88}
                            height={16}
                          ></RatingStars>
                        )}
                      </div>
                      <div className="user-review-title">
                        {review.reviewTitle}
                      </div>
                      <div className="user-review-description">
                        <ExpandableDescription
                          text={review.description}
                          lineClamp={7}
                        ></ExpandableDescription>
                      </div>
                      {/* <div className="review-of">
                        <a href="#">{`Review of: ${review.attractionName}`}</a>
                      </div> */}
                      <div className="review-written-date">
                        Written {formatDate(review.reviewDate)}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {activeTab === "Q&A" && <div></div>}
        </div>
      </div>
    </div>
  );
};

export default AttractionInACity;
