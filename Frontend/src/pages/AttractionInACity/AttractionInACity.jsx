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

const AttractionInACity = () => {
  const [attraction, setAttraction] = useState(null);
  const { cityName, attractionName } = useParams();

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
  const findAttraction = () => {
    const allAttractionsInCurrentCity = findAllAttractionsInThisCity();
    if (allAttractionsInCurrentCity.length <= 0) {
      console.log(`this city ${cityName} does not have any attractions`);
      return;
    }

    const currentAttraction = allAttractionsInCurrentCity.find(
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
      (restaurant) => restaurant.cityId === foundCity.id
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
    const currentAttraction = findAttraction();
    setAttraction(currentAttraction);
  }, [cityName, attractionName]);
  const findSubCategory = (attraction) => {
    const foundSubCategory = subCategory.find(
      (subCategory) => subCategory.id === attraction.subCategoryId
    );
    console.log("foundSubCategory is", foundSubCategory);
    return foundSubCategory;
  };

  return (
    <div className="attraction-section">
      {!attraction && (
        <h1>
          This {cityName} does not have this attraction {attractionName}
        </h1>
      )}
      {attraction && (
        <>
          <div className="attraction-header">
            <h1 className="attraction-title">{attraction.attractionName}</h1>
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
                <svg
                  viewBox="0 0 128 24"
                  width="88"
                  height="16"
                  aria-labelledby=":lithium-r2s:"
                  className="rating-stars"
                >
                  <title id=":lithium-r2s:"></title>
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
                <span className="number-of-reviews">
                  {attraction.numberOfReviews.toLocaleString("en-US")} reviews
                </span>
              </div>
              <div className="attraction-subcategory">
                {findSubCategory(attraction).subCategoryName}
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
                  alt={`${attraction.attractionName} image`}
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
                  >{`${allRestaurantsInThisCity.length.toLocaleString(
                    "en-US"
                  )} within ${replaceUnderScoreWithWhiteSpace(cityName)}`}</div>
                  <div className="area-small-card-list">
                    {allRestaurantsInThisCity.length > 0 &&
                      allRestaurantsInThisCity.slice(0, 3).map((restaurant) => (
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
                                  <svg
                                    viewBox="0 0 128 24"
                                    width="68"
                                    height="12"
                                    aria-labelledby=":lithium-Rlokd979qilt5vlq:"
                                    className="rating-stars"
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
                <div className="nearby-attractions">
                  <div className="nearby-attractions-title">Attractions</div>
                  <div
                    style={{
                      marginBottom: "16px",
                      fontSize: "16px",
                      fontWeight: "400",
                      color: "#000",
                    }}
                  >{`${allAttractionsInThisCity.length.toLocaleString(
                    "en-US"
                  )} within ${replaceUnderScoreWithWhiteSpace(cityName)}`}</div>
                  <div className="area-small-card-list">
                    {allAttractionsInThisCity.length > 0 &&
                      allAttractionsInThisCity
                        .filter((item) => item.id !== attraction.id)
                        .slice(0, 3)
                        .map((attraction) => (
                          <div key={attraction.id}>
                            <Link
                              to={`/cities/${cityName}/attractions/${replaceWhiteSpaceWithUnderScore(
                                attraction.attractionName
                              )}`}
                            >
                              <div className="area-small-card">
                                <div className="area-small-card-image-container">
                                  <img
                                    src={attraction.imageUrl}
                                    alt={attraction.attractionName}
                                  />
                                </div>
                                <div className="area-small-card-contents">
                                  <div className="area-small-card-title">
                                    {attraction.attractionName}
                                  </div>
                                  <div className="card-rating-count">
                                    <svg
                                      viewBox="0 0 128 24"
                                      width="68"
                                      height="12"
                                      aria-labelledby=":lithium-Rlokd979qilt5vlq:"
                                      className="rating-stars"
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
                                    style={{ fontSize: "14px" }}
                                  >
                                    {
                                      findSubCategory(attraction)
                                        .subCategoryName
                                    }
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
    </div>
  );
};

export default AttractionInACity;
