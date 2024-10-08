import React, { useState, useEffect, useContext, useMemo } from "react";
import "./RestaurantsInACity.css";
import { CityContext } from "../../context/CityContextProvider";
import RestaurantBigCard from "../../components/RestaurantBigCard/RestaurantBigCard";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";
import { replaceUnderScoreWithWhiteSpace } from "../../functions/replaceUnderScoreWithWhiteSpace";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxios } from "../../hooks/useAxios";
import FilterBox from "../../components/FilterBox/FilterBox";
import RatingStars from "../../components/RatingStars/RatingStars";

const RestaurantsInACity = () => {
  const { cityName } = useParams();
  const { cityState } = useContext(CityContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCuisines, setSelectedCuisines] = useState(() => {
    return searchParams.get("cuisines")
      ? searchParams.get("cuisines").split(",")
      : [];
  });
  const [selectedRatings, setSelectedRatings] = useState(() => {
    return searchParams.get("minimumTravelerRating")
      ? searchParams.get("minimumTravelerRating").split(",")
      : [];
  });
  const [showList, setShowList] = useState(true);
  const [allRestaurantsInThisCity, error, loading] = useAxios({
    axiosInstance: axiosInstance,
    url: `/cities/${replaceUnderScoreWithWhiteSpace(cityName)}/restaurants`,
    method: "GET",
  });
  const allCuisines = useMemo(() => {
    return allRestaurantsInThisCity.length > 0
      ? allRestaurantsInThisCity.flatMap((restaurant) => restaurant.cuisines)
      : [];
  }, [allRestaurantsInThisCity]);
  console.log("all cuisines are ", allCuisines);
  console.log("selected cuisine are", selectedCuisines);
  const handleCuisineChange = (cuisine) => {
    setSelectedCuisines(
      (prevSelected) =>
        prevSelected.includes(cuisine)
          ? prevSelected.filter((c) => c !== cuisine) // Remove cuisine if already selected
          : [...prevSelected, cuisine] // Add new cuisine
    );
  };
  const travelerRatingMapper = {
    3: "TRAVELER_RATING_LOW",
    4: "TRAVELER_RATING_MEDIUM",
    5: "TRAVELER_RATING_HIGH",
  };
  const reverseTravelerRatingMapper = Object.fromEntries(
    Object.entries(travelerRatingMapper).map(([key, value]) => [value, key])
  );
  const handleRatingChange = (travelerRatingValue) => {
    const ratingString = travelerRatingMapper[travelerRatingValue];
    // const ratingObject = { ratingValue: travelerRatingValue, ratingString };

    if (selectedRatings.includes(ratingString)) {
      setSelectedRatings(selectedRatings.filter((r) => r !== ratingString));
    } else {
      setSelectedRatings([...selectedRatings, ratingString]);
    }
  };
  useEffect(() => {
    const params = {};
    if (selectedCuisines.length > 0) {
      params.cuisines = selectedCuisines.join(",");
    }
    console.log("selectedratins in here", selectedRatings);
    if (selectedRatings.length > 0) {
      params.minimumTravelerRating = selectedRatings
        // .map((r) => r.ratingString)
        .join(",");
    }
    console.log("params are", params);
    setSearchParams(params);
  }, [selectedCuisines, selectedRatings, setSearchParams]);
  console.log("searchparams are", searchParams.get("minimumTravelerRating"));
  const filteredRestaurants = useMemo(() => {
    let filtered = allRestaurantsInThisCity;
    if (selectedRatings.length > 0) {
      // const ratingValueList = selectedRatings.map((r) => travelerRatingMapper[]);
      const ratingValueList = selectedRatings.map(
        (ratingString) => reverseTravelerRatingMapper[ratingString]
      );
      const minRating = Math.min(...ratingValueList);
      console.log("ratingValueList is", ratingValueList);
      console.log("minRating is", minRating);
      filtered = filtered.filter(
        (restaurant) => restaurant.rating >= minRating
      );
    }
    if (selectedCuisines.length > 0) {
      filtered = filtered.filter((restaurant) => {
        const allCuisinesNames = restaurant.cuisines.map((cuisine) =>
          cuisine.name.toLowerCase()
        );
        return selectedCuisines.some((selectedCuisine) =>
          allCuisinesNames.includes(selectedCuisine.toLowerCase())
        );
      });
    }

    // return selectedCuisines.length > 0
    //   ? allRestaurantsInThisCity.filter((restaurant) => {
    //       const allCuisinesNames = restaurant.cuisines.map((cuisine) =>
    //         cuisine.name.toLowerCase()
    //       );
    //       return selectedCuisines.some((selectedCuisine) =>
    //         allCuisinesNames.includes(selectedCuisine.toLowerCase())
    //       );
    //     })
    //   : allRestaurantsInThisCity;
    console.log("filtered is", filtered);
    return filtered;
  }, [allRestaurantsInThisCity, selectedCuisines, selectedRatings]);

  console.log("filter restaurants are", filteredRestaurants);
  console.log("allrestaurantsinthiscity are", allRestaurantsInThisCity);
  console.log("selectedRatings are", selectedRatings);
  const travelerRatingList = [
    {
      ratingValue: 3,
      name: (
        <div style={{ display: "inline-flex", alignItems: "center" }}>
          <RatingStars rating={3} width={88} height={16}></RatingStars>
          &nbsp; & up
        </div>
      ),
    },
    {
      ratingValue: 4,
      name: (
        <div style={{ display: "inline-flex", alignItems: "center" }}>
          <RatingStars rating={4} width={88} height={16}></RatingStars>
          &nbsp; & up
        </div>
      ),
    },
    {
      ratingValue: 5,
      name: <RatingStars rating={5} width={88} height={16}></RatingStars>,
    },
  ];
  if (loading)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100dvh" }}>
        Loading...
      </div>
    );
  if (error)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100dvh" }}>
        City {cityState} has no restaurants
      </div>
    );
  return (
    <div className="restaurants-in-city-section">
      (
      <>
        <h1 className="restaurants-in-city-section-title">
          Restaurants in {replaceUnderScoreWithWhiteSpace(cityName)}
        </h1>
        <div className="restaurants-in-city-section-contents">
          <div className="filter-section">
            <FilterBox
              title={"Cuisine"}
              itemsList={allCuisines}
              selectedItems={selectedCuisines}
              handleChange={handleCuisineChange}
            ></FilterBox>
            {/* <FilterBox
                title={"Traveler rating"}
                itemsList={travelerRatingList}
                selectedItems={selectedRatings}
                handleChange={handleRatingChange}
              ></FilterBox> */}
            <div className="filter-box-container">
              <div className="filter-box-header">
                <h3 className="filter-box-title">Traveler rating</h3>
                <svg
                  viewBox="0 0 24 24"
                  width="20px"
                  height="20px"
                  onClick={() => setShowList((prev) => !prev)}
                  className={showList ? "active" : ""}
                >
                  <path d="M18.4 7.4 12 13.7 5.6 7.4 4.2 8.8l7.8 7.8 7.8-7.8z"></path>
                </svg>
              </div>
              <div
                className={`filter-box-items-list-container ${
                  showList ? "active" : ""
                }`}
              >
                <div className="filter-box-items-list">
                  {travelerRatingList.map((item, index) => {
                    return (
                      <div key={index} className="filter-box-item">
                        <input
                          type="checkbox"
                          id={`filter-${item.name}`}
                          name={item.name}
                          checked={selectedRatings
                            // .map((r) => r.ratingString)
                            .includes(travelerRatingMapper[item.ratingValue])}
                          onChange={() => handleRatingChange(item.ratingValue)}
                        />
                        <label htmlFor={`filter-${item.name}`}>
                          {item.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="restaurant-small-card-list">
            {filteredRestaurants.length <= 0 && <div>No Restaurants found</div>}
            {filteredRestaurants.length > 0 &&
              filteredRestaurants.map((restaurant, index) => (
                <div
                  key={restaurant.id}
                  // style={{
                  //   width: "clamp(272px, 70%, 100%)",
                  //   height: "clamp(min-content, 14vw, 17vw)",
                  // }}
                >
                  <Link
                    to={`/cities/${cityName}/restaurants/${replaceWhiteSpaceWithUnderScore(
                      restaurant.name
                    )}`}
                  >
                    <RestaurantBigCard
                      index={index}
                      imageUrl={restaurant.imageUrl}
                      cardTitle={restaurant.name}
                      numberOfReviews={restaurant.numberOfReviews}
                      cardDescription={restaurant.description}
                      rating={restaurant.rating}
                      cuisines={restaurant.cuisines}
                    ></RestaurantBigCard>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </>
      )
    </div>
  );
};

export default RestaurantsInACity;
