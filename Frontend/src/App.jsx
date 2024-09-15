import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cities from "./pages/Cities/Cities";
import City from "./pages/City/City";
import Restaurants from "./pages/Restaurants/Restaurants";
import TravelDestinations from "./pages/TravelDestinations/TravelDestinations";
import BackToTopButton from "./components/BackToTopButton/BackToTopButton";
import Tours from "./pages/Tours/Tours";
import RestaurantsInACity from "./pages/RestaurantsInACity/RestaurantsInACity";
import RestaurantInACity from "./pages/RestaurantInACity/RestaurantInACity";
import ThingsToDoInACity from "./pages/ThingsToDoInACity/ThingsToDoInACity";
import AttractionInACity from "./pages/AttractionInACity/AttractionInACity";
import TourInACity from "./pages/TourInAcity/TourInACity";
import Footer from "./components/Footer/Footer";
import ThingsToDo from "./pages/ThingsToDo/ThingsToDo";
import { AuthenticationGuard } from "./components/AuthenticationGuard/AuthenticationGuard";
import UserProfile from "./pages/UserProfile/UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "./apis/axiosInstance";
import { useAxiosFunction } from "./hooks/useAxiosFunction";
import { useAccessToken } from "./hooks/useAccessToken";
import { useAuth0 } from "@auth0/auth0-react";
import { findRole } from "./functions/findRole";
import TourCheckout from "./pages/TourCheckout/TourCheckout";
import WriteReview from "./pages/WriteReview/WriteReview";
import MyTourBooking from "./pages/MyTourBooking/MyTourBooking";
import AdminMainPage from "./pages/AdminMainPage/AdminMainPage";
import UnauthorizedPage from "./pages/UnauthorizedPage/UnauthorizedPage";
import NotFound from "./pages/NotFound/NotFound";
import TestPage from "./pages/TestPage";
import Sidebar from "./components/Sidebar/Sidebar";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
const App = () => {
  const [showBackToTopButton, setShowBackToTopButton] = useState(false);
  const [role, setRole] = useState("");
  const location = useLocation();
  const [restaurantState, setRestaurantState] = useState(() => {
    const restaurantStateFromLocalStorage =
      localStorage.getItem("restaurantState");
    return restaurantStateFromLocalStorage
      ? restaurantStateFromLocalStorage
      : "";
  });
  // const [bookingDetails, setBookingDetails] = useState(() => {
  //   return (
  //     JSON.parse(localStorage.getItem("bookingDetails")) || {
  //       tourStartDate: "",
  //       numberOfPeople: 1, // Default to 1 traveler
  //     }
  //   );
  // });
  // const [bookTourLoading, setBookTourLoading] = useState(false);
  // const [bookTourError, setBookTourError] = useState(null);

  const { token } = useAccessToken();
  const { isAuthenticated, user, isLoading } = useAuth0();
  // const [userFromDb, userFromDbError, userFromDbLoading, axiosFetch] =
  //   useAxiosFunction();
  // const [postedUser, setPostedUser] = useState(null);
  // const [postedUserError, setPostedUserError] = useState(null);
  // const [postedUserLoading, setPostedUserLoading] = useState(false);
  // useEffect(() => {
  //   if (user && token) {
  //     axiosFetch({
  //       axiosInstance: axiosInstance,
  //       method: "GET",
  //       url: `/secure/users/search/findBySubject?subject=${encodeURIComponent(
  //         user.sub
  //       )}`,
  //       requestConfig: {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     });
  //   }
  // }, [user, token, postedUser]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000) {
        setShowBackToTopButton(true);
      } else {
        setShowBackToTopButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (isAuthenticated && token) {
      const role = findRole(token);
      setRole(role);
      console.log("role in app is ", role);
    }
  }, [isAuthenticated, token]);
  // Check if the current path matches the pattern for admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");
  const showSidebar = role === "Admin" && isAdminRoute;
  if (isLoading)
    return (
      <p
        style={{
          // position: "absolute",
          // top: "50%",
          // left: "50%",
          // transform: "translate(-50%, -50%)",
          display: "grid",
          placeItems: "center",
          height: "100dvh",
        }}
      >
        Loading...
      </p>
    );
  return (
    <div className="main-app">
      <Navbar
        restaurantState={restaurantState}
        setRestaurantState={setRestaurantState}
        role={role}
        // userFromDb={userFromDb}
      />
      <div className="app-content">
        {/* <div className="app">
          <Routes>
            <Route path="/a" />
          </Routes>
        </div> */}
        <ToastContainer
          position="top-right" // Position the toast in the top-right corner
          autoClose={5000} // Auto close after 5 seconds
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div
          className={
            isAuthenticated && role && role === "Admin" && isAdminRoute
              ? "sidebar-wrapper"
              : ""
          }
        >
          {showSidebar && <Sidebar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/cities/:cityName" element={<City />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route
              path="/travel-destinations"
              element={<TravelDestinations />}
            />
            <Route path="/things-to-do" element={<ThingsToDo />} />
            <Route path="/tours" element={<Tours />} />
            <Route
              path="/cities/:cityName/restaurants"
              element={<RestaurantsInACity />}
            />
            <Route
              path="/cities/:cityName/restaurants/:restaurantName"
              element={
                <RestaurantInACity
                  restaurantState={restaurantState}
                  setRestaurantState={setRestaurantState}
                />
              }
            />
            <Route
              path="/cities/:cityName/things-to-do"
              element={<ThingsToDoInACity />}
            />
            <Route
              path="/cities/:cityName/attractions/:attractionName"
              element={<AttractionInACity />}
            />
            <Route
              path="/cities/:cityName/tours/:tourName"
              element={
                <TourInACity
                // bookingDetails={bookingDetails}
                // setBookingDetails={setBookingDetails}
                // bookTourLoading={bookTourLoading}
                // setBookTourLoading={setBookTourLoading}
                // bookTourError={bookTourError}
                // setBookTourError={setBookTourError}
                />
              }
            />
            <Route
              path="/users/:userName/profile"
              element={
                <AuthenticationGuard
                  // userFromDb={userFromDb}
                  // userFromDbError={userFromDbError}
                  // postedUser={postedUser}
                  // setPostedUser={setPostedUser}
                  // postedUserError={postedUserError}
                  // setPostedUserError={setPostedUserError}
                  // postedUserLoading={postedUserLoading}
                  // setPostedUserLoading={setPostedUserLoading}
                  component={UserProfile}
                />
              }
            />
            <Route
              path="/:cityName/tours/:tourName/checkout"
              element={<TourCheckout />}
            />
            <Route
              path="/attractions/:attractionName/write_review"
              element={<WriteReview />}
            />
            <Route path="/users/:id/my_bookings" element={<MyTourBooking />} />
            <Route
              path="/admin"
              element={
                <AuthenticationGuard
                  allowedRoles={["Admin"]}
                  component={AdminMainPage}
                />
              }
            />
            <Route
              path="/admin/users"
              element={
                <AuthenticationGuard
                  allowedRoles={["Admin"]}
                  component={ManageUsers}
                />
              }
            />
            <Route path="/unauthorize" element={<UnauthorizedPage />} />
            <Route path="/admin/test" element={<TestPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      {showBackToTopButton && <BackToTopButton />}
      <Footer></Footer>
    </div>
  );
};

export default App;
