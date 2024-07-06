import React, { useEffect } from "react";
import "./InteractiveMap.css";
import { assets } from "../../assets/assets";

const InteractiveMap = () => {
  useEffect(() => {
    // $(function () {
    //   $(".maparea").maphilight({
    //     fade: false,
    //     stroke: true,
    //     strokeWidth: 0.7,
    //     strokeOpacity: 3,
    //     strokeColor: "black",
    //     fill: false,
    //     shadow: true,
    //     shadowX: 7,
    //     shadowY: 3,
    //   });
    // });
    $(function () {
      $(".maparea").maphilight({
        fillColor: "008800",
        stroke: true,
        fade: false,
        fillOpacity: 0.6,
        strokeWidth: 2,
        strokeColor: "#ffffff",
        strokeOpacity: 1,
        shadow: true,
        shadowX: 5,
        shadowY: 4,
        shadowOpacity: 0.8,
      });
    });
  }, []);
  return (
    <div className="vietnam-map">
      <img
        src={assets.vietnam_map}
        alt="vietnam map"
        useMap="#image-map"
        className="maparea"
      />
      <map name="image-map" id="image-map">
        <area
          target=""
          alt="northern"
          title="northern"
          href="/northern-vietnam"
          coords="27,14,34,14,42,20,47,14,56,16,61,13,63,6,70,3,75,2,79,4,84,6,88,10,95,10,107,12,103,22,107,26,107,35,115,37,120,42,129,45,138,48,125,57,113,65,106,72,99,79,22,65,9,22,1,25,4,30,8,33,12,38,6,20"
          shape="poly"
          id="northern"
        />

        <area
          target=""
          alt="central"
          title="central"
          href="/central-vietnam"
          coords="125,274,127,264,127,250,125,237,124,225,127,216,127,206,125,197,119,189,123,180,111,177,105,167,99,156,91,150,83,140,78,128,67,122,58,114,48,106,43,98,51,91,58,90,64,84,58,74,65,73,72,74,77,74,83,77,89,82,85,114,108,140,111,148,115,154,122,158,127,163,129,168,135,172,142,175,147,182,149,189,153,194,159,202,163,213,164,222,167,230,167,240,169,247,173,259,168,270,168,275,168,287,163,295,155,303,148,306,141,311,133,317,119,273"
          shape="poly"
          id="central"
        />

        <area
          target=""
          alt="southern"
          title="southern"
          href="/southern-vietnam"
          coords="107,280,87,287,79,305,67,311,56,303,55,313,64,331,61,338,63,346,63,353,60,360,74,364,83,356,91,351,100,344,106,343,107,338,111,327,120,323,130,326,134,318,119,273"
          shape="poly"
          id="southern"
        />
      </map>
    </div>
  );
};

export default InteractiveMap;
