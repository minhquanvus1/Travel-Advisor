import React, { useContext, useRef, useEffect, useState } from "react";
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
  users,
  attractionReviews,
} from "../../assets/assets";
import { replaceUnderScoreWithWhiteSpace } from "../../functions/replaceUnderScoreWithWhiteSpace";
import ExpandableDescription from "../../components/ExpandableDescription/ExpandableDescription";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RatingStars from "../../components/RatingStars/RatingStars";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxios } from "../../hooks/useAxios";
import { useAxiosFunction } from "../../hooks/useAxiosFunction";

function SampleNextArrow(props) {
  const { currentSlide, slideCount, slidesToShow, className, onClick } = props;
  // const isLastSlide = currentSlide >= slideCount / slidesToShow - 1;
  const maxSlides = Math.ceil(slideCount / slidesToShow) * slidesToShow;
  const isLastSlide = currentSlide >= maxSlides - slidesToShow;
  console.log("currentSlide is", currentSlide);
  console.log("slideCount are", slideCount);
  console.log("isLastSlide is", isLastSlide);
  console.log("slidesToShow are", slidesToShow);
  return (
    <>
      {!isLastSlide ? (
        <button className={`${className} right-arrow`} onClick={onClick}>
          <svg viewBox="0 0 24 24" width="24px" height="24px">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.631 3.632l8.578 8.577-8.58 8.58-1.062-1.06 6.77-6.77-16.075.004v-1.5l16.076-.004-6.767-6.767 1.06-1.06z"
            ></path>
          </svg>
        </button>
      ) : null}
    </>
  );
}

function SamplePrevArrow(props) {
  const { currentSlide, className, onClick } = props;
  return (
    <>
      {currentSlide > 0 ? (
        <button className={`${className} left-arrow`} onClick={onClick}>
          <svg viewBox="0 0 24 24" width="24px" height="24px">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.736 20.792l-8.58-8.581 8.58-8.58 1.06 1.06-6.77 6.77h16.08v1.5H5.026l6.77 6.77-1.06 1.06z"
            ></path>
          </svg>
        </button>
      ) : null}
    </>
  );
}

