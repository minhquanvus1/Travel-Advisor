import React from "react";
import ReactDOM from "react-dom/client";
import "./init";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import CityContextProvider from "./context/CityContextProvider.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import UserContextProvider from "./context/UserContextProvider.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const domain = import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID;

const stripePromise = loadStripe(
  import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: `${window.location.origin}`,
          audience: "https://travel-advisor/api",
        }}
      >
        <UserContextProvider>
          <CityContextProvider>
            <Elements stripe={stripePromise}>
              <App />
            </Elements>
          </CityContextProvider>
        </UserContextProvider>
      </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);
