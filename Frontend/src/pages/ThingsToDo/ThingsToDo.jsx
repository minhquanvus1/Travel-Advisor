import React, { useState, useContext, useEffect, useRef } from "react";
import "./ThingsToDo.css";
import { CityContext } from "../../context/CityContextProvider";
import TravelDestinationsHeader from "../../components/TravelDestinationsHeader/TravelDestinationsHeader";
import TravelDestinationsService from "../../components/TravelDestinationsService/TravelDestinationsService";
import { Link } from "react-router-dom";
import CityCard from "../../components/CityCard/CityCard";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";
import RatingStars from "../../components/RatingStars/RatingStars";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxios } from "../../hooks/useAxios";
import { useAxiosFunction } from "../../hooks/useAxiosFunction";

const ThingsToDo = () => {
  const { cities, setCityState } = useContext(CityContext);
  const [userPosition, setUserPosition] = useState({
    latitude: null,
    longitude: null,
  });
  const userPositionRef = useRef({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    setCityState("");
  }, []);

  const [attractions, error, loading] = useAxios({
    axiosInstance: axiosInstance,
    url: "/attractions",
    method: "GET",
  });
  const [
    nearbyAttractions,
    nearbyAttractionsError,
    nearbyAttractionsLoading,
    fetchNearbyAttractions,
  ] = useAxiosFunction();
  const haversineDistance = (lat1, lng1, lat2, lng2) => {
    if (!lat1 || !lng1 || !lat2 || !lng2) {
      console.log("invalid arguments");
      return;
    }
    // Convert degrees to radians
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    // Haversine formula
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
  };
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // console.log(
          //   "Latitude:",
          //   typeof latitude,
          //   "Longitude:",
          //   typeof userPosition.longitude
          // );
          // console.log("Watch Position Latitude:", latitude);
          // console.log("User Position Latitude:", userPosition.latitude);
          // console.log("Watch Position Longitude:", longitude);
          // console.log("User Position Longitude:", userPosition.longitude);
          // console.log(
          //   "minus position latitude ",
          //   Math.abs(latitude - userPosition.latitude)
          // );
          // console.log(
          //   "minus position longitude ",
          //   Math.abs(longitude - userPosition.longitude)
          // );
          if (
            latitude === userPositionRef.current.latitude &&
            longitude === userPositionRef.current.longitude
          ) {
            console.log("same position");
            return;
          }
          console.log("different position");
          setUserPosition({ latitude, longitude });
          userPositionRef.current = { latitude, longitude };
          console.log("latitude ", latitude - userPositionRef.current.latitude);
          console.log(
            "longitude ",
            longitude - userPositionRef.current.longitude
          );
          console.log("userPositionRef.current is ", userPositionRef);
          // Send position to the backend if needed
          // axios.post('/api/location', { latitude, longitude });
          fetchNearbyAttractions({
            axiosInstance: axiosInstance,
            method: "GET",
            url: `/attractions/search/findNearbyAttractions?latitude=${latitude}&longitude=${longitude}&radius=20`,
          });
        },
        (error) => {
          console.error("Error getting position:", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 60000,
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  console.log("nearby attractions are ", nearbyAttractions);
  // useEffect(() => {
  //   console.log("component haha rerenders");
  //   console.log("current user latitude ", userPosition.latitude);
  //   console.log("current user longitude ", userPosition.longitude);
  // }, [userPosition]);
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

          {/* <h1>Welcome to the App</h1>
          <p>
            Current Position: {userPosition.latitude}, {userPosition.longitude}
          </p> */}
        </div>
        <div className="recommendation-nearby-section">
          {nearbyAttractionsLoading && <div>Loading...</div>}
          {nearbyAttractionsError && (
            <div>Error fetching nearby Attractions</div>
          )}
          {!nearbyAttractionsLoading &&
            !nearbyAttractionsError &&
            nearbyAttractions.length > 0 && (
              <div className="recommendation-section">
                <div className="recommendation-section-header">
                  <div className="title">Nearby Attractions</div>
                  <a href="/" className="attractions-link">
                    See all
                  </a>
                </div>
                <div className="nearby-list">
                  {nearbyAttractions.slice(0, 4).map((attraction) => {
                    const distance = haversineDistance(
                      userPosition.latitude,
                      userPosition.longitude,
                      attraction.latitude,
                      attraction.longitude
                    );
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
                              <div>
                                <span
                                  style={{ fontWeight: "700", color: "#000" }}
                                >
                                  {distance.toFixed(1)}km
                                </span>{" "}
                                from your location
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
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default ThingsToDo;
