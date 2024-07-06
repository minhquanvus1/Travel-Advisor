import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cities from "./pages/Cities/Cities";
import City from "./pages/City/City";
import Restaurants from "./pages/Restaurants/Restaurants";
import TravelDestinations from "./pages/TravelDestinations/TravelDestinations";
import BackToTopButton from "./components/BackToTopButton/BackToTopButton";

const App = () => {
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000) {
        setShowBackToTopButton(true);
      } else {
        setShowBackToTopButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a" />
        </Routes>
      </div>
      <Routes>
        <Route path="/cities" element={<Cities />} />
        <Route path="/cities/:cityName" element={<City />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/travel-destinations" element={<TravelDestinations />} />
      </Routes>
      {showBackToTopButton && <BackToTopButton />}
    </div>
  );
};

export default App;
