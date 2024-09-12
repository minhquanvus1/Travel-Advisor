import React, { useState, useMemo, useContext } from "react";
import "./TourCheckout.css";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxios } from "../../hooks/useAxios";
import { replaceUnderScoreWithWhiteSpace } from "../../functions/replaceUnderScoreWithWhiteSpace";
import { useAuth0 } from "@auth0/auth0-react";
import { useAccessToken } from "../../hooks/useAccessToken";
import { UserContext } from "../../context/UserContextProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import RatingStars from "../../components/RatingStars/RatingStars";

const TourCheckout = () => {
  const { cityName, tourName } = useParams();
  const { token } = useAccessToken();
  const [tour, tourError, tourLoading] = useAxios({
    axiosInstance: axiosInstance,
    url: `/tours/search?tourName=${replaceUnderScoreWithWhiteSpace(
      tourName
    )}&cityName=${replaceUnderScoreWithWhiteSpace(cityName)}`,
    method: "GET",
  });
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const { userFromDb, userFromDbError, userFromDbLoading, refetchUser } =
    useContext(UserContext);
  const [bookTourLoading, setBookTourLoading] = useState(false);
  const [bookTourError, setBookTourError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const [postedUser, setPostedUser] = useState(null);
  const [postedUserError, setPostedUserError] = useState(null);
  const [postedUserLoading, setPostedUserLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    imageUrl: "",
  });
  const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));
  let totalPrice = useMemo(() => {
    if (bookingDetails && tour) {
      return (bookingDetails.numberOfPeople * tour.price).toFixed(2);
    }
  }, [bookingDetails?.numberOfPeople, tour?.price]);
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  const getNextDate = (dateString) => {
    const date = new Date(dateString);
    const nextDate = new Date(date.setDate(date.getDate() + 1)); // Increment day by 1
    return nextDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };
  console.log("tour from checkout is", tour);
  console.log("bookingDetails from checkout is", bookingDetails);

  const countryCodeMap = {
    vietnam: "VN",
    "united states": "US",
    canada: "CA",
    // Add other countries as needed
  };
  const getCountryCode = (countryName) => {
    // Normalize the country name to lowercase
    const normalizedCountryName = countryName.toLowerCase();
    // Look up the country code using the normalized name
    return countryCodeMap[normalizedCountryName] || "US"; // Default to 'US' if country not found
  };
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Please login to book this tour");
      loginWithRedirect();
      return;
    }
    console.log("stripe top is", stripe);
    console.log("stripe instance:", stripe);
    console.log("elements instance:", elements);
    console.log(
      "card element:",
      elements ? elements.getElement(CardElement) : "No elements available"
    );

    if (!stripe || !elements || !elements.getElement(CardElement)) {
      console.log("in here stripe");
      return;
    }
    console.log("stripe bottom is", stripe);
    const paymentInfo = {
      amount: Math.round(totalPrice * 100),
      currency: "USD",
      receiptEmail: user.email,
    };
    setBookTourLoading(true);
    setBookTourError(null);
    try {
      const paymentIntentResponse = await axiosInstance({
        method: "POST",
        url: "/payment-intent",
        data: paymentInfo,
      });
      const paymentIntent = paymentIntentResponse.data;
      console.log("paymentIntent is", paymentIntent);
      const paymentResult = await stripe.confirmCardPayment(
        paymentIntent.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: `${userFromDb.firstName} ${userFromDb.lastName}`, // Full name
              email: user.email,
              address: {
                city: userFromDb.city,
                country: getCountryCode(userFromDb.country),
              },
            },
          },
        },
        { handleActions: false }
      );

      // Check if there was an error during payment confirmation
      if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
      }

      const bookingData = {
        tourId: tour.id,
        userId: userFromDb.id,
        numberOfPeople: bookingDetails.numberOfPeople,
        tourStartDate: bookingDetails.tourStartDate,
        totalPrice: totalPrice,
      };
      //   setBookTourLoading(true);
      //   setBookTourError(null);

      const response = await axiosInstance({
        method: "POST",
        url: "/book-tour",
        data: bookingData,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      console.log("tour booking response is ", response.data);
      toast.success(
        "Tour booked successfully with Tour Tracking Number: " +
          response.data.tourBookingTrackingNumber
      );
      localStorage.removeItem("bookingDetails");
      navigate(`/cities/${cityName}/tours/${tourName}`);
    } catch (error) {
      if (error.response) {
        console.log("error.response.data is", error.response.data);
        setBookTourError(error.response.data);
        toast.error(
          `Error booking tour with response. Please try again later. Error: ${error.response.data}`
        );
      } else if (error.request) {
        console.log("error.request is", error.request);
        setBookTourError(error.request);
        toast.error(
          `Error booking tour with request. Please try again later. Error ${error.request}`
        );
      } else {
        console.log("error is", error);
        setBookTourError(error);
        toast.error(
          `Error booking tour. Please try again later. Error: ${error}`
        );
      }
    } finally {
      setBookTourLoading(false);
    }

    // stripe
    //   .confirmPayment(
    //     paymentIntent.client_secret,
    //     {
    //       payment_method: {
    //         card: elements.getElement(CardElement),
    //         billing_details: {
    //           first_name: userFromDb.firstName,
    //           last_name: userFromDb.lastName,
    //           email: user.email,
    //           city: userFromDb.city,
    //           country: userFromDb.country,
    //         },
    //       },
    //     },
    //     { handleActions: false }
    //   )
    //   .then(async (result) => {
    //     if (result.error) {
    //       console.log("error is", result.error);
    //       toast.error("Error processing payment. Please try again later.");
    //     } else {
    //       const bookingData = {
    //         tourId: tour.id,
    //         userId: userFromDb.id,
    //         numberOfPeople: bookingDetails.numberOfPeople,
    //         tourStartDate: bookingDetails.tourStartDate,
    //         totalPrice: totalPrice,
    //       };
    //       setBookTourLoading(true);
    //       setBookTourError(null);
    //       try {
    //         const response = await axiosInstance({
    //           method: "POST",
    //           url: "/book-tour",
    //           data: bookingData,
    //           // headers: {
    //           //   Authorization: `Bearer ${token}`,
    //           // },
    //         });
    //         console.log("tour booking response is ", response.data);
    //         toast.success(
    //           "Tour booked successfully with Tour Tracking Number: " +
    //             response.data.tourBookingTrackingNumber
    //         );
    //       } catch (error) {
    //         if (error.response) {
    //           console.log("error.response.data is", error.response.data);
    //           setBookTourError(error.response.data);
    //           toast.error(
    //             `Error booking tour with response. Please try again later. Error: ${error.response.data}`
    //           );
    //         } else if (error.request) {
    //           console.log("error.request is", error.request);
    //           setBookTourError(error.request);
    //           toast.error(
    //             `Error booking tour with request. Please try again later. Error ${error.request}`
    //           );
    //         } else {
    //           console.log("error is", error);
    //           setBookTourError(error);
    //           toast.error(
    //             `Error booking tour. Please try again later. Error: ${error}`
    //           );
    //         }
    //       } finally {
    //         setBookTourLoading(false);
    //       }
    //     }
    //   });
    // const bookingData = {
    //   tourId: tour.id,
    //   userId: userFromDb.id,
    //   numberOfPeople: bookingDetails.numberOfPeople,
    //   tourStartDate: bookingDetails.tourStartDate,
    //   totalPrice: totalPrice,
    // };
    // setBookTourLoading(true);
    // setBookTourError(null);
    // try {
    //   const response = await axiosInstance({
    //     method: "POST",
    //     url: "/book-tour",
    //     data: bookingData,
    //     // headers: {
    //     //   Authorization: `Bearer ${token}`,
    //     // },
    //   });
    //   console.log("tour booking response is ", response.data);
    //   toast.success(
    //     "Tour booked successfully with Tour Tracking Number: " +
    //       response.data.tourBookingTrackingNumber
    //   );
    // } catch (error) {
    //   if (error.response) {
    //     console.log("error.response.data is", error.response.data);
    //     setBookTourError(error.response.data);
    //     toast.error(
    //       `Error booking tour with response. Please try again later. Error: ${error.response.data}`
    //     );
    //   } else if (error.request) {
    //     console.log("error.request is", error.request);
    //     setBookTourError(error.request);
    //     toast.error(
    //       `Error booking tour with request. Please try again later. Error ${error.request}`
    //     );
    //   } else {
    //     console.log("error is", error);
    //     setBookTourError(error);
    //     toast.error(
    //       `Error booking tour. Please try again later. Error: ${error}`
    //     );
    //   }
    // } finally {
    //   setBookTourLoading(false);
    // }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostedUserLoading(true);
    setPostedUserError(null);
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/secure/users",
        data: {
          subject: user.sub,
          firstName: formData.firstName,
          lastName: formData.lastName,
          city: formData.city,
          country: formData.country,
          imageUrl: formData.imageUrl,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPostedUser(response.data);
      toast.success("User registered successfully");
      setFormData({
        firstName: "",
        lastName: "",
        city: "",
        country: "",
        imageUrl: "",
      });
      refetchUser();
    } catch (error) {
      if (error.response) {
        console.log("error.response.data is", error.response.data);
        setPostedUserError(error.response.data);
        toast.error(
          `Error registering user with response. Please try again later. Error: ${error.response.data}`
        );
      } else if (error.request) {
        console.log("error.request is", error.request);
        setPostedUserError(error.request);
        toast.error(
          `Error registering user with request. Please try again later. Error ${error.request}`
        );
      } else {
        console.log("error is", error);
        setPostedUserError(error);
        toast.error(
          `Error registering user. Please try again later. Error: ${error}`
        );
      }
    } finally {
      setPostedUserLoading(false);
    }
  };
  if (!bookingDetails) return <div>Booking details not found</div>;
  if (userFromDbLoading) return <div>Loading...</div>;
  return (
    <div className="tour-checkout-section">
      {!Array.isArray(tour) && tour && (
        <>
          <div className="content-left">
            {isAuthenticated &&
              Array.isArray(userFromDb) &&
              userFromDb.length <= 0 &&
              userFromDbError?.status === 404 && (
                <div className="register-user">
                  <h2 className="title">Register User: </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-line">
                      <div className="form-line-item">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-line-item">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-line">
                      <div className="form-line-item">
                        <label htmlFor="city">City:</label>
                        <input
                          type="text"
                          name="city"
                          id="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="form-line-item">
                        <label htmlFor="country">Country:</label>
                        <input
                          type="text"
                          name="country"
                          id="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-line">
                      <div className="form-line-item" style={{ width: "100%" }}>
                        <label htmlFor="imageUrl">Profile Image URL: </label>
                        <input
                          type="url"
                          name="imageUrl"
                          value={formData.imageUrl}
                          onChange={handleInputChange}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="register-user-btn"
                      disabled={postedUserLoading}
                    >
                      {postedUserLoading ? "Registering..." : "Register"}
                    </button>
                  </form>
                </div>
              )}
            {!Array.isArray(userFromDb) && userFromDb && (
              <div className="payment-container">
                <h2 className="title">Pay with Credit Card:</h2>
                <CardElement id="card-element" />
                <button
                  className="checkout-btn"
                  disabled={bookTourLoading}
                  onClick={handleBooking}
                >
                  {bookTourLoading ? "Processing..." : "Check Out"}
                </button>
              </div>
            )}
          </div>
          <div className="content-right">
            <div className="tour-booking-summary-card">
              <div className="card-top">
                <div className="card-header">
                  <div className="card-header-left">
                    <div className="tour-name">{tour.name}</div>
                    <div className="number-of-reviews-container">
                      <RatingStars
                        rating={tour.rating}
                        width={68}
                        height={12}
                      ></RatingStars>

                      <span className="number-of-reviews">
                        {tour.numberOfReviews.toLocaleString("en-US")}
                      </span>
                    </div>
                    <div className="city-name">{tour.cityName}</div>
                    <div></div>
                  </div>
                  <div className="card-header-right">
                    <div className="image-container">
                      <img
                        src={tour.imageObject.primaryImage.imageUrl}
                        alt={`${tour.name} image`}
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <div className="book-details">
                  <div className="tour-start-date">
                    <div className="label">Date</div>
                    <div className="value">
                      {formatDate(bookingDetails.tourStartDate)}
                    </div>
                  </div>
                  <div className="number-of-people">
                    <div className="label">Travelers</div>
                    <div className="value">
                      {bookingDetails.numberOfPeople >= 2
                        ? `${bookingDetails.numberOfPeople} people`
                        : `${bookingDetails.numberOfPeople} person`}
                    </div>
                  </div>
                </div>
                <hr />
                <div className="free-cancellation">
                  <svg viewBox="0 0 24 24" width="16px" height="16px">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.42 11.968V6.567h1.5v6.022l-3.028 3.028-1.06-1.06zm9.357 2.925-5.417 5.416-2.89-2.89 1.06-1.06 1.83 1.829 4.356-4.356z"
                    ></path>
                    <path d="M20.41 12a8.24 8.24 0 0 0-8.128-8.239v-1.5c5.327.06 9.627 4.397 9.627 9.739q0 .135-.003.268h-1.501q.004-.135.004-.268m-8.273 8.239a8.24 8.24 0 0 1-5.46-14.38l-.978-1.137A9.72 9.72 0 0 0 2.43 12c0 5.367 4.343 9.72 9.706 9.739z"></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.42 5.733H2.09v-1.5h4.83v4.83h-1.5z"
                    ></path>
                  </svg>
                  <div className="date">
                    Free cancellation before{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      month: "long",
                      day: "numeric",
                    }).format(
                      new Date(getNextDate(bookingDetails.tourStartDate))
                    )}
                  </div>
                </div>
              </div>
              <div className="card-bottom">
                <div className="total-price-container">
                  <div className="text">Total: </div>
                  <div className="total-price">${totalPrice}</div>
                </div>
              </div>
            </div>
            <div className="book-with-confidence-card">
              <div className="title">Book with confidence</div>
              <hr />
              <div className="book-summary-container">
                <div className="book-summary-item">
                  <i className="fa-solid fa-wallet"></i>
                  <div>
                    <div className="book-summary-item-title">
                      Lowest price guarantee
                    </div>
                    <div className="book-summary-description">
                      Find it cheaper? We'll refund the difference
                    </div>
                  </div>
                </div>
                <div className="book-summary-item">
                  <i className="fa-solid fa-lock"></i>
                  <div>
                    <div className="book-summary-item-title">
                      Privacy protection
                    </div>
                    <div className="book-summary-description">
                      We use SSL encryption to keep your data secure
                    </div>
                  </div>
                </div>
                <div className="book-summary-item">
                  <i className="fa-solid fa-headphones"></i>
                  <div>
                    <div className="book-summary-item-title">
                      24/7 global support
                    </div>
                    <div className="book-summary-description">
                      Get the answers you need, when you need them
                    </div>
                  </div>
                </div>
                <div className="book-summary-item">
                  <i className="fa-solid fa-phone"></i>
                  <div>
                    <div className="book-summary-item-title">
                      Give us a call
                    </div>
                    <div className="book-summary-description">
                      We’d be happy to help you out with your booking
                      <div className="phone-number">
                        Call now: +1 855 275 5071
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TourCheckout;
