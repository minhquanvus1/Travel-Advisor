import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="back-home-button">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
