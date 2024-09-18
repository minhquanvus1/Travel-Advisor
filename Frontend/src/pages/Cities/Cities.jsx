import React, { useContext } from "react";
import "./Cities.css";
import CitiesHeader from "../../components/CitiesHeader/CitiesHeader";
import CityCard from "../../components/CityCard/CityCard";
import { CityContext } from "../../context/CityContextProvider";
import ExpandableDescription from "../../components/ExpandableDescription/ExpandableDescription";
import { Link } from "react-router-dom";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RatingStars from "../../components/RatingStars/RatingStars";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxios } from "../../hooks/useAxios";

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
const Cities = () => {
  const { cities } = useContext(CityContext);

  const [attractions, attractionsError, attractionsLoading] = useAxios({
    axiosInstance: axiosInstance,
    url: "/attractions",
    method: "GET",
  });

  const [restaurants, restaurantsError, restaurantsLoading] = useAxios({
    axiosInstance: axiosInstance,
    url: "/restaurants",
    method: "GET",
  });
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
    <div className="cities">
      <CitiesHeader></CitiesHeader>
      <div className="description-container">
        <h2>Cities, Vietnam</h2>
        <ExpandableDescription
          text={text}
          lineClamp={3}
        ></ExpandableDescription>
      </div>
      <div className="cities-list">
        {cities.length <= 0 && "No cities found"}
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
              {attractions.length > 0 && (
                <Slider {...settings}>
                  {attractions.map((attraction, index) => {
                    return (
                      <div key={attraction.id}>
                        <Link
                          to={`/cities/${replaceWhiteSpaceWithUnderScore(
                            attraction.cityName
                          )}/attractions/${replaceWhiteSpaceWithUnderScore(
                            attraction.name
                          )}`}
                        >
                          <div className="small-card">
                            <div className="image-container">
                              <img
                                src={attraction.imageUrl}
                                alt={`${attraction.name} image`}
                              />
                            </div>
                            <div className="card-contents">
                              <div className="card-title">
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
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "400",
                                  color: "#333",
                                }}
                              >
                                {attraction.subcategoryName}
                              </div>
                              <div
                                className="attraction-city"
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "400",
                                  color: "#333",
                                }}
                              >
                                {`${attraction.cityName}, Vietnam`}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </Slider>
              )}
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
              {restaurants.length > 0 && (
                <Slider {...settings}>
                  {restaurants.map((restaurant, index) => {
                    return (
                      <div key={restaurant.id}>
                        <Link
                          to={`/cities/${replaceWhiteSpaceWithUnderScore(
                            restaurant.cityName
                          )}/restaurants/${replaceWhiteSpaceWithUnderScore(
                            restaurant.name
                          )}`}
                        >
                          <div className="small-card">
                            <div className="image-container">
                              <img
                                src={restaurant.imageUrl}
                                alt={`${restaurant.name} image`}
                              />
                            </div>
                            <div className="card-contents">
                              <div className="card-title">
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
                              <div
                                className="attraction-city"
                                style={{
                                  fontSize: "14px",
                                  fontWeight: "400",
                                  color: "#333",
                                }}
                              >
                                {`${restaurant.cityName}, Vietnam`}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </Slider>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cities;
