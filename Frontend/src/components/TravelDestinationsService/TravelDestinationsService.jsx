import React from "react";
import "./TravelDestinationsService.css";

const TravelDestinationsService = () => {
  return (
    <div className="services-container">
      <h1 className="services-header">Plan, book, go-we make it easy</h1>
      <div className="services">
        <div className="service-card">
          <div className="icon-container">
            <svg
              viewBox="0 0 24 24"
              width="24px"
              height="24px"
              class="d Vb UmNoP"
            >
              <path d="M8 11.5l-.005.75h.01L8 11.5zM3 14l-.603-.446-.147.199V14H3zm0 6h-.75v.75H3V20zm18 0v.75h.75V20H21zm0-4h.75v-.246l-.146-.199L21 16zm-5-2.527v-.75.75zM11 16l-.604-.445-.146.199V16H11zm0 4h-.75v.75H11V20zM9.5 6.25A1.5 1.5 0 018 7.75v1.5a3 3 0 003-3H9.5zM8 7.75a1.5 1.5 0 01-1.5-1.5H5a3 3 0 003 3v-1.5zm-1.5-1.5A1.5 1.5 0 018 4.75v-1.5a3 3 0 00-3 3h1.5zM8 4.75a1.5 1.5 0 011.5 1.5H11a3 3 0 00-3-3v1.5zm9.5 3.5a1.5 1.5 0 01-1.5 1.5v1.5a3 3 0 003-3h-1.5zM16 9.75a1.5 1.5 0 01-1.5-1.5H13a3 3 0 003 3v-1.5zm-1.5-1.5a1.5 1.5 0 011.5-1.5v-1.5a3 3 0 00-3 3h1.5zm1.5-1.5a1.5 1.5 0 011.5 1.5H19a3 3 0 00-3-3v1.5zm-2.397 6.804a6.91 6.91 0 00-2.468-2.075l-.67 1.342a5.41 5.41 0 011.932 1.625l1.206-.892zm-2.468-2.075a6.91 6.91 0 00-3.14-.729l.01 1.5a5.41 5.41 0 012.46.571l.67-1.342zm-3.13-.729a6.91 6.91 0 00-3.14.73l.67 1.341a5.41 5.41 0 012.46-.571l.01-1.5zm-3.14.73a6.91 6.91 0 00-2.468 2.074l1.206.892a5.41 5.41 0 011.932-1.625l-.67-1.342zM2.25 14v6h1.5v-6h-1.5zM3 20.75h10v-1.5H3v1.5zM21.75 20v-4h-1.5v4h1.5zm-.146-4.445a6.96 6.96 0 00-2.464-2.084l-.677 1.339a5.46 5.46 0 011.933 1.635l1.208-.89zm-2.464-2.084a6.96 6.96 0 00-3.14-.748v1.5c.856 0 1.7.201 2.463.587l.677-1.339zM16 12.723a6.96 6.96 0 00-3.14.748l.677 1.339A5.46 5.46 0 0116 14.223v-1.5zm-3.14.748a6.96 6.96 0 00-2.464 2.084l1.208.89a5.46 5.46 0 011.933-1.635l-.677-1.339zM10.25 16v4h1.5v-4h-1.5zm.75 4.75h10v-1.5H11v1.5z"></path>
            </svg>
          </div>
          <h2>Backed by travelers</h2>
          <h3>
            See what people loved (or didn’t love) with real reviews on almost
            everything.
          </h3>
        </div>
        <div className="service-card">
          <div className="icon-container">
            <svg
              viewBox="0 0 24 24"
              width="24px"
              height="24px"
              class="d Vb UmNoP"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.23 12.452v-5.4h1.5v6.022L9.7 16.102l-1.06-1.061 2.588-2.589zM20.586 15.377l-5.416 5.417-2.89-2.89 1.06-1.061 1.83 1.83 4.356-4.357 1.06 1.061z"
              ></path>
              <path d="M20.219 12.484a8.24 8.24 0 00-8.127-8.239v-1.5c5.327.06 9.627 4.398 9.627 9.74 0 .089-.002.178-.004.267h-1.5a8.25 8.25 0 00.004-.268zM11.946 20.723a8.24 8.24 0 01-5.46-14.38l-.979-1.137a9.715 9.715 0 00-3.267 7.278c0 5.368 4.342 9.721 9.706 9.74v-1.5z"></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.23 6.218H1.9v-1.5h4.83v4.829h-1.5v-3.33z"
              ></path>
            </svg>
          </div>
          <h2>Free cancellation</h2>
          <h3>
            Go with the flow. Most experiences can be canceled up to 24 hours
            before.
          </h3>
        </div>
        <div className="service-card">
          <div className="icon-container">
            <svg
              viewBox="0 0 24 24"
              width="24px"
              height="24px"
              class="d Vb UmNoP"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.6 2.25h8.56v8.57L10.91 22.06l-8.56-8.55L13.6 2.25zm.62 1.5l-9.75 9.76 6.44 6.43 9.75-9.74V3.75h-6.44zm6.44 16.5V16h1.5v5.75h-5.75v-1.5h4.25z"
              ></path>
              <path d="M16.91 6a1.48 1.48 0 00-1.06.44 1.51 1.51 0 000 2.12 1.51 1.51 0 002.13 0 1.51 1.51 0 000-2.12A1.49 1.49 0 0016.91 6z"></path>
            </svg>
          </div>
          <h2>Lowest price, guaranteed</h2>
          <h3>
            Do fun stuff without breaking the bank—we’ve got the best prices out
            there.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TravelDestinationsService;
