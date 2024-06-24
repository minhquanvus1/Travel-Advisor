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
      <a href="/">
        <img src={assets.logo} alt="logo image" className="logo" />
      </a>
      <ul>
        <li>Home</li>
        <li>Discover</li>
        <li>Travel Tips</li>
        {scroll !== "new-navbar" && <li>More</li>}
      </ul>
      <button>Sign in</button>
    </div>
  );
};

export default Navbar;
