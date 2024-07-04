import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cities from "./pages/Cities/Cities";
import City from "./pages/City/City";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/cities/:cityName" element={<City />} />
          <Route path="/a" />
        </Routes>
      </div>
    </div>
  );
};

export default App;
