import React, { useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  Map,
  Marker,
  FullscreenControl,
  AttributionControl,
  GeolocateControl,
  NavigationControl,
  Popup,
} from "react-map-gl";

const mapboxAccessToken = import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN;

const Mapbox = ({
  latitude = 11.061,
  longitude = 106.526,
  zoom = 8,
  locationName = "Cu Chi Tunnels",
}) => {
  const [showPopup, setShowPopup] = useState(true);
  const [viewState, setViewState] = useState({
    latitude: latitude,
    longitude: longitude,
    zoom: zoom,
  });
  console.log("showpopup is", showPopup);
  return (
    <Map
      {...viewState}
      onMove={(event) => setViewState(event.viewState)}
      style={{ width: "100%", minHeight: "30vw" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={mapboxAccessToken}
    >
      <Marker latitude={latitude} longitude={longitude}>
        <div
          className="custom-marker"
          style={{ fontSize: "30px", cursor: "pointer" }}
          onClick={(e) => {
            // use e.stopPropagation() here to stop the onClick event from propagating to the event listener of the parent elements, which is the <Map/> that has the closeOnClick() event listener defined in the <Popup/>, so that we can prevent the Popup from opening the closing immediately that it seems like it does not open
            e.stopPropagation();
            setShowPopup((prevShowPopup) => !prevShowPopup);
          }}
          onMouseEnter={() => setShowPopup(true)}
        >
          📍
        </div>
      </Marker>
      {showPopup && (
        <Popup
          latitude={latitude}
          longitude={longitude}
          anchor="bottom"
          onClose={() => setShowPopup(false)}
          closeButton={true}
          // this closeOnClick is the event listener of the <Map/>, so that when we click ANYWHERE ON THE MAP, the Popup will close
          //   closeOnClick={false}
          offset={15}
        >
          <div
            style={{
              background: "tomato",
              padding: "20px",
              border: "1px solid #000",
            }}
          >
            {locationName}
          </div>
        </Popup>
      )}
      <FullscreenControl />
      <AttributionControl customAttribution="Map design by me" />
      <GeolocateControl />
      <NavigationControl />
    </Map>
  );
};

export default Mapbox;
