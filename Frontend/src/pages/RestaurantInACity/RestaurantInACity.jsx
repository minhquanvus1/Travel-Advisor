import React, { useEffect } from "react";
import "./RestaurantInACity.css";
import { useParams } from "react-router-dom";
import { replaceUnderScoreWithWhiteSpace } from "../../functions/replaceUnderScoreWithWhiteSpace";
import RatingStars from "../../components/RatingStars/RatingStars";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxios } from "../../hooks/useAxios";

const RestaurantInACity = ({ restaurantState, setRestaurantState }) => {
  const { cityName, restaurantName } = useParams();

  const [restaurant, error, loading] = useAxios({
    axiosInstance: axiosInstance,
    url: `/restaurants/search/findRestaurantByRestaurantNameAndCityName?restaurantName=${replaceUnderScoreWithWhiteSpace(
      restaurantName
    )}&cityName=${replaceUnderScoreWithWhiteSpace(cityName)}`,
    method: "GET",
  });
  console.log("restaurantData is", restaurant, error, loading);

  useEffect(() => {
    setRestaurantState(restaurant.name);
    localStorage.setItem("restaurantState", restaurant.name);
    return () => {
      localStorage.removeItem("restaurantState");
    };
  }, [restaurant]);
  return (
    <div className="restaurant-section">
      {error && (
        <div
          style={{ display: "grid", placeItems: "center", height: "100dvh" }}
        >
          No restaurant found
        </div>
      )}
      {loading && (
        <div
          style={{ display: "grid", placeItems: "center", height: "100dvh" }}
        >
          Loading...
        </div>
      )}
      {!Array.isArray(restaurant) && restaurant && (
        <>
          <div className="restaurant-heading">
            <h1>{restaurant.name}</h1>
            <div className="restaurant-number-of-reviews-and-cuisines">
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                <RatingStars
                  rating={restaurant.rating}
                  width={88}
                  height={16}
                ></RatingStars>

                <span className="number-of-reviews">
                  {restaurant.numberOfReviews.toLocaleString("en-US")}{" "}
                  {restaurant.numberOfReviews < 2 ? "review" : "reviews"}
                </span>
              </span>
              <span className="cuisines-list">
                Cuisines: &nbsp;
                {restaurant.cuisines.length > 0 &&
                  restaurant.cuisines.slice(0, 3).map((cuisine, index) => {
                    return (
                      <span key={index}>
                        {index > 0 && <span>, </span>}
                        {cuisine.name}
                      </span>
                    );
                  })}
                {/* {restaurant.cuisines.length >= 3 &&
                  restaurant.cuisines
                    .slice(0, 3)
                    .map((cuisine) => cuisine.name)
                    .join(", ")} */}
              </span>
            </div>
            <div className="address-and-contact-details">
              <span className="address-container">
                <svg viewBox="0 0 24 24" width="20px" height="20px">
                  <path d="M11.277 20.26l.53-.532-.53.532zm.035.035l.537-.524-.008-.008-.53.532zM12 21l-.537.524.529.542.537-.534L12 21zm.688-.684l.529.532.002-.002-.53-.53zm.303-8.458l-.287-.693.287.693zm-1.98-4.783l-.288-.693.287.693zM12 2.25c-4.262 0-7.75 3.46-7.75 7.707h1.5c0-3.41 2.808-6.207 6.25-6.207v-1.5zM4.25 9.957c0 2.269 1.128 4.455 2.452 6.292 1.335 1.85 2.947 3.45 4.047 4.543l1.057-1.064c-1.108-1.1-2.634-2.62-3.887-4.356-1.262-1.75-2.169-3.62-2.169-5.415h-1.5zm6.499 10.835l.034.035 1.058-1.064-.035-.035-1.057 1.064zm.026.026l.688.706 1.074-1.048-.688-.705-1.074 1.047zm1.754.714l.688-.684-1.058-1.064-.688.684 1.058 1.064zm.69-.686c1.096-1.098 2.717-2.706 4.06-4.566 1.333-1.846 2.471-4.043 2.471-6.323h-1.5c0 1.806-.916 3.685-2.187 5.445-1.262 1.747-2.797 3.275-3.905 4.384l1.06 1.06zm6.531-10.89c0-4.246-3.488-7.706-7.75-7.706v1.5c3.442 0 6.25 2.797 6.25 6.207h1.5zm-6.051-1.193a1.838 1.838 0 01-.995 2.402l.574 1.386a3.338 3.338 0 001.807-4.362l-1.386.574zm-.995 2.402a1.838 1.838 0 01-2.402-.995l-1.386.574a3.338 3.338 0 004.362 1.807l-.574-1.386zm-2.402-.995a1.838 1.838 0 01.995-2.402l-.574-1.386a3.338 3.338 0 00-1.807 4.362l1.386-.574zm.995-2.402a1.838 1.838 0 012.402.995l1.386-.574a3.338 3.338 0 00-4.362-1.807l.574 1.386z"></path>
                </svg>
                <span className="address">
                  {restaurant.addressObj.address
                    ? `${restaurant.addressObj.address} street `
                    : ""}
                  {restaurant.addressObj.address &&
                    restaurant.addressObj.ward &&
                    ", "}
                  {restaurant.addressObj.ward
                    ? !isNaN(restaurant.addressObj.ward)
                      ? `Ward ${restaurant.addressObj.ward}`
                      : `${restaurant.addressObj.ward} Ward`
                    : ""}
                  {restaurant.addressObj.ward &&
                    restaurant.addressObj.district &&
                    ", "}
                  {restaurant.addressObj.district
                    ? !isNaN(restaurant.addressObj.district)
                      ? `District ${restaurant.addressObj.district}`
                      : `${restaurant.addressObj.district} District`
                    : ""}
                  {restaurant.addressObj.district &&
                    restaurant.addressObj.city &&
                    ", "}
                  {restaurant.addressObj.city &&
                    `${restaurant.addressObj.city} `}
                  {restaurant.addressObj.postalCode &&
                    `${restaurant.addressObj.postalCode} `}
                  {restaurant.addressObj.country &&
                    `${restaurant.addressObj.country}`}
                </span>
              </span>
              <span className="phone-number-container">
                <svg viewBox="0 0 24 24" width="20px" height="20px">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.525 2.011l5.173 5.176-1.826 2.725.096.207c.167.348.427.829.8 1.347.707.986 1.796 2.082 3.383 2.7l3.168-1.354 4.671 4.674-3.152 4.2-.32.038-.087-.745.086.745h-.004l-.006.001-.018.002a5.117 5.117 0 01-.265.017c-.175.007-.424.01-.737-.004a12.514 12.514 0 01-2.557-.399c-2.109-.547-4.89-1.794-7.668-4.574-2.781-2.783-4.037-5.574-4.591-7.69a12.69 12.69 0 01-.409-2.568 8.769 8.769 0 01.003-.946l.005-.06.002-.018V5.48l.001-.002s0-.002.746.08l-.746-.082.036-.325 4.216-3.139zM3.751 5.947c-.002.127 0 .29.01.487.026.538.114 1.318.361 2.262.493 1.884 1.625 4.433 4.2 7.01 2.573 2.575 5.111 3.698 6.984 4.184.94.243 1.716.327 2.25.351.196.01.359.01.485.008l1.969-2.623-3.035-3.036-2.773 1.185-.272-.093c-2.115-.726-3.517-2.137-4.381-3.341a10.51 10.51 0 01-.934-1.574 8.35 8.35 0 01-.29-.682l-.004-.012-.002-.005v-.001s0-.002.71-.242l-.71.24-.12-.35 1.567-2.339L6.38 3.99 3.75 5.947z"
                  ></path>
                </svg>
                <span className="phone-number">{restaurant.phoneNumber}</span>
              </span>
              <a
                href={restaurant.websiteUrl}
                target="_blank"
                className="website-url-container"
              >
                <svg viewBox="0 0 24 24" width="20px" height="20px">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22.507 17.952c0-.416-.369-.605-.45-.643a1.432 1.432 0 00-.338-.105 4.647 4.647 0 00-.595-.064c-.403-.022-.88-.022-1.195-.022H4.267c-.776 0-1.293.01-1.621.04-.152.015-.34.04-.507.103a.912.912 0 00-.338.217.683.683 0 00-.196.473v.667h20.902v-.666zM18.287 5.893H5.809v8.447h12.478V5.893zm-13.978-1.5V15.84h15.478V4.393H4.309z"
                  ></path>
                </svg>
                <span className="website-url">Website</span>
              </a>
            </div>
          </div>
          <div className="restaurant">
            <div className="image-container">
              <img src={restaurant.imageUrl} alt={`${restaurant.name} image`} />
            </div>
            <div className="general-info">
              <div className="general-info-card">
                <div className="general-info-card-title">
                  Ratings and reviews
                </div>
                <div className="ratings-and-reviews">
                  <span className="rating-value">
                    {restaurant.rating.toFixed(1)}
                  </span>

                  <RatingStars
                    rating={restaurant.rating}
                    width={88}
                    height={16}
                  ></RatingStars>

                  <span className="reviews-count">
                    {restaurant.numberOfReviews.toLocaleString("en-US")}{" "}
                    {restaurant.numberOfReviews < 2 ? "review" : "reviews"}
                  </span>
                </div>
                <hr />
                <div className="ratings">
                  <div className="ratings-title">RATINGS</div>
                  <div className="rating-row">
                    <div>
                      <svg viewBox="0 0 24 24" width="14px" height="14px">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M13.578 4.891L16.25 2.22l1.06 1.06-2.671 2.672c-.679.679-1.055 1.462-1.12 2.199-.043.5.054 1.003.327 1.472L18.75 4.72l1.06 1.06-4.906 4.906c.473.281.974.387 1.466.354.718-.047 1.467-.394 2.096-1.023A869.223 869.223 0 0021.02 7.45l.226-.228h.001l1.066 1.055-.227.23a983.524 983.524 0 01-2.56 2.57c-.849.849-1.927 1.384-3.057 1.459a4.026 4.026 0 01-2.647-.768L12.591 13l7.72 7.72-1.061 1.06-5.97-5.97-3 3-1.75-1.75-4.72 4.72-1.06-1.06L7.47 16 3.077 11.61a4.75 4.75 0 010-6.718l.702-.702 7.75 7.75 1.232-1.232a3.971 3.971 0 01-.737-2.686c.1-1.147.67-2.246 1.553-3.13zm-1.359 9.86L3.808 6.338a3.25 3.25 0 00.33 4.21l6.142 6.14 1.94-1.939z"
                        ></path>
                      </svg>
                    </div>
                    <span className="rating-subject">Food</span>
                    <svg
                      viewBox="0 0 128 24"
                      width="68"
                      height="12"
                      aria-labelledby=":lithium-r1c:"
                      className="rating-stars"
                    >
                      <title id=":lithium-r1c:">4.6 of 5 bubbles</title>
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
                  </div>
                  <div>
                    <div className="rating-row">
                      <div>
                        <svg viewBox="0 0 24 24" width="14px" height="14px">
                          <path d="M4.005 14.998h-.75v.75h.75v-.75zm15.996 0v.75h.75v-.75h-.75zm-8.754-8.132a.75.75 0 001.5 0h-1.5zM12.747 5a.75.75 0 00-1.5 0h1.5zm-7.992 9.998a7.247 7.247 0 017.248-7.248v-1.5a8.747 8.747 0 00-8.748 8.748h1.5zm7.248-7.248c4 0 7.248 3.248 7.248 7.248h1.5c0-4.829-3.919-8.748-8.748-8.748v1.5zm7.998 6.498H4.005v1.5h15.996v-1.5zM3 19.748h18v-1.5H3v1.5zm9.747-12.882V5h-1.5v1.866h1.5z"></path>
                        </svg>
                      </div>
                      <span className="rating-subject">Service</span>
                      <svg
                        viewBox="0 0 128 24"
                        width="68"
                        height="12"
                        aria-labelledby=":lithium-r1c:"
                        className="rating-stars"
                      >
                        <title id=":lithium-r1c:">4.6 of 5 bubbles</title>
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
                    </div>
                  </div>
                  <div>
                    <div className="rating-row">
                      <div>
                        <svg viewBox="0 0 24 24" width="14px" height="14px">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.852 8.245l-1.16-4.051a.5.5 0 00-.619-.344L2.205 8.108a.498.498 0 00-.226.137h16.873zm-6.44-1.5h4.45l-.337-1.177-4.112 1.177z"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M3.48 8.874v10.764h17V8.874h-17zm-1-1.5a.5.5 0 00-.5.5v12.764a.5.5 0 00.5.5h19a.5.5 0 00.5-.5V7.874a.5.5 0 00-.5-.5h-19z"
                          ></path>
                          <path d="M18.852 13.775a1.15 1.15 0 11-2.299 0 1.15 1.15 0 012.299 0z"></path>
                        </svg>
                      </div>
                      <span className="rating-subject">Value</span>
                      <svg
                        viewBox="0 0 128 24"
                        width="68"
                        height="12"
                        aria-labelledby=":lithium-r1c:"
                        className="rating-stars"
                      >
                        <title id=":lithium-r1c:">4.6 of 5 bubbles</title>
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="general-info-card">
                <div className="general-info-card-title">Details</div>
                <div className="details-item">
                  <div className="details-item-subject">PRICE RANGE</div>
                  <div className="details-item-content">
                    ${restaurant.lowestPrice.toFixed(2)} - $
                    {restaurant.highestPrice.toFixed(2)}
                  </div>
                </div>
                <div className="details-item">
                  <div className="details-item-subject">CUISINES</div>
                  <div className="details-item-content">
                    {restaurant.cuisines.length > 0 &&
                      restaurant.cuisines
                        .map((cuisine) => cuisine.name)
                        .join(", ")}
                  </div>
                </div>
              </div>
              <div className="general-info-card">
                <div className="general-info-card-title">
                  Location and contact
                </div>
                <div className="address-container details-item contact-item">
                  <svg viewBox="0 0 24 24" width="20px" height="20px">
                    <path d="M11.277 20.26l.53-.532-.53.532zm.035.035l.537-.524-.008-.008-.53.532zM12 21l-.537.524.529.542.537-.534L12 21zm.688-.684l.529.532.002-.002-.53-.53zm.303-8.458l-.287-.693.287.693zm-1.98-4.783l-.288-.693.287.693zM12 2.25c-4.262 0-7.75 3.46-7.75 7.707h1.5c0-3.41 2.808-6.207 6.25-6.207v-1.5zM4.25 9.957c0 2.269 1.128 4.455 2.452 6.292 1.335 1.85 2.947 3.45 4.047 4.543l1.057-1.064c-1.108-1.1-2.634-2.62-3.887-4.356-1.262-1.75-2.169-3.62-2.169-5.415h-1.5zm6.499 10.835l.034.035 1.058-1.064-.035-.035-1.057 1.064zm.026.026l.688.706 1.074-1.048-.688-.705-1.074 1.047zm1.754.714l.688-.684-1.058-1.064-.688.684 1.058 1.064zm.69-.686c1.096-1.098 2.717-2.706 4.06-4.566 1.333-1.846 2.471-4.043 2.471-6.323h-1.5c0 1.806-.916 3.685-2.187 5.445-1.262 1.747-2.797 3.275-3.905 4.384l1.06 1.06zm6.531-10.89c0-4.246-3.488-7.706-7.75-7.706v1.5c3.442 0 6.25 2.797 6.25 6.207h1.5zm-6.051-1.193a1.838 1.838 0 01-.995 2.402l.574 1.386a3.338 3.338 0 001.807-4.362l-1.386.574zm-.995 2.402a1.838 1.838 0 01-2.402-.995l-1.386.574a3.338 3.338 0 004.362 1.807l-.574-1.386zm-2.402-.995a1.838 1.838 0 01.995-2.402l-.574-1.386a3.338 3.338 0 00-1.807 4.362l1.386-.574zm.995-2.402a1.838 1.838 0 012.402.995l1.386-.574a3.338 3.338 0 00-4.362-1.807l.574 1.386z"></path>
                  </svg>
                  <span className="address details-item-content">
                    {restaurant.addressObj.address
                      ? `${restaurant.addressObj.address} street `
                      : ""}
                    {restaurant.addressObj.address &&
                      restaurant.addressObj.ward &&
                      ", "}
                    {restaurant.addressObj.ward
                      ? !isNaN(restaurant.addressObj.ward)
                        ? `Ward ${restaurant.addressObj.ward}`
                        : `${restaurant.addressObj.ward} Ward`
                      : ""}
                    {restaurant.addressObj.ward &&
                      restaurant.addressObj.district &&
                      ", "}
                    {restaurant.addressObj.district
                      ? !isNaN(restaurant.addressObj.district)
                        ? `District ${restaurant.addressObj.district}`
                        : `${restaurant.addressObj.district} District`
                      : ""}
                    {restaurant.addressObj.district &&
                      restaurant.addressObj.city &&
                      ", "}
                    {restaurant.addressObj.city &&
                      `${restaurant.addressObj.city} `}
                    {restaurant.addressObj.postalCode &&
                      `${restaurant.addressObj.postalCode} `}
                    {restaurant.addressObj.country &&
                      `${restaurant.addressObj.country}`}
                  </span>
                </div>
                <div className="phone-number-container details-item contact-item">
                  <svg viewBox="0 0 24 24" width="20px" height="20px">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6.525 2.011l5.173 5.176-1.826 2.725.096.207c.167.348.427.829.8 1.347.707.986 1.796 2.082 3.383 2.7l3.168-1.354 4.671 4.674-3.152 4.2-.32.038-.087-.745.086.745h-.004l-.006.001-.018.002a5.117 5.117 0 01-.265.017c-.175.007-.424.01-.737-.004a12.514 12.514 0 01-2.557-.399c-2.109-.547-4.89-1.794-7.668-4.574-2.781-2.783-4.037-5.574-4.591-7.69a12.69 12.69 0 01-.409-2.568 8.769 8.769 0 01.003-.946l.005-.06.002-.018V5.48l.001-.002s0-.002.746.08l-.746-.082.036-.325 4.216-3.139zM3.751 5.947c-.002.127 0 .29.01.487.026.538.114 1.318.361 2.262.493 1.884 1.625 4.433 4.2 7.01 2.573 2.575 5.111 3.698 6.984 4.184.94.243 1.716.327 2.25.351.196.01.359.01.485.008l1.969-2.623-3.035-3.036-2.773 1.185-.272-.093c-2.115-.726-3.517-2.137-4.381-3.341a10.51 10.51 0 01-.934-1.574 8.35 8.35 0 01-.29-.682l-.004-.012-.002-.005v-.001s0-.002.71-.242l-.71.24-.12-.35 1.567-2.339L6.38 3.99 3.75 5.947z"
                    ></path>
                  </svg>
                  <span className="phone-number details-item-content">
                    {restaurant.phoneNumber}
                  </span>
                </div>
                <a
                  href={restaurant.websiteUrl}
                  target="_blank"
                  className="website-url-container details-item contact-item"
                >
                  <svg viewBox="0 0 24 24" width="20px" height="20px">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M22.507 17.952c0-.416-.369-.605-.45-.643a1.432 1.432 0 00-.338-.105 4.647 4.647 0 00-.595-.064c-.403-.022-.88-.022-1.195-.022H4.267c-.776 0-1.293.01-1.621.04-.152.015-.34.04-.507.103a.912.912 0 00-.338.217.683.683 0 00-.196.473v.667h20.902v-.666zM18.287 5.893H5.809v8.447h12.478V5.893zm-13.978-1.5V15.84h15.478V4.393H4.309z"
                    ></path>
                  </svg>
                  <span className="website-url details-item-content">
                    Website
                  </span>
                </a>
              </div>
            </div>
            <div className="overview">
              <div className="overview-header">Details</div>
              <div className="overview-details">
                <div className="overview-details-left">
                  <div className="details-item">
                    <div className="details-item-subject">ABOUT</div>
                    <div className="details-item-content">
                      {restaurant.description}
                    </div>
                  </div>
                </div>
                <div className="overview-details-right">
                  <div className="details-item">
                    <div className="details-item-subject">PRICE RANGE</div>
                    <div className="details-item-content">
                      ${restaurant.lowestPrice.toFixed(2)} - $
                      {restaurant.highestPrice.toFixed(2)}
                    </div>
                  </div>
                  <div className="details-item">
                    <div className="details-item-subject">CUISINES</div>
                    <div className="details-item-content">
                      {restaurant.cuisines.length > 0 &&
                        restaurant.cuisines
                          .map((cuisine) => cuisine.name)
                          .join(", ")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantInACity;
