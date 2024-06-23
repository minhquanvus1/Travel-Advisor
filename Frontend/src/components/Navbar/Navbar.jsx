import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <a href="/">
        <img src={assets.logo} alt="logo image" className="logo" />
      </a>
      <ul>
        <li>Home</li>
        <li>Discover</li>
        <li>Travel Tips</li>
        <li>More</li>
      </ul>
      <button>Sign in</button>
    </div>
  );
};

export default Navbar;
