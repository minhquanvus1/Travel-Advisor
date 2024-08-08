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
import Tours from "./pages/Tours/Tours";
import RestaurantsInACity from "./pages/RestaurantsInACity/RestaurantsInACity";
import RestaurantInACity from "./pages/RestaurantInACity/RestaurantInACity";
import ThingsToDoInACity from "./pages/ThingsToDoInACity/ThingsToDoInACity";
import AttractionInACity from "./pages/AttractionInACity/AttractionInACity";
import TourInACity from "./pages/TourInAcity/TourInACity";
import Footer from "./components/Footer/Footer";
import ThingsToDo from "./pages/ThingsToDo/ThingsToDo";

const App = () => {
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);
  const [restaurantState, setRestaurantState] = useState(() => {
    const restaurantStateFromLocalStorage =
      localStorage.getItem("restaurantState");
    return restaurantStateFromLocalStorage
      ? restaurantStateFromLocalStorage
      : "";
  });
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
      <Navbar
        restaurantState={restaurantState}
        setRestaurantState={setRestaurantState}
      />
      <div className="app">
        <Routes>
          <Route path="/a" />
        </Routes>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/cities/:cityName" element={<City />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/travel-destinations" element={<TravelDestinations />} />
        <Route path="/things-to-do" element={<ThingsToDo />} />
        <Route path="/tours" element={<Tours />} />
        <Route
          path="/cities/:cityName/restaurants"
          element={<RestaurantsInACity />}
        />
        <Route
          path="/cities/:cityName/restaurants/:restaurantName"
          element={
            <RestaurantInACity
              restaurantState={restaurantState}
              setRestaurantState={setRestaurantState}
            />
          }
        />
        <Route
          path="/cities/:cityName/things-to-do"
          element={<ThingsToDoInACity />}
        />
        <Route
          path="/cities/:cityName/attractions/:attractionName"
          element={<AttractionInACity />}
        />
        <Route
          path="/cities/:cityName/tours/:tourName"
          element={<TourInACity />}
        />
      </Routes>
      {showBackToTopButton && <BackToTopButton />}
      <Footer></Footer>
    </div>
  );
};

export default App;