const ThingsToDoInACity = () => {
  const { cityState } = useContext(CityContext);
  const { cityName } = useParams();
  const [attractionReviewsList, setAttractionReviewsList] = useState([]);
  const [openReportReviewModal, setOpenReportReviewModal] = useState(null);
  const tourDisplayListRef = useRef();
  const [
    tourSubcategoryData,
    tourSubcategoryError,
    tourSubcategoryLoading,
    axiosFetch,
  ] = useAxiosFunction();

  const [attractionsData, attractionsError, attractionsLoading] = useAxios({
    axiosInstance: axiosInstance,
    url: `/cities/${replaceUnderScoreWithWhiteSpace(cityName)}/attractions`,
    method: "GET",
  });

  const [toursData, toursError, toursLoading] = useAxios({
    axiosInstance: axiosInstance,
    url: `/cities/${replaceUnderScoreWithWhiteSpace(cityName)}/tours`,
    method: "GET",
  });
  const tourCategoryName = toursData[0]?.categoryName;
  console.log("tourCategoryName is ", tourCategoryName);

  useEffect(() => {
    if (tourCategoryName) {
      axiosFetch({
        axiosInstance: axiosInstance,
        url: `/categories/${tourCategoryName}/subcategories`,
        method: "GET",
      });
      window.scrollTo(0, 0);
    }
  }, [tourCategoryName]);

  console.log("tourSubcategoryData is", tourSubcategoryData);

  const [
    attractionReviewsData,
    attractionReviewsError,
    attractionReviewsLoading,
  ] = useAxios({
    axiosInstance: axiosInstance,
    url: "/attraction-reviews",
    method: "GET",
  });

  // Format the reviewDate directly in the render
  const formattedReviews = attractionReviewsData.map((review) => {
    const dateObject = new Date(review.reviewDate);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      day: "2-digit",
      month: "long",
    }).format(dateObject);

    return { ...review, reviewDate: formattedDate };
  });
  console.log("formattedReviews are", formattedReviews);
  console.log("attractionsData is ", attractionsData);
  console.log("toursData is ", toursData);
  const extractedAttractionNames = attractionsData
    .map((attraction) => attraction.name)
    .slice(0, 4);
  const findAttractionsInThisCity = () => {
    if (!cityName) return;
    const foundCity = cities.find(
      (city) => city.name === replaceUnderScoreWithWhiteSpace(cityName)
    );
    console.log("foundCity in thingstodoinacity is", foundCity);
    const allAttractionsInThisCity = attractions.filter(
      (attraction) => attraction.cityId === foundCity?.id
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
    if (!cityName) return;
    const foundCity = cities.find(
      (city) => city.name === replaceUnderScoreWithWhiteSpace(cityName)
    );
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

  const findAttractionById = (id) => {
    const attractionObj = attractions.find((item) => item.id === id);
    return attractionObj;
  };
  const findUserById = (id) => {
    const userObj = users.find((user) => user.id === id);
    return userObj;
  };
  const updatedAttractionReviews = () => {
    const updatedList = attractionReviews.map((item) => {
      const userObj = findUserById(item.userId);
      const attractionObj = findAttractionById(item.attractionId);
      return { ...item, userObj, attractionName: attractionObj.attractionName };
    });
    return updatedList;
  };
  console.log("updatedList is", updatedAttractionReviews());
  useEffect(() => {
    const updatedList = updatedAttractionReviews();
    setAttractionReviewsList(updatedList);
  }, [attractionReviews, users]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    prevArrow: <SamplePrevArrow></SamplePrevArrow>,
    nextArrow: <SampleNextArrow slidesToShow={3}></SampleNextArrow>,
  };

  return (
    <div className="things-to-do-in-a-city-section">
      <div className="things-to-do-in-a-city">
        <ThingsToDoInACityHeader
          attractionNames={extractedAttractionNames}
        ></ThingsToDoInACityHeader>
        <hr />
        <div className="top-attractions-section">
          <div className="top-attractions-title-container">
            <h2 className="top-attractions-title">
              Top Attractions in {replaceUnderScoreWithWhiteSpace(cityName)}
            </h2>
            <Link to="/" className="attractions-link">
              See all
            </Link>
          </div>
          {attractionsLoading && "Loading..."}
          {attractionsError && "No Attractions found in this City"}
          <div className="top-attractions-list">
            {attractionsData.length > 0 &&
              attractionsData.map((attraction, index) => {
                return (
                  <Link
                    to={`/cities/${cityName}/attractions/${replaceWhiteSpaceWithUnderScore(
                      attraction.name
                    )}`}
                    key={attraction.id}
                  >
                    <TravelDestinationBigCard
                      index={index}
                      attraction={attraction}
                    ></TravelDestinationBigCard>
                  </Link>
                );
              })}
          </div>
          <Link to="/" className="attractions-link">
            See all
          </Link>
        </div>
        {tourSubcategoryData.length > 0 && toursData.length > 0 && <hr />}
        <ul className="tour-display-section">
          {tourSubcategoryLoading && "Loading..."}
          {tourSubcategoryError && "No Tour Subcategory found in this city"}
          {toursLoading && "Loading..."}
          {toursError && "No Tours found in this city"}
          {tourSubcategoryData.length > 0 &&
            toursData.length > 0 &&
            tourSubcategoryData.map((subCategory) => {
              const filteredTours = toursData.filter(
                (tour) => tour.subcategoryId === subCategory.id
              );
              console.log("filteredTours are", filteredTours);
              return (
                <li key={subCategory.id}>
                  <div>
                    <div className="tour-display-container">
                      <div className="tour-display-title-container">
                        <div className="tour-display-title">
                          {subCategory.name}
                        </div>
                        <Link
                          to={`/cities/${cityName}/tours/${replaceWhiteSpaceWithUnderScore(
                            subCategory.name
                          )}`}
                        >
                          See all
                        </Link>
                      </div>
                      <div className="tour-display-list-slider">
                        <div
                          className="tour-display-list"
                          ref={tourDisplayListRef}
                        >
                          {filteredTours.map((tour) => (
                            <Link
                              to={`/cities/${replaceWhiteSpaceWithUnderScore(
                                cityName
                              )}/tours/${replaceWhiteSpaceWithUnderScore(
                                tour.name
                              )}`}
                              className="city-link"
                              key={tour.id}
                              // style={{ maxWidth: "30%" }}
                            >
                              <div className="small-card">
                                <div className="image-container">
                                  <img
                                    src={tour.imageObject.primaryImage.imageUrl}
                                    alt={`${tour.name} image`}
                                  />
                                </div>
                                <div className="card-contents">
                                  <div className="card-title">{tour.name}</div>
                                  <div className="card-rating-count">
                                    <RatingStars
                                      rating={tour.rating}
                                      width={68}
                                      height={12}
                                    ></RatingStars>
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
                                    {subCategory.name}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </li>
              );
            })}
        </ul>
        <hr />
        <div className="user-review-section">
          <div className="user-review-container">
            <div>
              <h2 className="title">What travelers are saying</h2>
            </div>
            {attractionReviewsLoading && "Loading..."}
            {attractionReviewsError ||
              (formattedReviews.length <= 0 && "No reviews found")}
            <div className="user-review-list">
              <Slider {...settings}>
                {formattedReviews.length > 0 &&
                  formattedReviews.slice(0, 12).map((review) => {
                    return (
                      <div className="user-review-card" key={review.id}>
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
                              <svg
                                viewBox="0 0 24 24"
                                width="20px"
                                height="20px"
                              >
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
                                    return prev !== review.id
                                      ? review.id
                                      : null;
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
                          {review.rating !== undefined && (
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
                        <div className="review-of">
                          <a href="#">{`Review of: ${review.attractionName}`}</a>
                        </div>
                        <div className="review-written-date">
                          Written {review.reviewDate}
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThingsToDoInACity;
