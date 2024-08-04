import React from "react";
import "./ThingsToDo.css";
import TravelDestinationsHeader from "../../components/TravelDestinationsHeader/TravelDestinationsHeader";
import TravelDestinationsService from "../../components/TravelDestinationsService/TravelDestinationsService";
import { cities } from "../../assets/assets";
import { Link } from "react-router-dom";
import CityCard from "../../components/CityCard/CityCard";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";

const ThingsToDo = () => {
  return (
    <div className="things-to-do-section">
      <TravelDestinationsHeader></TravelDestinationsHeader>
      <div className="things-to-do">
        <TravelDestinationsService></TravelDestinationsService>
        <div className="top-destinations-section">
          <div className="top-destinations-container">
            <div className="title">Top destinations in Vietnam</div>
            <div className="restaurants-in-top-cities-list">
              {cities.length > 0 &&
                cities.map((city, index) => {
                  return (
                    <Link
                      to={`/cities/${replaceWhiteSpaceWithUnderScore(
                        city.name
                      )}/things-to-do`}
                      key={city.id}
                    >
                      <CityCard city={city}></CityCard>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThingsToDo;
