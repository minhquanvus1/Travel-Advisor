import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scroll, setScroll] = useState("");
  const [hrFullWidth, setHrFullWidth] = useState(false);
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(true);
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
    console.log("useeffect 1: set isHomePage when pathname changes");
    if (location.pathname === "/") {
      setIsHomePage(true);
    } else {
      setIsHomePage(false);
    }
  }, [location.pathname]);
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
              <Link to="/a">Discover</Link>
            </li>
            <li>Travel Tips</li>
            {scroll !== "new-navbar" && <li>More</li>}
          </ul>
          <button>Sign in</button>
        </div>
        {scroll === "new-navbar" && (
          <div className="row-2">
            <ul>
              <li>City</li>
              <li>Restaurants</li>
              <li>Travel Category</li>
              <li>Travel Destinations</li>
              <li>Tour</li>
              <li>Travel Tips</li>
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
