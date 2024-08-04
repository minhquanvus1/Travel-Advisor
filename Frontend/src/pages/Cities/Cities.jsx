import React, { useState, useEffect } from "react";
import "./Cities.css";
import CitiesHeader from "../../components/CitiesHeader/CitiesHeader";
import {
  cities,
  attractions,
  subCategory,
  restaurants,
} from "../../assets/assets";
import CityCard from "../../components/CityCard/CityCard";
import ExpandableDescription from "../../components/ExpandableDescription/ExpandableDescription";
import { Link } from "react-router-dom";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";

const Cities = () => {
  //   const [isOpen, setIsOpen] = useState(false);
  //   const [showReadMoreButton, setShowReadMoreButton] = useState(false);
  console.log("cities are", cities);
  const text = `Vietnam's cities offer a harmonious blend of rich history, natural
          beauty, and vibrant urban life. In no short supply of cultural and
          natural wonders, these cities reign supreme in captivating travelers'
          hearts. Ho Chi Minh City is the pièce de résistance for food
          enthusiasts, with guided tours delving into its culinary delights. You
          could do worse than visit the historic Hoi Truong Thong Nhat Palace
          and the intricately adorned Emperor Jade Pagoda. For nature lovers,
          the mountains of Sapa and the primeval landscape of Cuc Phuong
          National Park are a trekker’s paradise. Vietnam's cities seamlessly
          combine the allure of urban life with the serenity of nature, ensuring
          unforgettable experiences at every turn. `;
  //   useEffect(() => {
  //     setShowReadMoreButton(text.length > 100);
  //   }, []);

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
    <div className="cities">
      <CitiesHeader></CitiesHeader>
      <div className="description-container">
        <h2>Cities, Vietnam</h2>
        <ExpandableDescription
          text={text}
          lineClamp={3}
        ></ExpandableDescription>
      </div>
      {/* <div className="cities-description">
        <h2>Cities, Vietnam</h2>
        <p className={isOpen ? "expanded" : ""}>{text}</p>
        {showReadMoreButton && (
          <div onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <div className="expand-button">
                <p>Read less</p>
                <i className="fas fa-chevron-up"></i>
              </div>
            ) : (
              <div className="expand-button">
                <p>Read more</p>
                <i className="fas fa-chevron-down"></i>
              </div>
            )}
          </div>
        )}
      </div> */}
      <div className="cities-list">
        {cities.length > 0 &&
          cities.map((city, index) => {
            return (
              <Link
                to={`/cities/${replaceWhiteSpaceWithUnderScore(city.name)}`}
                className="city-link"
                key={city.id}
              >
                <CityCard city={city}></CityCard>
              </Link>
            );
          })}
      </div>
      <div className="essentials-in-a-country">
        <h2 className="title">Essentials Vietnam</h2>
        <div className="essentials-list-container">
          <div className="essentials-list">
            <div className="essentials-description-container">
              <div className="essentials-description-title">
                <h3>Do</h3>
              </div>
              <div className="essentials-description">
                Places to see, ways to wander, and signature experiences.
              </div>
            </div>
            <div className="essentials-items-list">
              {attractions.length > 0 &&
                attractions.slice(0, 3).map((attraction, index) => {
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
                              {attraction.numberOfReviews.toLocaleString(
                                "en-US"
                              )}
                            </span>
                          </div>
                          <div
                            className="attraction-subcategory"
                            style={{
                              fontSize: "14px",
                              fontWeight: "400",
                              color: "#333",
                            }}
                          >
                            {findSubCategory(attraction).subCategoryName}
                          </div>
                          <div
                            className="attraction-city"
                            style={{
                              fontSize: "14px",
                              fontWeight: "400",
                              color: "#333",
                            }}
                          >
                            {`${foundCity?.name}, Vietnam`}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="essentials-list">
            <div className="essentials-description-container">
              <div className="essentials-description-title">
                <h3>Eat</h3>
              </div>
              <div className="essentials-description">
                Can't-miss spots to dine, drink, and feast.
              </div>
            </div>
            <div className="essentials-items-list">
              {restaurants.length > 0 &&
                restaurants.slice(0, 3).map((restaurant, index) => {
                  const foundCity = findCityById(restaurant.cityId);
                  return (
                    <Link
                      to={`/cities/${replaceWhiteSpaceWithUnderScore(
                        foundCity?.name
                      )}/restaurants/${replaceWhiteSpaceWithUnderScore(
                        restaurant.name
                      )}`}
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
                              {restaurant.numberOfReviews.toLocaleString(
                                "en-US"
                              )}
                            </span>
                          </div>
                          <span className="cuisines-list">
                            Cuisines: &nbsp;
                            {restaurant.cuisines.length >= 3 &&
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
                          <div
                            className="attraction-city"
                            style={{
                              fontSize: "14px",
                              fontWeight: "400",
                              color: "#333",
                            }}
                          >
                            {`${foundCity?.name}, Vietnam`}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cities;
