# Travel Advisor (Frontend)

- For the Frontend, the app is built with React, with raw HTML, and CSS, and is currently deployed to Render cloud platform.

- The Frontend React has different Views, depending on which Role you are when you log in. That is, the Authenticated User will see the different View to use the functionality that provides exclusively for Authenticated User role, and Admin will see different View to use the functionality that provides exclusively for Admin role.

- The Frontend techstack also includes: Axios, Vite, React Router, MapBox gl, React-Slick, React-Toastify, Chart.js, react-chartjs-2, font-awesome, Auth0 for Authentication/Authorization, and Stripe for payment processing.

- The Frontend is inspired by the [TripAdvisor Website](https://www.tripadvisor.com/), where users can search for hotels, restaurants, and attractions in a specific location, and can also book a hotel, restaurant, or attraction, and can also leave a review for a hotel, restaurant, or attraction.

## Getting Started

### Pre-requisite and Local Development

- Developers should have Node.js installed in their local machine. If you don't have Node.js installed, you can download it from [Node.js](https://nodejs.org/en/), and npm will be installed with Node.js.

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

- Thanks to the dedicated support of Dr. Tran Hong Ngoc, and Msc. Le Duc Loc for their guidance and support throughout the project.
