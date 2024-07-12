import React, { useContext } from "react";
import "./SmallCard.css";
import { Link } from "react-router-dom";
import { CityContext } from "../../context/CityContextProvider";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";

const SmallCard = ({ cardTitle, imageUrl, numberOfReviews }) => {
  const { cityState } = useContext(CityContext);
  return (
    <Link
      to={`/cities/${replaceWhiteSpaceWithUnderScore(
        cityState
      )}/restaurants/${replaceWhiteSpaceWithUnderScore(cardTitle)}`}
      className="city-link"
    >
      <div className="small-card">
        <div className="image-container">
          <img src={imageUrl} alt={`${cardTitle} image`} />
        </div>
        <div className="card-contents">
          <div className="card-title">{cardTitle}</div>
          <div className="card-rating-count">
            <svg
              viewBox="0 0 128 24"
              width="68"
              height="12"
              aria-labelledby=":lithium-Rlokd979qilt5vlq:"
            >
              <title id=":lithium-Rlokd979qilt5vlq:"></title>
              <path
                d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z"
                transform=""
              ></path>
              <path
                d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z"
                transform="translate(26 0)"
              ></path>
              <path
                d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z"
                transform="translate(52 0)"
              ></path>
              <path
                d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z"
                transform="translate(78 0)"
              ></path>
              <path
                d="M 12 0C5.389 0 0 5.389 0 12c0 6.62 5.389 12 12 12 6.62 0 12-5.379 12-12S18.621 0 12 0zm0 2a9.984 9.984 0 0110 10 9.976 9.976 0 01-10 10z"
                transform="translate(104 0)"
              ></path>
            </svg>
            <span>{numberOfReviews}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SmallCard;
