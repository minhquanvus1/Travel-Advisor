import React, { useEffect } from "react";
import "./Home.css";
import Searchbar from "../../components/Searchbar/Searchbar";
import Header from "../../components/Header/Header";
import InteractiveMap from "../../components/InteractiveMap/InteractiveMap";

const Home = () => {
  useEffect(() => {
    console.log("home mounts");
    return () => {
      console.log("home unmounts");
    };
  }, []);
  return (
    <div className="home">
      <div className="home-header-container">
        <Searchbar />
        <Header />
      </div>
      <div className="interactive-map-info-section">
        <InteractiveMap></InteractiveMap>
        <div className="interactive-map-info-card">
          <h4 className="title">
            One of Vietnam’s strongest draws is the diversity of its natural
            beauty and landscapes.
          </h4>
          <p className="description">
            The capital of Hanoi is your gateway to the treasures of the north:
            spectacular mountains, valleys and bays studded with limestone
            karsts. Smack in the centre, up-and-coming Danang is one of
            Vietnam’s most progressive cities. From here you have easy access to
            photogenic riverside towns, national parks and long, sandy beaches.
            The southern metropolis of Ho Chi Minh City will entice you with its
            cool culture and captivating streets (just watch out for those
            motorcycles.) Nearby, the Mekong Delta runs to the sea, passing
            on-the-water villages and mangrove forests along the way. And all
            down Vietnam's S-shaped coast, you’ll find islands big and small,
            just waiting to be explored.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
