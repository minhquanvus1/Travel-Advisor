import React from "react";
import "./BackToTopButton.css";

const BackToTopButton = () => {
  return (
    <a className="back-to-top-button" href="#">
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.25 7.69a.75.75 0 101 1.12l5-4.4v12.84a.75.75 0 001.5 0V4.41l5 4.4a.75.75 0 001-1.12l-6.25-5.5a.75.75 0 00-1 0l-6.25 5.5z"></path>
      </svg>
      <p>Back to top</p>
    </a>
  );
};

export default BackToTopButton;
