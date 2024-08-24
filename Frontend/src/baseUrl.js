const baseURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_REACT_APP_PRODUCTION_BASE_URL
    : import.meta.env.VITE_REACT_APP_DEVELOPMENT_BASE_URL;
export { baseURL };
