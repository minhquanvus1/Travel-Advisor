import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { CityContext } from "../../context/CityContextProvider";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";
import { replaceUnderScoreWithWhiteSpace } from "../../functions/replaceUnderScoreWithWhiteSpace";
import { useAuth0 } from "@auth0/auth0-react";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxiosFunction } from "../../hooks/useAxiosFunction";
import { useAccessToken } from "../../hooks/useAccessToken";
import { UserContext } from "../../context/UserContextProvider";

const Navbar = ({ restaurantState, setRestaurantState }) => {
  const { token } = useAccessToken();
  const [userData, userError, userLoading, axiosFetch] = useAxiosFunction();
  const {
    loginWithRedirect,
    user,
    isAuthenticated,
    getAccessTokenSilently,
    logout,
    isLoading,
  } = useAuth0();
  const [scroll, setScroll] = useState("");
  const [hrFullWidth, setHrFullWidth] = useState(false);
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(true);
  const [menu, setMenu] = useState("");
  const { cityState, setCityState, checkAndSetCityState } =
    useContext(CityContext);
  const { userFromDb } = useContext(UserContext);
  // create the ref to the current value of isHomePage.
  // Because the handleScroll() is added ONCE when the component is mounted (due to the [] dependency of the useEffect() that has the EventListener)
  // so the handleScroll() will close over the initial value of isHomePage, and is not re-rendered when the isHomePage value is updated
  // That is why even the isHomePage state variable changes, but the handleScroll() still uses the initial value of isHomePage.
  // To solve this, we need to use the useRef() hook to create a ref to the current value of isHomePage, and use that ref in the handleScroll() function.
  // This way is better, more optimized than: adding isHomePage as a dependency in the useEffect() that has the EventListener, because it will cause the EventListener to be added and removed every time the isHomePage value changes, which is less performant
  const currentIsHomePage = useRef();
  console.log(isHomePage);
  console.log(location.pathname);
  console.log(scroll);
  console.log("hrfullwidth", hrFullWidth);
  console.log("token data is ", token);
  useEffect(() => {
    console.log("Current isAuthenticated value:", isAuthenticated);

    if (!isAuthenticated) {
      console.log("Clearing bookingDetails from localStorage");
      localStorage.removeItem("bookingDetails");
    }
  }, [isAuthenticated]);
  useEffect(() => {
    console.log("isAuthenticated is ", isAuthenticated);
    console.log("token is ", token);
    if (isAuthenticated && token) {
      axiosFetch({
        axiosInstance: axiosInstance,
        method: "GET",
        url: "/secure/users",
        requestConfig: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    }
  }, [isAuthenticated, token]);
  console.log("user is ", user);
  // useEffect(() => {
  //   console.log("user is", user);
  //   console.log("isAuthenticated is", isAuthenticated);
  //   let token;
  //   const getToken = async () => {
  //     const token = await getAccessTokenSilently();
  //     return token;
  //   };
  //   if (isAuthenticated) {
  //     getToken().then((response) => {
  //       token = response;
  //       console.log("jwt token is ", token);
  //       console.log(`Bearer token is: Bearer ${token}`);
  //       axiosFetch({
  //         axiosInstance: axiosInstance,
  //         method: "GET",
  //         url: "/secure/users",
  //         requestConfig: {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         },
  //       });
  //     });
  //   }
  // }, [isAuthenticated]);
  console.log("userData is ", userData);
  console.log("userError is ", userError);
  const extractCityName = useCallback(
    (pathname) => {
      const pathParts = pathname.split("/");
      // if (pathParts.includes("cities") && pathParts.length >= 3) {
      //   const cityPart =
      //     pathParts.includes("restaurants") ||
      //     pathParts.includes("things-to-do")
      //       ? pathParts[pathParts.length - 2]
      //       : pathParts[pathParts.length - 1];
      //   return replaceUnderScoreWithWhiteSpace(cityPart);
      // }
      // return null;
      console.log("pathParts are", pathParts);
      if (
        pathParts.includes("cities") &&
        pathParts.includes("restaurants") &&
        pathParts.length === 5
      ) {
        return replaceUnderScoreWithWhiteSpace(pathParts[pathParts.length - 3]);
      } else if (pathParts.includes("cities") && pathParts.length >= 3) {
        const cityPart =
          pathParts.includes("restaurants") ||
          pathParts.includes("things-to-do")
            ? pathParts[pathParts.length - 2]
            : pathParts[pathParts.length - 1];
        if (
          pathParts.includes("attractions") ||
          (pathParts.includes("tours") && pathParts.length === 5)
        ) {
          return pathParts[pathParts.length - 3];
        }
        if (
          pathParts.includes("attractions") ||
          (pathParts.includes("tours") && pathParts.length === 4)
        ) {
          return pathParts[pathParts.length - 2];
        }
        return replaceUnderScoreWithWhiteSpace(cityPart);
      }
      return null;
    },
    [location.pathname]
  );

  const extractRestaurantName = useCallback(
    (pathname) => {
      const pathParts = pathname.split("/");
      if (
        pathParts.includes("cities") &&
        pathParts.includes("restaurants") &&
        pathParts.length === 5
      ) {
        return replaceUnderScoreWithWhiteSpace(pathParts[pathParts.length - 1]);
      }
      return null;
    },
    [location.pathname]
  );

  const extractAttractionName = useCallback(
    (pathname) => {
      const pathParts = pathname.split("/");
      if (
        pathParts.includes("cities") &&
        pathParts.includes("attractions") &&
        pathParts.length === 5
      ) {
        return replaceUnderScoreWithWhiteSpace(pathParts[pathParts.length - 1]);
      }
      return null;
    },
    [location.pathname]
  );

  const extractTourName = useCallback(
    (pathname) => {
      const pathParts = pathname.split("/");
      if (
        pathParts.includes("cities") &&
        pathParts.includes("tours") &&
        pathParts.length === 5
      ) {
        return replaceUnderScoreWithWhiteSpace(pathParts[pathParts.length - 1]);
      }
      return null;
    },
    [location.pathname]
  );

  // const extractCityName = () => {
  //   if (!cityState) {
  //     const pathParts = location.pathname.split("/");
  //     console.log("pathParts is", pathParts);
  //     if (
  //       pathParts.includes("cities") &&
  //       pathParts.includes("restaurants") &&
  //       pathParts.length === 4
  //     ) {
  //       console.log(
  //         "extractedcityname restaurants is",
  //         pathParts[pathParts.length - 2]
  //       );
  //       checkAndSetCityState(
  //         replaceUnderScoreWithWhiteSpace(pathParts[pathParts.length - 2])
  //       );
  //       return pathParts[pathParts.length - 2];
  //     } else if (pathParts.includes("cities") && pathParts.length === 3) {
  //       console.log(
  //         "extractedcityname city is",
  //         pathParts[pathParts.length - 1]
  //       );
  //       checkAndSetCityState(
  //         replaceUnderScoreWithWhiteSpace(pathParts[pathParts.length - 1])
  //       );
  //       return pathParts[pathParts.length - 1];
  //     }
  //   } else {
  //     console.log("cityState in extractfunction is", cityState);
  //     return replaceWhiteSpaceWithUnderScore(cityState);
  //   }
  // };
  useEffect(() => {
    console.log("useeffect 1: set isHomePage when pathname changes");
    if (location.pathname === "/") {
      setIsHomePage(true);
      setMenu("");
      setCityState("");
      window.scrollTo(0, 0);
    } else {
      setIsHomePage(false);
      window.scrollTo(0, 0);
      console.log("set menu change route");
    }
  }, [location.pathname]);
  console.log("menu outside is", menu);
  useEffect(() => {
    console.log("useeffect 2: set scroll when isHomePage changes");
    console.log("isHomePage in useeffect 2 is", isHomePage);
    currentIsHomePage.current = isHomePage;
    if (!isHomePage) {
      setScroll("new-navbar");
    } else {
      setScroll("");
    }
  }, [isHomePage]);
  //   useEffect(() => {
  //     if (scroll === "new-navbar") {
  //       console.log("scroll is new-navbar");
  //     } else if (scroll === "") {
  //       console.log("scroll is empty");
  //     }
  //   });
  const handleScroll = useCallback(() => {
    console.log("isHomePage in handleScroll", isHomePage);
    console.log("currentIsHomePage in handleScroll", currentIsHomePage.current);
    if (currentIsHomePage.current) {
      if (window.scrollY <= 5) {
        setScroll("");
        setHrFullWidth(false);
      } else if (window.scrollY < 235) {
        setScroll("show-border-bottom");
        setHrFullWidth(true);
      } else {
        setScroll("new-navbar");
        setHrFullWidth(true);
      }
    } else {
      if (window.scrollY <= 5) {
        // setScroll("new-navbar");
        setHrFullWidth(false);
      }
      if (window.scrollY > 5) {
        // setScroll("new-navbar");
        setHrFullWidth(true);
      }
    }
  }, []);

  useEffect(() => {
    console.log("component mounts");
    window.addEventListener("scroll", handleScroll);
    return () => {
      console.log("component unmounts");
      return window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    console.log("component rerenders");
  });
  useEffect(() => {
    console.log("handleScroll changes new reference");
  }, []);
  useEffect(() => {
    if (location.pathname === "/") return;
    console.log(
      "useEffect triggered with location.pathname:",
      location.pathname
    );
    console.log("restaurantState in navbar is", restaurantState);
    const cityName = extractCityName(location.pathname);
    const restaurantName = extractRestaurantName(location.pathname);
    const attractionName = extractAttractionName(location.pathname);
    const tourName = extractTourName(location.pathname);
    console.log("attractionName is", attractionName);
    console.log(
      `match string attractionName is /cities/${replaceWhiteSpaceWithUnderScore(
        cityName
      )}/attractions/${replaceWhiteSpaceWithUnderScore(attractionName)}`
    );
    console.log("restaurantName in navbar is", restaurantName);
    console.log("cityName in navbar is", cityName);
    console.log(
      "match string",
      `/cities/${replaceWhiteSpaceWithUnderScore(
        cityState
      )}/restaurants/${replaceWhiteSpaceWithUnderScore(restaurantName)}`
    );
    if (cityName && cityName !== cityState) {
      console.log("cityName !== cityState");
      checkAndSetCityState(replaceUnderScoreWithWhiteSpace(cityName));
    }
    if (restaurantName && restaurantName !== restaurantState) {
      checkAndSetCityState(replaceUnderScoreWithWhiteSpace(cityName));
      setRestaurantState(restaurantName);
    }
    switch (location.pathname) {
      case "/cities":
        setMenu("city");
        setCityState("");
        break;
      case `/cities/${replaceWhiteSpaceWithUnderScore(cityName)}`:
        setMenu("city");
        console.log("menu here is", menu);
        console.log("cityState here is", cityState);
        break;
      case "/restaurants":
        setMenu("restaurants");
        break;
      case `/cities/${replaceWhiteSpaceWithUnderScore(cityName)}/restaurants`:
      case `/cities/${replaceWhiteSpaceWithUnderScore(
        cityName
      )}/restaurants/${replaceWhiteSpaceWithUnderScore(restaurantName)}`:
        setMenu("restaurants");
        break;
      case "/things-to-do":
        setMenu("things_to_do");
        break;
      case `/cities/${replaceWhiteSpaceWithUnderScore(cityName)}/things-to-do`:
        setMenu("things_to_do");
        break;
      case `/cities/${replaceWhiteSpaceWithUnderScore(cityName)}/attractions`:
      case `/cities/${replaceWhiteSpaceWithUnderScore(
        cityName
      )}/attractions/${replaceWhiteSpaceWithUnderScore(attractionName)}`:
        setMenu("things_to_do");
        break;
      case `/cities/${replaceWhiteSpaceWithUnderScore(cityName)}/tours`:
      case `/cities/${replaceWhiteSpaceWithUnderScore(
        cityName
      )}/tours/${replaceWhiteSpaceWithUnderScore(tourName)}`:
        setMenu("things_to_do");
        break;
      case "/travel-categories":
        setMenu("travel_category");
        break;
      case "/travel-destinations":
        setMenu("travel_destinations");
        break;
      case "/tours":
        setMenu("tour");
        break;
      case "/travel-tips":
        setMenu("travel_tips");
        break;
      default:
        setMenu("");
    }
  }, [location.pathname]);
  return (
    <div className="navbar-container">
      <div className={`navbar ${scroll}`}>
        <div className={`row-1 ${scroll}`}>
          <a href="/">
            <img src={assets.logo} alt="logo image" className="logo" />
          </a>
          {scroll === "new-navbar" && (
            <div className="search-bar-container">
              <div className="row">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="text" placeholder="Search..." />
              </div>
            </div>
          )}

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/discover">Discover</Link>
            </li>
            <li>Travel Tips</li>
            {scroll !== "new-navbar" && <li>More</li>}
          </ul>
          {isAuthenticated && user ? (
            <div className="navbar-profile">
              <img
                src={userFromDb?.imageUrl ? userFromDb.imageUrl : user.picture}
                alt="user profile picture"
                className="navbar-profile-img"
              />
              <ul className="navbar-profile-dropdown">
                <li>
                  <Link to={`/users/${user.nickname}/profile`}>Profile</Link>
                </li>
                <hr />
                <li
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Sign out
                </li>
              </ul>
            </div>
          ) : (
            <button onClick={() => loginWithRedirect()}>Sign in</button>
          )}
        </div>
        {scroll === "new-navbar" && (
          <div className="row-2">
            <ul>
              <li className={menu === "city" ? "active" : ""}>
                <Link
                  to={
                    cityState
                      ? `/cities/${replaceWhiteSpaceWithUnderScore(cityState)}`
                      : "/cities"
                  }
                  onClick={() => setMenu("city")}
                >
                  {cityState ? cityState : "City"}
                </Link>
              </li>
              <li className={menu === "restaurants" ? "active" : ""}>
                <Link
                  to={
                    cityState
                      ? `/cities/${replaceWhiteSpaceWithUnderScore(
                          cityState
                        )}/restaurants`
                      : "/restaurants"
                  }
                  onClick={() => setMenu("restaurants")}
                >
                  Restaurants
                </Link>
              </li>
              <li className={menu === "things_to_do" ? "active" : ""}>
                <Link
                  to={
                    cityState
                      ? `/cities/${replaceWhiteSpaceWithUnderScore(
                          cityState
                        )}/things-to-do`
                      : "/things-to-do"
                  }
                  onClick={() => setMenu("things_to_do")}
                >
                  Things to do
                </Link>
              </li>
              <li className={menu === "travel_category" ? "active" : ""}>
                <Link
                  to="/travel-categories"
                  onClick={() => setMenu("travel_category")}
                >
                  Travel Category
                </Link>
              </li>
              <li className={menu === "travel_destinations" ? "active" : ""}>
                <Link
                  to="/travel-destinations"
                  onClick={() => setMenu("travel_destinations")}
                >
                  Travel Destinations
                </Link>
              </li>
              <li className={menu === "tour" ? "active" : ""}>
                <Link to="/tours" onClick={() => setMenu("tour")}>
                  Tour
                </Link>
              </li>
              <li className={menu === "travel_tips" ? "active" : ""}>
                <Link to="/travel-tips" onClick={() => setMenu("travel_tips")}>
                  Travel Tips
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      {!isHomePage ? (
        <hr className={hrFullWidth ? "full-width" : ""} />
      ) : (
        <hr className={scroll !== "" ? "full-width" : "no-hr"} />
      )}
    </div>
  );
};

export default Navbar;
