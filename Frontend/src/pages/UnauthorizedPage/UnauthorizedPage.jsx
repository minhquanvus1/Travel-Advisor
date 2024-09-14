import React from "react";
import "./UnauthorizedPage.css";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="unauthorized-page">
      <div className="unauthorized-content">
        <h1>403</h1>
        <h2>Unauthorized Access</h2>
        <p>You do not have permission to access this page.</p>
        <Link to="/" className="back-home-button">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
