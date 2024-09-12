import React, { useState, useMemo, useRef, useEffect } from "react";
import "./Searchbar.css";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxiosFunction } from "../../hooks/useAxiosFunction";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";
import { Link } from "react-router-dom";

const Searchbar = () => {
  const [searchCategory, setSearchCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const overlayRef = useRef(null);
  const inputRef = useRef(null);
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [data, error, loading, axiosFetch] = useAxiosFunction();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const getSearchHeader = (searchCategory) => {
    switch (searchCategory) {
      case "All":
        return "Where to";
      case "City":
        return "City to visit";
      case "Restaurants":
        return "Find places to eat";
      case "Travel_Category":
        return "Travel by Category";
      case "Travel_Destinations":
        return "Find Travel Destinations";
      default:
        return "Where to";
    }
  };

  const searchHeader = useMemo(
    () => getSearchHeader(searchCategory),
    [searchCategory]
  );

  const getSearchInputPlaceHolder = (searchCategory) => {
    switch (searchCategory) {
      case "All":
        return "Places to go, restaurants...";
      case "City":
        return "City to visit";
      case "Restaurants":
        return "Restaurants...";
      case "Travel_Category":
        return "Spiritual, wellness, family...";
      case "Travel_Destinations":
        return "Destinations...";
      default:
        return "Places to go, restaurants...";
    }
  };

  const searchInputPlaceHolder = useMemo(
    () => getSearchInputPlaceHolder(searchCategory),
    [searchCategory]
  );

  const toggleSearch = (e) => {
    if (e.target === overlayRef.current) {
      setShowSearchbar(false);
      setIsInputFocused(false);
    }
  };

  const search = () => {
    if (query.trim() === "") return;
    if (searchCategory === "All") return;
    const categoryMapping = {
      City: "cities",
      Restaurants: "restaurants",
      Travel_Category: "subcategories",
      Travel_Destinations: "attractions",
    };

    const category = categoryMapping[searchCategory];

    if (!category) return;
    console.log("category is ", category);
    axiosFetch({
      axiosInstance: axiosInstance,
      method: "get",
      url: `${category}/search/findByNameContainingIgnoreCase?name=${query}`,
    });
  };
  useEffect(() => {
    if (query.trim() === "" || !showOverlay) {
      setSearchResults([]);
      return;
    }
    search();
  }, [query, searchCategory, showOverlay]);
  useEffect(() => {
    setSearchResults(data);
  }, [data]);
  console.log("data is ", data);
  console.log("searchResults is ", searchResults);
  useEffect(() => {
    if (isInputFocused) {
      setShowOverlay(true);
    } else {
      setShowOverlay(false);
    }
  }, [isInputFocused]);
  console.log("isInputFocused is ", isInputFocused);
  if (error) return <div>Error finding {searchCategory}</div>;
  return (
    <div className="search-bar">
      <h2>{searchHeader}</h2>
      <ul className="category">
        <li
          className={searchCategory === "All" ? "active" : ""}
          onClick={() => setSearchCategory("All")}
        >
          <i className="fa-solid fa-house"></i>
          Search All
        </li>
        <li
          className={searchCategory === "City" ? "active" : ""}
          onClick={() => setSearchCategory("City")}
        >
          <i className="fa-solid fa-city"></i>
          City
        </li>
        <li
          className={searchCategory === "Restaurants" ? "active" : ""}
          onClick={() => setSearchCategory("Restaurants")}
        >
          <i className="fa-solid fa-utensils"></i>
          Restaurants
        </li>
        <li
          className={searchCategory === "Travel_Category" ? "active" : ""}
          onClick={() => setSearchCategory("Travel_Category")}
        >
          <i className="fa-solid fa-list"></i>
          Travel Category
        </li>
        <li
          className={searchCategory === "Travel_Destinations" ? "active" : ""}
          onClick={() => setSearchCategory("Travel_Destinations")}
        >
          <i className="fa-solid fa-location-dot"></i>
          Travel Destinations
        </li>
      </ul>
      <div className={`search-bar-container ${showOverlay ? "active" : ""}`}>
        <div className="row">
          <i
            className="fa-solid fa-magnifying-glass"
            onClick={() => inputRef.current.focus()}
          ></i>
          <input
            type="text"
            autoComplete="off"
            ref={inputRef}
            placeholder={searchInputPlaceHolder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
          />
          {/* {!isInputFocused && (
            <button
              onClick={() => {
                inputRef.current.focus();
                search();
              }}
            >
              Search
            </button>
          )} */}
          {!showOverlay && (
            <button
              onClick={() => {
                inputRef.current.focus();
                search();
              }}
            >
              Search
            </button>
          )}
        </div>
        <div className={searchResults.length > 0 ? "search-results" : ""}>
          <ul>
            {searchResults.length > 0 &&
              searchResults.slice(0, 7).map((item, index) => {
                const itemName = item.name;
                const queryIndex = itemName
                  .toLowerCase()
                  .indexOf(query.toLowerCase());
                if (queryIndex !== -1) {
                  const beforeMatch = itemName.substring(0, queryIndex);
                  const match = itemName.substring(
                    queryIndex,
                    queryIndex + query.length
                  );
                  const afterMatch = itemName.substring(
                    queryIndex + query.length
                  );
                  if (searchCategory === "Tours") {
                    item.imageUrl = item.imageObject.primaryImage.imageUrl;
                  } else if (searchCategory === "Travel_Category") {
                    item.imageUrl = "https://via.placeholder.com/150";
                  }
                  let redirectUrl = "";
                  if (searchCategory === "City") {
                    redirectUrl = `/cities/${replaceWhiteSpaceWithUnderScore(
                      item.name
                    )}`;
                  } else if (searchCategory === "Restaurants") {
                    redirectUrl = `/cities/${replaceWhiteSpaceWithUnderScore(
                      item.cityName
                    )}/restaurants/${replaceWhiteSpaceWithUnderScore(
                      item.name
                    )}`;
                  } else if (searchCategory === "Travel_Category") {
                    redirectUrl = `/subcategories/${replaceWhiteSpaceWithUnderScore(
                      item.name
                    )}`;
                  } else if (searchCategory === "Travel_Destinations") {
                    redirectUrl = `/cities/${replaceWhiteSpaceWithUnderScore(
                      item.cityName
                    )}/attractions/${replaceWhiteSpaceWithUnderScore(
                      item.name
                    )}`;
                  }
                  return (
                    <li key={index}>
                      <Link to={redirectUrl}>
                        <div className="found-item">
                          <div className="found-item-img">
                            <img
                              src={item.imageUrl}
                              alt={`${item.name} image`}
                            />
                          </div>
                          <div className="found-item-description">
                            <div className="found-item-name">
                              <span>{beforeMatch}</span>
                              <strong>{match}</strong>
                              <span>{afterMatch}</span>
                            </div>
                            {(searchCategory === "Travel_Destinations" ||
                              searchCategory === "Restaurants" ||
                              searchCategory === "Tours") && (
                              <div
                                className="found-item-city"
                                style={{
                                  fontSize: "12px",
                                  fontWeight: "400",
                                  color: "#333",
                                  paddingTop: "4px",
                                }}
                              >
                                {item.cityName}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                }
              })}
          </ul>
        </div>
      </div>
      {showOverlay && (
        <div
          className="overlay"
          ref={overlayRef}
          onClick={(e) => toggleSearch(e)}
        ></div>
      )}
    </div>
  );
};

export default Searchbar;
