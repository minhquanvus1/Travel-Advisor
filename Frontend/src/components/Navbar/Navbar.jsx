import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scroll, setScroll] = useState("");
  const handleScroll = () => {
    if (window.scrollY <= 5) {
      setScroll("");
    } else if (window.scrollY < 235) {
      setScroll("show-border-bottom");
    } else {
      setScroll("new-navbar");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
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
          <li>Home</li>
          <li>Discover</li>
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
  );
};

export default Navbar;
