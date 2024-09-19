# Travel Advisor (Frontend)

- For the Frontend, the app is built with React, with raw HTML, and CSS, and is currently deployed to Render cloud platform.

- The Frontend React has different Views, depending on which Role you are when you log in. That is, the Authenticated User will see the different View to use the functionality that provides exclusively for Authenticated User role, and Admin will see different View to use the functionality that provides exclusively for Admin role.

- The Frontend techstack also includes: Axios, Vite, React Router, MapBox gl, React-Slick, React-Toastify, Chart.js, react-chartjs-2, font-awesome, Auth0 for Authentication/Authorization, and Stripe for payment processing.

- The Frontend is inspired by the [TripAdvisor Website](https://www.tripadvisor.com/), which offers users the ability to meticulously search for hotels, restaurants, and attractions within a specific locale. Users can seamlessly book accommodations, dining experiences, or activities, and subsequently leave insightful reviews, the [Vietnam Travel Website](https://vietnam.travel/), which provides an in-depth exploration of Vietnam's rich cultural tapestry and breathtaking landscapes. Users can immerse themselves in the vibrant essence of Vietnam, gaining valuable insights and travel tips, and the [Vietnam Travel Advisor Website](https://vietnamtraveladvisor.com.vn/), where users can discover and book captivating tours across Vietnam. This amalgamation of features ensures a comprehensive and engaging user experience, catering to the discerning traveler seeking both convenience and authenticity.

## Getting Started

### Pre-requisite and Local Development

- Developers should have Node.js installed in their local machine. If you don't have Node.js installed, you can download it from [Node.js](https://nodejs.org/en/), and npm will be installed with Node.js.

- The Frontend uses Mapbox API for the map feature. To use the Mapbox API, you need to sign up for a free account at [Mapbox](https://www.mapbox.com/). After signing up, you will get an access token, which you will use in the Frontend React.

- The Frontend uses Auth0 for Authentication/Authorization. To use Auth0, you need to sign up for a free account at [Auth0](https://auth0.com/). After signing up, you will get a Domain, and a ClientID, which you will use in the Frontend React.

- The Frontend also uses Stripe for payment processing. To use Stripe, you need to sign up for a free account at [Stripe](https://stripe.com/). After signing up, you will get a Publishable Key, which you will use in the Frontend React.

- After that, we should create a `.env` file in the Frontend React, and add the following environment variables in the `.env` file:

```bash
VITE_REACT_APP_MAPBOX_ACCESS_TOKEN=YOUR_MAPBOX_ACCESS_TOKEN
VITE_REACT_APP_AUTH0_DOMAIN=YOUR_AUTH0_DOMAIN
VITE_REACT_APP_AUTH0_CLIENT_ID=YOUR_AUTH0_CLIENT_ID
VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY
```

- We should also create a `.env.development` file in the Frontend React, and add the following environment variables in the `.env.development` file:

```bash
VITE_REACT_APP_DEVELOPMENT_BASE_URL=YOUR_DEVELOPMENT_BACKEND_API_URL
```

- The Frontend React are installed by using Vite. Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts: a dev server that provides rich feature enhancements over native ES modules, and a build command that bundles your code with Rollup.

- To install Vite, run the following command in the terminal:

```bash
cd Frontend
npm install vite@latest
```

- All the dependencies, libraries used for this Frontend React project are listed in the `package.json` file. To install all the dependencies, run the following command in the terminal:

```bash
cd Frontend
npm install
```

- Then, to start the Frontend React, run the following command in the terminal:

```bash
cd Frontend
npm run dev
```

- The Frontend React will start running on `http://localhost:3000/`. Open the browser and navigate to `http://localhost:3000/` to see the Frontend React.

## Frontend Structure

- The Frontend React has the following structure:

  - `src/` folder: Contains all the source code of the Frontend React.
    - `components/` folder: Contains all the components that are used in the Frontend React.
    - `pages/` folder: Contains all the pages that are used in the Frontend React.
    - `functions/` folder: Contains all the functions that are used in the Frontend React.
    - `hooks/` folder: Contains all the hooks that are used in the Frontend React.
    - `context/` folder: Contains all the context that are used in the Frontend React.
    - `apis/` folder: Contains all the APIs that are used in the Frontend React.
    - `assets/` folder: Contains all the assets that are used in the Frontend React.
  - `App.jsx` file: Contains the Router of the Frontend React.
  - `App.css` file: Contains the CSS file of the App component.
  - `main.jsx` file: Contains the main file of the Frontend React.
  - `index.html` file: Contains the main HTML file of the Frontend React.
  - `index.css` file: Contains the CSS file of the Frontend React.
  - `baseUrl.js` file: Contains the base URL of the Backend API.
  - `Frontend_README.md` file: Contains the README file of the Frontend React.
  - `public` folder: dynamically inject the Backend API URL into the Frontend React.
  - `package.json` file: Contains all the dependencies, scripts, and metadata of the Frontend React.
  - `package-lock.json` file: Contains the exact version of the dependencies that are installed in the Frontend React.
  - `vite.config.js` file: Contains the configuration of the Vite build tool (including define the PORT of the Frontend React to 3000, in lieu of the default 5173 of Vite).
  - `.env` file: Contains the Auth0 DOMAIN, and Auth0 ClientID as environment variables, in this format so that Vite can recognize them as environment variables:
  - `.env.development` file: Contains the development Backend API URL as environment variable, in this format so that Vite can recognize them as environment variables.
  - `.env.production` file: Contains the production Backend API URL as environment variable, in this format so that Vite can recognize them as environment variables.

## Deployment

- The Frontend is currently deployed on Render cloud platform. You can access the Frontend React by navigating to the following URL: `https://travel-advisor-62it.onrender.com/`

## Author:

Quan Tran

## Acknowledgements

- Thanks Dr. Tran Hong Ngoc, and Msc. Le Duc Loc for your guidance and support throughout the project.
