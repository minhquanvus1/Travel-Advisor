import React, { useState, useEffect } from "react";
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

const Mapbox = ({ zoom = 8, stops }) => {
  const [showPopup, setShowPopup] = useState(true);
  const [selectedStop, setSelectedStop] = useState([]);
  const [viewState, setViewState] = useState({
    latitude: stops[0].latitude,
    longitude: stops[0].longitude,
    zoom: zoom,
  });
  console.log("stops are", stops);
  console.log("showpopup is", showPopup);
  console.log("selectedTop is", selectedStop);
  useEffect(() => {
    setSelectedStop(stops);
  }, [stops]);
  return (
    <Map
      {...viewState}
      onMove={(event) => setViewState(event.viewState)}
      style={{ width: "100%", minHeight: "30vw", maxHeight: "50vw" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={mapboxAccessToken}
    >
      {stops.length > 0 &&
        stops.map((stop) => {
          return (
            <React.Fragment key={stop.id}>
              <Marker latitude={stop.latitude} longitude={stop.longitude}>
                <div
                  className="custom-marker"
                  style={{ fontSize: "30px", cursor: "pointer" }}
                  onClick={(e) => {
                    // use e.stopPropagation() here to stop the onClick event from propagating to the event listener of the parent elements, which is the <Map/> that has the closeOnClick() event listener defined in the <Popup/>, so that we can prevent the Popup from opening the closing immediately that it seems like it does not open
                    e.stopPropagation();
                    setShowPopup((prevShowPopup) => !prevShowPopup);
                    // setSelectedStop((prevStop) =>
                    //   prevStop?.id !== stop.id ? stop : null
                    // );
                    setSelectedStop((prevStops) =>
                      prevStops.some((prevStop) => prevStop.id === stop.id)
                        ? prevStops.filter(
                            (prevStop) => prevStop.id !== stop.id
                          )
                        : [...prevStops, stop]
                    );
                  }}
                  onMouseEnter={() => {
                    setShowPopup(true);
                    // setSelectedStop(stop);
                    setSelectedStop((prevStops) =>
                      prevStops.some((prevStop) => prevStop.id === stop.id)
                        ? prevStops
                        : [...prevStops, stop]
                    );
                  }}
                >
                  📍
                </div>
              </Marker>
              {selectedStop.some((selected) => selected.id === stop.id) && (
                <Popup
                  latitude={stop.latitude}
                  longitude={stop.longitude}
                  anchor="bottom"
                  onClose={() => {
                    setShowPopup(false);
                    setSelectedStop((prevStops) =>
                      prevStops.filter((prevStop) => prevStop.id !== stop.id)
                    );
                  }}
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
                    {stop.name}
                  </div>
                </Popup>
              )}
            </React.Fragment>
          );
        })}

      <FullscreenControl />
      <AttributionControl customAttribution="Map design by me" />
      <GeolocateControl />
      <NavigationControl />
    </Map>
  );
};

export default Mapbox;
