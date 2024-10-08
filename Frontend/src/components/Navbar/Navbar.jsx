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
import { UserContext } from "../../context/UserContextProvider";
import NotificationIcon from "../NotificationIcon/NotificationIcon";

const Navbar = ({
  restaurantState,
  setRestaurantState,
  role,
  newNotificationCount,
  setNewNotificationCount,
}) => {
  const { loginWithRedirect, user, isAuthenticated, logout, isLoading } =
    useAuth0();
  const [scroll, setScroll] = useState("");
  const [hrFullWidth, setHrFullWidth] = useState(false);
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(true);
  const [menu, setMenu] = useState("");
  const { cityState, setCityState, checkAndSetCityState } =
    useContext(CityContext);
  const { userFromDb, userFromDbLoading, userFromDbError } =
    useContext(UserContext);
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

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      localStorage.removeItem("bookingDetails");
    }
  }, [isAuthenticated, isLoading]);

  console.log("user is ", user);

  const extractCityName = useCallback(
    (pathname) => {
      const pathParts = pathname.split("/");

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
  // if (isLoading || userFromDbLoading) return <div>Loading...</div>;
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
              {role && role === "Admin" ? (
                <Link to="/admin">Admin</Link>
              ) : (
                <Link to="/discover">Discover</Link>
              )}
            </li>
            <li>Travel Tips</li>
            {scroll !== "new-navbar" && <li>More</li>}

            <NotificationIcon
              newNotificationCount={newNotificationCount}
              setNewNotificationCount={setNewNotificationCount}
            ></NotificationIcon>
          </ul>
          {isAuthenticated && user ? (
            <div className="navbar-profile">
              {!Array.isArray(userFromDb) && userFromDb && (
                <img
                  src={userFromDb.imageUrl}
                  alt="user profile picture"
                  className="navbar-profile-img"
                />
              )}
              {Array.isArray(userFromDb) && userFromDbError && (
                <img
                  src={user.picture}
                  alt="user profile picture"
                  className="navbar-profile-img"
                />
              )}

              <ul className="navbar-profile-dropdown">
                {/* {!Array.isArray(userFromDb) && userFromDb && (
                  <>
                    <li>
                      <Link to={`/users/${user.nickname}/profile`}>
                        Profile
                      </Link>
                    </li>
                    <hr />
                  </>
                )} */}
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
