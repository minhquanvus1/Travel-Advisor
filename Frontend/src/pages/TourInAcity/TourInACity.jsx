import React, { useState, useEffect } from "react";
import "./TourInACity.css";
import ExpandableDescription from "../../components/ExpandableDescription/ExpandableDescription";
import { Link, useParams } from "react-router-dom";
import Mapbox from "../../components/MapBox/Mapbox";
import { stops as allStops, tours, attractions } from "../../assets/assets";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";
const TourInACity = () => {
  const [toggleAccordion, setToggleAccordion] = useState("");
  const [tour, setTour] = useState(tours[0]);
  const [stops, setStops] = useState([]);
  const { cityName, tourName } = useParams();
  console.log("tourName is", tourName);
  const cityState = localStorage.getItem("cityState");
  console.log("cityState in tourInACity is", cityState);
  if (
    !tours.find(
      (tour) => replaceWhiteSpaceWithUnderScore(tour.tourName) === tourName
    )
  ) {
    return <div>{`This ${tourName} does not exist`}</div>;
  }
  const findAllStopsOfThisTour = () => {
    const foundStops = allStops.filter((stop) => stop.tourId === tours[0].id);
    const stopsArray = foundStops.map((foundStop) => {
      const matchingAttraction = attractions.find(
        (attraction) =>
          attraction.attractionName.trim().toLowerCase() ===
          foundStop.stopName.trim().toLowerCase()
      );
      if (matchingAttraction) {
        return {
          ...foundStop,
          isAttraction: true,
          imageUrl: matchingAttraction.imageUrl,
          attractionName: matchingAttraction.attractionName,
          numberOfReviews: matchingAttraction.numberOfReviews,
        };
      }
      return foundStop;
    });
    console.log("stops in function are", stopsArray);
    return stopsArray;
  };
  useEffect(() => {
    const stopsArray = findAllStopsOfThisTour();
    setStops(stopsArray);
  }, [allStops]);
  console.log("stops in city are", stops);
  return (
    <div className="tour-section">
      <div className="tour-header-container">
        <div className="tour-title-container">
          <h1 className="tour-title">{tour.tourName}</h1>
          <div className="icons-container">
            <div className="icon-wrapper">
              <svg viewBox="0 0 24 24" width="20px" height="20px">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 .94l4.102 4.101-1.06 1.06-2.292-2.29V12.5h-1.5V3.81L8.959 6.103l-1.061-1.06L12 .938zM4.043 8.301C4.505 7.73 5.2 7.25 6.003 7.25H8v1.5H6.004c-.196 0-.503.134-.793.494-.28.347-.461.81-.461 1.256v7.956c0 1.17.72 1.794 1.254 1.794h11.992c.538 0 1.254-.628 1.254-1.794V10.5c0-.448-.18-.91-.46-1.257-.289-.359-.595-.493-.794-.493H16v-1.5h1.996c.806 0 1.501.48 1.963 1.052.47.585.791 1.372.791 2.198v7.956c0 1.638-1.072 3.294-2.754 3.294H6.004c-1.674 0-2.754-1.645-2.754-3.294V10.5c0-.826.322-1.614.793-2.198z"
                ></path>
              </svg>
            </div>
            <div className="icon-wrapper">
              <svg viewBox="0 0 24 24" width="20px" height="20px">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.798 5.786A5.769 5.769 0 017.72 4.25c1.455 0 2.857.548 3.922 1.536l.005.005.341.322.332-.317a5.769 5.769 0 013.928-1.54c1.458 0 2.862.55 3.928 1.54l.004.004c1.093 1.032 1.599 2.324 1.569 3.662-.03 1.323-.578 2.643-1.5 3.785-.884 1.096-2.85 2.943-4.547 4.478a183.566 183.566 0 01-3.153 2.785l-.069.059-.489-.569.49.569-.486.416-.488-.412a101.98 101.98 0 01-7.75-7.288l-.021-.021-.02-.023c-1.725-2.115-2.203-5.32.08-7.453l.002-.002zm8.19 13.226a174.415 174.415 0 002.708-2.4c1.72-1.556 3.59-3.32 4.385-4.306.757-.939 1.148-1.948 1.168-2.877.02-.912-.313-1.795-1.097-2.536a4.269 4.269 0 00-2.904-1.138 4.269 4.269 0 00-2.903 1.136l-1.35 1.292-1.375-1.3a4.269 4.269 0 00-2.9-1.133 4.269 4.269 0 00-2.901 1.135c-1.507 1.408-1.353 3.659.042 5.385a100.45 100.45 0 007.127 6.742z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="number-of-reviews-and-subcategory">
          <div className="number-of-reviews-container">
            <svg
              viewBox="0 0 128 24"
              width="88"
              height="16"
              aria-labelledby=":lithium-r2s:"
              className="rating-stars"
            >
              <title id=":lithium-r2s:"></title>
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
            <span className="number-of-reviews">
              {tour.numberOfReviews.toLocaleString("en-US")} reviews
            </span>
          </div>
        </div>
      </div>
      <div className="tour-details-container">
        <div className="tour-hero-container">
          <div className="tour-image-left">
            <img
              src={tour.imageObject.primaryImage.imageUrl}
              alt={`${tour.tourName} image left`}
            />
          </div>
          {tour.imageObject.images.length > 0 &&
            tour.imageObject.images.map((image, index) => {
              return index === 0 ? (
                <div key={index} className="tour-image-top-right">
                  <img
                    src={image.imageUrl}
                    alt={`${tour.tourName} image top right`}
                  />
                </div>
              ) : (
                <div key={index} className="tour-image-bottom-right">
                  <img
                    src={image.imageUrl}
                    alt={`${tour.tourName} image bottom right`}
                  />
                </div>
              );
            })}
        </div>
        <div className="tour-primary-details-container">
          <div className="about-container">
            <div className="about-title">About</div>
            <ExpandableDescription
              text={tour.description}
              lineClamp={3}
            ></ExpandableDescription>
          </div>
          <div className="price-container">
            from <span className="price-value">${tour.price}</span> per adult
            (price varies by group size)
          </div>
          <div className="booking-benefits-container">
            <span className="benefit-icon">
              <svg viewBox="0 0 24 24" width="12px" height="12px">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.852 8.245l-1.16-4.051a.5.5 0 00-.619-.344L2.205 8.108a.498.498 0 00-.226.137h16.873zm-6.44-1.5h4.45l-.337-1.177-4.112 1.177z"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.48 8.874v10.764h17V8.874h-17zm-1-1.5a.5.5 0 00-.5.5v12.764a.5.5 0 00.5.5h19a.5.5 0 00.5-.5V7.874a.5.5 0 00-.5-.5h-19z"
                ></path>
                <path d="M18.852 13.775a1.15 1.15 0 11-2.299 0 1.15 1.15 0 012.299 0z"></path>
              </svg>
            </span>
            <span className="booking-benefits">
              <span className="booking-benefit">
                <span className="booking-benefit-text">
                  Lowest price guarantee
                </span>
              </span>
              <span className="booking-benefit">
                <span className="booking-benefit-text">
                  Reserve now & pay later
                </span>
              </span>
              <span className="booking-benefit">
                <span className="booking-benefit-text">Free cancellation</span>
              </span>
            </span>
          </div>
          <hr />
          <div className="tour-general-details-container">
            <div className="age">
              <svg viewBox="0 0 24 24" width="18px" height="18px">
                <path d="M12 12.28l-.008.75h.02L12 12.28zM2 18.51h-.75v.752l.752-.002L2 18.51zm0-2.92l-.585-.469-.165.206v.263H2zm3.855-1.85v.75-.75zm3.855 1.85h.75v-.263l-.165-.206-.585.469zm0 2.9l.002.75.748-.002v-.748h-.75zm4.6.02h-.75v.752l.752-.002-.002-.75zm0-2.92l-.585-.469-.165.206v.263h.75zm3.855-1.85v.75-.75zm3.855 1.85h.75v-.263l-.165-.206-.585.469zm0 2.9l.002.75.748-.002v-.748h-.75zM13.27 7c0 .69-.56 1.25-1.25 1.25v1.5A2.75 2.75 0 0014.77 7h-1.5zm-1.25 1.25c-.69 0-1.25-.56-1.25-1.25h-1.5a2.75 2.75 0 002.75 2.75v-1.5zM10.77 7c0-.69.56-1.25 1.25-1.25v-1.5A2.75 2.75 0 009.27 7h1.5zm1.25-1.25c.69 0 1.25.56 1.25 1.25h1.5a2.75 2.75 0 00-2.75-2.75v1.5zm-3.267 8.802a4.11 4.11 0 011.445-1.132l-.638-1.357a5.61 5.61 0 00-1.973 1.545l1.166.944zm1.445-1.132a4.11 4.11 0 011.794-.39l.016-1.5a5.61 5.61 0 00-2.448.533l.638 1.357zm1.815-.39a4.1 4.1 0 011.814.39l.639-1.358a5.6 5.6 0 00-2.479-.532l.026 1.5zm1.814.39a4.1 4.1 0 011.457 1.148l1.172-.936a5.6 5.6 0 00-1.99-1.57l-.639 1.357zM2.75 18.51v-2.92h-1.5v2.92h1.5zm-.165-2.451a4.19 4.19 0 011.456-1.157l-.649-1.352a5.69 5.69 0 00-1.977 1.571l1.17.938zm1.456-1.157a4.19 4.19 0 011.814-.413v-1.5a5.69 5.69 0 00-2.463.56l.65 1.353zm1.814-.413a4.19 4.19 0 011.814.413l.649-1.352a5.69 5.69 0 00-2.463-.56v1.5zm1.814.413a4.19 4.19 0 011.456 1.157l1.17-.938a5.69 5.69 0 00-1.977-1.571l-.65 1.352zm1.291.688v2.9h1.5v-2.9h-1.5zm.748 2.15l-7.71.02.004 1.5 7.71-.02-.004-1.5zM20.02 9c0 .69-.56 1.25-1.25 1.25v1.5A2.75 2.75 0 0021.52 9h-1.5zm-1.25 1.25c-.69 0-1.25-.56-1.25-1.25h-1.5a2.75 2.75 0 002.75 2.75v-1.5zM17.52 9c0-.69.56-1.25 1.25-1.25v-1.5A2.75 2.75 0 0016.02 9h1.5zm1.25-1.25c.69 0 1.25.56 1.25 1.25h1.5a2.75 2.75 0 00-2.75-2.75v1.5zM6.52 9c0 .69-.56 1.25-1.25 1.25v1.5A2.75 2.75 0 008.02 9h-1.5zm-1.25 1.25c-.69 0-1.25-.56-1.25-1.25h-1.5a2.75 2.75 0 002.75 2.75v-1.5zM4.02 9c0-.69.56-1.25 1.25-1.25v-1.5A2.75 2.75 0 002.52 9h1.5zm1.25-1.25c.69 0 1.25.56 1.25 1.25h1.5a2.75 2.75 0 00-2.75-2.75v1.5zm9.79 10.76v-2.92h-1.5v2.92h1.5zm-.165-2.451a4.19 4.19 0 011.457-1.157l-.65-1.352a5.69 5.69 0 00-1.977 1.571l1.17.938zm1.457-1.157a4.19 4.19 0 011.813-.413v-1.5a5.69 5.69 0 00-2.463.56l.65 1.353zm1.813-.413a4.19 4.19 0 011.814.413l.649-1.352a5.69 5.69 0 00-2.463-.56v1.5zm1.814.413a4.19 4.19 0 011.456 1.157l1.17-.938a5.691 5.691 0 00-1.977-1.571l-.65 1.352zm1.291.688v2.9h1.5v-2.9h-1.5zm.748 2.15l-7.71.02.004 1.5 7.71-.02-.004-1.5z"></path>
              </svg>
              <span className="age-details">
                {`Ages ${tour.minAge}-${tour.maxAge}, max of ${tour.maxGroupSize} per group`}
              </span>
            </div>
            <div className="duration">
              <svg viewBox="0 0 24 24" width="18px" height="18px">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.713 3.982a9.994 9.994 0 00-4.734 8.502c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.522-4.477-10-10-10v1.5a8.5 8.5 0 11-5.266 1.828v-1.83z"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.323 4.935h-3.55v-1.5h5.05v5.05h-1.5v-3.55zM11.333 13.034v-5.36h1.5v5.457c0 .312-.116.612-.326.842l-2.765 3.033-1.109-1.01 2.7-2.962z"
                ></path>
              </svg>
              <span className="duration-details">
                Duration: {tour.duration}h
              </span>
            </div>
            <div className="start-time">
              <svg viewBox="0 0 24 24" width="18px" height="18px">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3.75a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5zM2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm9-5.5h1.5v5.19l3.28 3.28-1.06 1.06-3.72-3.72V6.5z"
                ></path>
              </svg>
              <span className="start-time-details">
                Start time: check availability
              </span>
            </div>
            <div className="mobile-ticket">
              <svg viewBox="0 0 24 24" width="18px" height="18px">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.966 3.512v16.976h8.069V3.512h-8.07zm-.5-1.5a1 1 0 00-1 1v17.976a1 1 0 001 1h9.069a1 1 0 001-1V3.012a1 1 0 00-1-1h-9.07z"
                ></path>
                <path d="M11.986 3.832c-1.21 0-1.409-.53-1.358-.796h2.746c.041.266-.179.796-1.388.796z"></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.01 2.286h4.007l.098.635c.063.402-.09.862-.489 1.191-.386.319-.941.47-1.64.47-.697 0-1.254-.15-1.638-.477-.401-.342-.533-.815-.456-1.211l.118-.608z"
                ></path>
              </svg>
              <span className="mobile-ticket-details">Mobile ticket</span>
            </div>
            <div className="live-guide">
              <svg viewBox="0 0 24 24" width="18px" height="18px">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.654 10.255h4.178c-.07-1.591-.356-2.993-.766-4.017-.238-.594-.502-1.023-.756-1.293-.211-.223-.38-.3-.5-.32a6.56 6.56 0 00-.133 0c-.12.02-.29.097-.5.32-.255.27-.519.7-.756 1.293-.41 1.024-.697 2.426-.767 4.017zm-.374-5.14c-.09.18-.174.37-.252.565-.491 1.227-.805 2.825-.875 4.575H5.399a6.388 6.388 0 013.88-5.14zm2.301-1.99a7.883 7.883 0 00-7.726 7.88 7.88 7.88 0 007.883 7.886c.585 0 .872-.015 1.111-.074.123-.031.172-.05.213-.064.058-.02.099-.036.312-.073l-.26-1.478a3.842 3.842 0 00-.462.107c-.087.026-.113.035-.127.04a.286.286 0 01-.04.012c-.03.008-.132.03-.742.03-.122 0-.313-.06-.566-.327-.255-.27-.519-.7-.756-1.293-.41-1.024-.697-2.425-.767-4.016h4.203a4.673 4.673 0 01-.225 1.255l-.012.041-.005.016c-.033.113-.088.297-.099.478l1.498.088v.006s.007-.036.044-.162l.012-.04c.037-.125.089-.297.136-.504.072-.313.134-.698.152-1.178h2.734a4.156 4.156 0 01-.195.949c-.055.159-.11.28-.166.402l-.004.01a1.844 1.844 0 00-.171.507l1.484.219-.005.026s.012-.032.057-.13l.008-.018c.056-.123.137-.3.215-.53.168-.488.311-1.167.311-2.185a7.878 7.878 0 00-7.72-7.88 1.938 1.938 0 00-.325 0zm2.626 1.99c.09.181.173.37.252.565.49 1.227.804 2.825.875 4.575h2.749a6.384 6.384 0 00-3.876-5.14zM9.284 16.902a7.763 7.763 0 01-.256-.573c-.49-1.227-.805-2.824-.875-4.574H5.399a6.386 6.386 0 003.885 5.147z"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.833 12.778h-8.75v6.648h5.255l3.495 2.325v-8.973zm-1.5 1.5v4.673l-1.542-1.025h-4.209v-3.648h5.75z"
                ></path>
              </svg>
              <span className="live-guide-details">
                Live guide:{" "}
                {tour.languages
                  .map((language) => language.languageName)
                  .join(", ")}
              </span>
            </div>
          </div>
          <hr />
          <div className="highlights">
            <div className="highlights-title">Highlights</div>
            <ul>
              {tour.highlights.length > 0 &&
                tour.highlights.map((highlight) => {
                  return (
                    <li key={highlight.highlightID}>
                      {highlight.highlightText}
                    </li>
                  );
                })}
              <li>
                <a href="#itinerary">See itinerary</a>
              </li>
            </ul>
          </div>
          <hr />
          <div className="tour-accordion-container">
            <div
              className={`accordion-box ${
                toggleAccordion === "included" ? "active" : ""
              }`}
              onClick={() =>
                setToggleAccordion((prev) => {
                  return prev !== "included" ? "included" : "";
                })
              }
            >
              <div className="question">
                <span>What's included</span>
                <svg viewBox="0 0 24 24" width="20px" height="20px">
                  <path d="M18.4 16.6L12 10.2l-6.4 6.4-1.4-1.5L12 7.4l7.8 7.7-1.4 1.5z"></path>
                </svg>
              </div>
              <div className="answer">
                <div className="answer-wrapper">
                  <ul>
                    {tour.tourDetails.included.length > 0 &&
                      tour.tourDetails.included.map((item, index) => {
                        return <li key={index}>{item}</li>;
                      })}
                  </ul>
                  <div className="not-included">
                    <span>What's not included</span>
                    <ul>
                      {tour.tourDetails.notIncluded.length > 0 &&
                        tour.tourDetails.notIncluded.map((item, index) => {
                          return <li key={index}>{item}</li>;
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`accordion-box ${
                toggleAccordion === "expect" ? "active" : ""
              }`}
              onClick={() =>
                setToggleAccordion((prev) => {
                  return prev !== "expect" ? "expect" : "";
                })
              }
            >
              <div className="question">
                <span>What to expect</span>
                <svg viewBox="0 0 24 24" width="20px" height="20px">
                  <path d="M18.4 16.6L12 10.2l-6.4 6.4-1.4-1.5L12 7.4l7.8 7.7-1.4 1.5z"></path>
                </svg>
              </div>
              <div className="answer">
                <div className="answer-wrapper">
                  <span className="expect">
                    {tour.tourDetails.whatToExpect &&
                      tour.tourDetails.whatToExpect}
                  </span>
                </div>
              </div>
            </div>
            <div
              id="departure-and-return"
              className={`accordion-box ${
                toggleAccordion === "departure" ? "active" : ""
              }`}
              onClick={() =>
                setToggleAccordion((prev) => {
                  return prev !== "departure" ? "departure" : "";
                })
              }
            >
              <div className="question">
                <span>Departure and return</span>
                <svg viewBox="0 0 24 24" width="20px" height="20px">
                  <path d="M18.4 16.6L12 10.2l-6.4 6.4-1.4-1.5L12 7.4l7.8 7.7-1.4 1.5z"></path>
                </svg>
              </div>
              <div className="answer">
                <div className="answer-wrapper">
                  <div className="departure-item">
                    <span className="bullet-point">Start: </span>
                    <span>
                      {tour.tourDetails.departureAndReturn.start.description}
                    </span>
                  </div>
                  <div className="departure-item">
                    <svg viewBox="0 0 24 24" width="20px" height="20px">
                      <path d="M11.277 20.26l.53-.532-.53.532zm.035.035l.537-.524-.008-.008-.53.532zM12 21l-.537.524.529.542.537-.534L12 21zm.688-.684l.529.532.002-.002-.53-.53zm.303-8.458l-.287-.693.287.693zm-1.98-4.783l-.288-.693.287.693zM12 2.25c-4.262 0-7.75 3.46-7.75 7.707h1.5c0-3.41 2.808-6.207 6.25-6.207v-1.5zM4.25 9.957c0 2.269 1.128 4.455 2.452 6.292 1.335 1.85 2.947 3.45 4.047 4.543l1.057-1.064c-1.108-1.1-2.634-2.62-3.887-4.356-1.262-1.75-2.169-3.62-2.169-5.415h-1.5zm6.499 10.835l.034.035 1.058-1.064-.035-.035-1.057 1.064zm.026.026l.688.706 1.074-1.048-.688-.705-1.074 1.047zm1.754.714l.688-.684-1.058-1.064-.688.684 1.058 1.064zm.69-.686c1.096-1.098 2.717-2.706 4.06-4.566 1.333-1.846 2.471-4.043 2.471-6.323h-1.5c0 1.806-.916 3.685-2.187 5.445-1.262 1.747-2.797 3.275-3.905 4.384l1.06 1.06zm6.531-10.89c0-4.246-3.488-7.706-7.75-7.706v1.5c3.442 0 6.25 2.797 6.25 6.207h1.5zm-6.051-1.193a1.838 1.838 0 01-.995 2.402l.574 1.386a3.338 3.338 0 001.807-4.362l-1.386.574zm-.995 2.402a1.838 1.838 0 01-2.402-.995l-1.386.574a3.338 3.338 0 004.362 1.807l-.574-1.386zm-2.402-.995a1.838 1.838 0 01.995-2.402l-.574-1.386a3.338 3.338 0 00-1.807 4.362l1.386-.574zm.995-2.402a1.838 1.838 0 012.402.995l1.386-.574a3.338 3.338 0 00-4.362-1.807l.574 1.386z"></path>
                    </svg>
                    <span className="bullet-point">
                      {tour.tourDetails.departureAndReturn.start.address}
                    </span>
                  </div>
                  <div className="departure-item">
                    <svg viewBox="0 0 24 24" width="20px" height="20px">
                      <path d="M4.25 8.25a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zM4.25 13.25a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5zM4.25 18.25a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21 7.75H7.5v-1.5H21v1.5zm0 5H7.5v-1.5H21v1.5zm0 5H7.5v-1.5H21v1.5z"
                      ></path>
                    </svg>
                    <div>
                      <div className="bullet-point">Pickup details</div>
                      <div className="pickup-details-description">
                        {
                          tour.tourDetails.departureAndReturn.pickupDetails
                            .description
                        }
                      </div>
                    </div>
                  </div>
                  {tour.tourDetails.departureAndReturn.pickupDetails
                    .hotelPickupOffered && (
                    <div className="departure-item">
                      <svg viewBox="0 0 24 24" width="20px" height="20px">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M3.252 5.405c0-.47.38-.85.85-.85h15.624c.47 0 .85.38.85.85v6.649c.68.562 1.22 1.393 1.22 2.544v4.847h-1.5V17.77H3.704v1.674h-1.5V14.57c.025-.654.304-1.588 1.05-2.35V5.404zm2.635 5.587a6.6 6.6 0 01.836-.052h3.896c-.502-.482-1.31-.93-2.433-.93-1.09 0-1.83.466-2.3.982zm7.389-.052h4.468l.036.004a5.2 5.2 0 01.537.082 2.351 2.351 0 00-.222-.233c-.447-.41-1.18-.783-2.254-.783-1.078 0-1.75.273-2.18.584a2.396 2.396 0 00-.385.346zm5.8-1.282c-.726-.652-1.812-1.148-3.235-1.148-1.347 0-2.338.347-3.06.868-.342.247-.61.525-.821.802-.736-.861-2.005-1.67-3.774-1.67-1.629 0-2.733.712-3.434 1.503V6.055h14.324v3.603zM3.703 16.27h16.594v-1.673c0-.703-.355-1.188-.888-1.545-.56-.374-1.263-.561-1.74-.613H6.724c-1.118 0-1.81.317-2.237.678-.57.482-.765 1.123-.783 1.496v1.657z"
                        ></path>
                      </svg>
                      <div>
                        <div className="bullet-point">Hotel pickup offered</div>
                        <div className="pickup-details-description">
                          {
                            tour.tourDetails.departureAndReturn.pickupDetails
                              .hotelPickupNote
                          }
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="departure-item">
                    <span className="bullet-point">End: </span>
                    <span>
                      {tour.tourDetails.departureAndReturn.end.description}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`accordion-box ${
                toggleAccordion === "accessibility" ? "active" : ""
              }`}
              onClick={() =>
                setToggleAccordion((prev) => {
                  return prev !== "accessibility" ? "accessibility" : "";
                })
              }
            >
              <div className="question">
                <span>Accessibility</span>
                <svg viewBox="0 0 24 24" width="20px" height="20px">
                  <path d="M18.4 16.6L12 10.2l-6.4 6.4-1.4-1.5L12 7.4l7.8 7.7-1.4 1.5z"></path>
                </svg>
              </div>
              <div className="answer">
                <div className="answer-wrapper">
                  <ul>
                    {tour.tourDetails.accessibility.length > 0 &&
                      tour.tourDetails.accessibility.map((item, index) => {
                        return <li key={index}>{item}</li>;
                      })}
                  </ul>
                  <div>
                    If you have questions about accessibility, we’d be happy to
                    help. Just call the number below
                    <div className="support-phone-number">+1 855 275 5071</div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`accordion-box ${
                toggleAccordion === "additional-info" ? "active" : ""
              }`}
              onClick={() =>
                setToggleAccordion((prev) => {
                  return prev !== "additional-info" ? "additional-info" : "";
                })
              }
            >
              <div className="question">
                <span>Additional information</span>
                <svg viewBox="0 0 24 24" width="20px" height="20px">
                  <path d="M18.4 16.6L12 10.2l-6.4 6.4-1.4-1.5L12 7.4l7.8 7.7-1.4 1.5z"></path>
                </svg>
              </div>
              <div className="answer">
                <div className="answer-wrapper">
                  <ul>
                    <li>Confirmation will be received at time of booking</li>
                    <li>Most travelers can participate</li>
                    <li>
                      You must be above the age of 18 to participate in shooting
                      experience.
                    </li>
                    <li>
                      After the morning tour, visit a nearby restaurant for
                      restroom, feel free to enjoy a light lunch on your own.
                    </li>
                    <li>
                      This tour/activity will have a maximum of 25 travelers
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className={`accordion-box ${
                toggleAccordion === "cancel-policy" ? "active" : ""
              }`}
              onClick={() =>
                setToggleAccordion((prev) => {
                  return prev !== "cancel-policy" ? "cancel-policy" : "";
                })
              }
            >
              <div className="question">
                <span>Cancellation policy</span>
                <svg viewBox="0 0 24 24" width="20px" height="20px">
                  <path d="M18.4 16.6L12 10.2l-6.4 6.4-1.4-1.5L12 7.4l7.8 7.7-1.4 1.5z"></path>
                </svg>
              </div>
              <div className="answer">
                <div className="answer-wrapper">
                  For a full refund, cancel at least 24 hours in advance of the
                  start date of the experience.
                </div>
              </div>
            </div>
            <div
              className={`accordion-box ${
                toggleAccordion === "help" ? "active" : ""
              }`}
              onClick={() =>
                setToggleAccordion((prev) => {
                  return prev !== "help" ? "help" : "";
                })
              }
            >
              <div className="question">
                <span>Help</span>
                <svg viewBox="0 0 24 24" width="20px" height="20px">
                  <path d="M18.4 16.6L12 10.2l-6.4 6.4-1.4-1.5L12 7.4l7.8 7.7-1.4 1.5z"></path>
                </svg>
              </div>
              <div className="answer">
                <div className="answer-wrapper">
                  If you have questions about this tour or need help making your
                  booking, we’d be happy to help. Just call the number below
                  <div className="support-phone-number">+1 855 275 5071</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tour-booking-container">
          <div className="tour-booking-title">Reserve your spot</div>
          <button className="reserve-button">Reserve Now</button>
          <div className="refund-container">
            <span className="refund-icon">
              <svg viewBox="0 0 24 24" width="12px" height="12px">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.23 12.452v-5.4h1.5v6.022L9.7 16.102l-1.06-1.061 2.588-2.589zM20.586 15.377l-5.416 5.417-2.89-2.89 1.06-1.061 1.83 1.83 4.356-4.357 1.06 1.061z"
                ></path>
                <path d="M20.219 12.484a8.24 8.24 0 00-8.127-8.239v-1.5c5.327.06 9.627 4.398 9.627 9.74 0 .089-.002.178-.004.267h-1.5a8.25 8.25 0 00.004-.268zM11.946 20.723a8.24 8.24 0 01-5.46-14.38l-.979-1.137a9.715 9.715 0 00-3.267 7.278c0 5.368 4.342 9.721 9.706 9.74v-1.5z"></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.23 6.218H1.9v-1.5h4.83v4.829h-1.5v-3.33z"
                ></path>
              </svg>
            </span>
            <div className="refund-text">
              Not sure? You can cancel this reservation up to 24 hours in
              advance for a full refund.
            </div>
          </div>
        </div>
      </div>
      <div className="tour-itinerary-container">
        <div className="tour-itinerary-title">Itinerary</div>
        <div className="tour-itinerary-details-container">
          <div className="tour-itinerary-details">
            <ul>
              <li>
                <div className="itinerary-icon">
                  <span className="first-itinerary">
                    <svg viewBox="0 0 24 24" width="1em" height="1em">
                      <path d="M12 2C7.745 2 4.27 5.475 4.27 9.73c0 4.539 4.539 9.056 6.971 11.486L12 22l.759-.761c2.433-2.453 6.972-6.97 6.972-11.509C19.73 5.475 16.256 2 12 2zm0 10.986c-1.93 0-3.5-1.569-3.5-3.5 0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.931-1.57 3.5-3.5 3.5z"></path>
                    </svg>
                  </span>
                </div>
                <div className="itinerary-details">
                  <div className="itinerary-details-title">You'll start at</div>
                  <div className="itinerary-details-description">
                    {tour.tourDetails.departureAndReturn.start.address}
                  </div>
                  <div className="itinerary-details-description">
                    Or, you can also get picked up
                  </div>
                  <a
                    className="itinerary-details-more"
                    href="#departure-and-return"
                  >
                    See departure details
                  </a>
                  {/* <Link
                    to="#departure-and-return"
                    smooth={true}
                    offset={0}
                    duration={500}
                    className="itinerary-details-more"
                  >
                    See departure details
                  </Link> */}
                </div>
              </li>
              {stops.length > 0 &&
                stops.map((stop, index) => {
                  if (stop.isAttraction) {
                    return (
                      <li key={stop.id}>
                        <div className="itinerary-icon">
                          <span>{index + 1}</span>
                        </div>
                        <div className="itinerary-details attraction">
                          <div className="itinerary-details-title">
                            {stop.stopName}
                          </div>
                          <div className="number-of-reviews-container">
                            <svg
                              viewBox="0 0 128 24"
                              width="88"
                              height="16"
                              aria-labelledby=":lithium-r2s:"
                              className="rating-stars"
                            >
                              <title id=":lithium-r2s:"></title>
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
                            <span className="number-of-reviews">
                              {stop.numberOfReviews.toLocaleString("en-US")}{" "}
                              reviews
                            </span>
                          </div>
                          <div className="itinerary-attraction-image-container">
                            <img
                              src={stop.imageUrl}
                              alt={`${stop.stopName} image`}
                            />
                          </div>
                          <div className="itinerary-details-description">
                            <ExpandableDescription
                              text={`Around 8:00AM or 12:10PM. Start with pickup from the center of Ho Chi Minh City or meet at the meeting point then depart for Cu Chi Tunnels. After 1.5 hour drive, we arrive at the Tunnels where You'll have the opportunity to explore the tunnel system, which includes narrow passageways, hidden entrances, and underground chambers. Learn about the daily life of the Cu Chi guerrilla fighters and how they managed to survive in the tunnels. You can crawl distances through the tunnels that were used by the guerrilla fighters during the Vietnam War. You may see kitchens, living quarters, among other things used during the war. Learn about how different types traps were created and set up. Visit the weapon rooms and learn how the ingenious soldiers made them. You can also safely try your hand at the shooting range with an AK-47. After exploration, we travel back to Ho Chi Minh City. Arrive approximately at 3:00pm for the morning tour and 6:50pm for the afternoon tour.`}
                              lineClamp={7}
                            ></ExpandableDescription>
                          </div>
                          <Link
                            to={`/cities/${replaceWhiteSpaceWithUnderScore(
                              cityState
                            )}/attractions/${replaceWhiteSpaceWithUnderScore(
                              stop.attractionName
                            )}`}
                            className="itinerary-attraction-more-about-button"
                            target="_blank"
                          >
                            More about {stop.attractionName}
                          </Link>
                        </div>
                      </li>
                    );
                  }
                  return (
                    <li key={stop.id}>
                      <div className="itinerary-icon">
                        <span>{index + 1}</span>
                      </div>
                      <div className="itinerary-details">
                        <div className="itinerary-details-title">
                          {stop.stopName}
                        </div>
                        <div className="itinerary-details-description">
                          <ExpandableDescription
                            text={stop.description}
                            lineClamp={7}
                          ></ExpandableDescription>
                        </div>
                      </div>
                    </li>
                  );
                })}
              <li>
                <div className="itinerary-icon">
                  <span className="first-itinerary">
                    <svg viewBox="0 0 24 24" width="1em" height="1em">
                      <path d="M12 2C7.745 2 4.27 5.475 4.27 9.73c0 4.539 4.539 9.056 6.971 11.486L12 22l.759-.761c2.433-2.453 6.972-6.97 6.972-11.509C19.73 5.475 16.256 2 12 2zm0 10.986c-1.93 0-3.5-1.569-3.5-3.5 0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5c0 1.931-1.57 3.5-3.5 3.5z"></path>
                    </svg>
                  </span>
                </div>
                <div className="itinerary-details">
                  <div className="itinerary-details-title">
                    You'll return to the starting point
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="tour-itinerary-map">
            {stops && stops.length > 0 && (
              <Mapbox stops={stops} zoom={8}></Mapbox>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourInACity;
