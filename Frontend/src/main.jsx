import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import CityContextProvider from "./context/CityContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CityContextProvider>
        <App />
      </CityContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
