import React, { useState, useEffect } from "react";
import "./Cities.css";
import CitiesHeader from "../../components/CitiesHeader/CitiesHeader";
import { cities } from "../../assets/assets";
import CityCard from "../../components/CityCard/CityCard";
import ExpandableDescription from "../../components/ExpandableDescription/ExpandableDescription";
import { Link } from "react-router-dom";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";

const Cities = () => {
  //   const [isOpen, setIsOpen] = useState(false);
  //   const [showReadMoreButton, setShowReadMoreButton] = useState(false);
  console.log("cities are", cities);
  const text = `Vietnam's cities offer a harmonious blend of rich history, natural
          beauty, and vibrant urban life. In no short supply of cultural and
          natural wonders, these cities reign supreme in captivating travelers'
          hearts. Ho Chi Minh City is the pièce de résistance for food
          enthusiasts, with guided tours delving into its culinary delights. You
          could do worse than visit the historic Hoi Truong Thong Nhat Palace
          and the intricately adorned Emperor Jade Pagoda. For nature lovers,
          the mountains of Sapa and the primeval landscape of Cuc Phuong
          National Park are a trekker’s paradise. Vietnam's cities seamlessly
          combine the allure of urban life with the serenity of nature, ensuring
          unforgettable experiences at every turn. `;
  //   useEffect(() => {
  //     setShowReadMoreButton(text.length > 100);
  //   }, []);
  return (
    <div className="cities">
      <CitiesHeader></CitiesHeader>
      <div className="description-container">
        <h2>Cities, Vietnam</h2>
        <ExpandableDescription
          text={text}
          lineClamp={3}
        ></ExpandableDescription>
      </div>
      {/* <div className="cities-description">
        <h2>Cities, Vietnam</h2>
        <p className={isOpen ? "expanded" : ""}>{text}</p>
        {showReadMoreButton && (
          <div onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <div className="expand-button">
                <p>Read less</p>
                <i className="fas fa-chevron-up"></i>
              </div>
            ) : (
              <div className="expand-button">
                <p>Read more</p>
                <i className="fas fa-chevron-down"></i>
              </div>
            )}
          </div>
        )}
      </div> */}
      <div className="cities-list">
        {cities.length > 0 &&
          cities.map((city, index) => {
            return (
              <Link
                to={`/cities/${replaceWhiteSpaceWithUnderScore(city.name)}`}
                className="city-link"
                key={city.id}
              >
                <CityCard city={city}></CityCard>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Cities;
