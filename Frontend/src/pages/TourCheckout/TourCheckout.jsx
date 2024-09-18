import React, { useState, useMemo, useContext, useEffect } from "react";
import "./TourCheckout.css";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxios } from "../../hooks/useAxios";
import { replaceUnderScoreWithWhiteSpace } from "../../functions/replaceUnderScoreWithWhiteSpace";
import { useAuth0 } from "@auth0/auth0-react";
import { useAccessToken } from "../../hooks/useAccessToken";
import { UserContext } from "../../context/UserContextProvider";
import credit_card from "../../assets/credit_card.png";
import { toast } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import "react-toastify/dist/ReactToastify.css";
import {
  CardElement,
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import RatingStars from "../../components/RatingStars/RatingStars";
import { createPaymentIntent } from "../../functions/createPaymentIntent";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
const stripePromise = loadStripe(
  import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY
);
const TourCheckout = () => {
  const { cityName, tourName } = useParams();
  const { token } = useAccessToken();
  const [clientSecret, setClientSecret] = useState("");
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
  const [cardNumberError, setCardNumberError] = useState("");
  const [expiryDateError, setExpiryDateError] = useState("");
  const [cvcError, setCvcError] = useState("");
  const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));

  const handleCardNumberChange = (event) => {
    if (event.error) {
      setCardNumberError(event.error.message);
    } else {
      setCardNumberError("");
    }
  };

  const handleExpiryDateChange = (event) => {
    if (event.error) {
      setExpiryDateError(event.error.message);
    } else {
      setExpiryDateError("");
    }
  };

  const handleCvcChange = (event) => {
    if (event.error) {
      setCvcError(event.error.message);
    } else {
      setCvcError("");
    }
  };

  let totalPrice = useMemo(() => {
    console.log("at first booking details is ", bookingDetails);
    console.log("at here tour is ", tour);
    if (bookingDetails && !Array.isArray(tour) && tour) {
      if (isNaN(bookingDetails.numberOfPeople) || isNaN(tour.price)) {
        console.log(
          "invalid number of people, or tour price, must be a Number"
        );
        return;
      }
      return bookingDetails.numberOfPeople * tour.price;
    }
  }, [bookingDetails, tour]);
  console.log("total price is ", totalPrice);
  useEffect(() => {
    // Define an async function inside the useEffect
    const fetchClientSecret = async () => {
      console.log("fetch client secret is called");
      console.log("total price in function is ", totalPrice);
      console.log("hehe is ", Number.isNaN(totalPrice));
      if (!totalPrice || isNaN(totalPrice) || !user.email) {
        console.error("Invalid totalPrice or missing email");
        return;
      }
      const paymentInfo = {
        amount: Math.round(totalPrice * 100),
        currency: "USD",
        receiptEmail: user.email,
      };

      try {
        const data = await createPaymentIntent(paymentInfo, token);
        setClientSecret(data?.client_secret); // Store the client secret in state
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    // Only call the function if totalPrice is truthy, and can be converted to a Number and user.email is truthy
    if (totalPrice && !isNaN(totalPrice) && user.email && token) {
      fetchClientSecret();
    }
  }, [totalPrice, user.email, token]); // Re-run when totalPrice or user.email changes

  console.log("client_secret is", clientSecret);
  const options = {
    // passing the client secret obtained in step 3
    clientSecret: clientSecret,
    // Fully customizable with appearance API.
    appearance: { theme: "stripe" },
  };
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
    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);
    if (
      !stripe ||
      !elements ||
      !cardNumberElement ||
      !cardExpiryElement ||
      !cardCvcElement
    ) {
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
        url: "/secure/payment-intent",
        data: paymentInfo,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const paymentIntent = paymentIntentResponse.data;
      console.log("paymentIntent is", paymentIntent);

      if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
        throw new Error("Stripe Elements are not properly initialized");
      }
      const paymentResult = await stripe.confirmCardPayment(
        paymentIntent.client_secret,
        {
          payment_method: {
            card: cardNumberElement,
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
        url: "/secure/book-tour",
        data: bookingData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
  if (!bookingDetails)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100dvh" }}>
        Booking details not found
      </div>
    );
  if (userFromDbLoading || !clientSecret)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100dvh" }}>
        Loading...
      </div>
    );
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
            {!Array.isArray(userFromDb) && userFromDb && clientSecret && (
              // <div className="payment-container">
              //   <h2 className="title">Pay with Credit Card:</h2>
              //   {/* <CardElement id="card-element" /> */}
              //   <label htmlFor="card-number">Card Number</label>
              //   <CardNumberElement id="card-number" className="card-input" />

              //   <label htmlFor="card-expiry">Expiration Date</label>
              //   <CardExpiryElement id="card-expiry" className="card-input" />

              //   <label htmlFor="card-cvc">CVC</label>
              //   <CardCvcElement id="card-cvc" className="card-input" />

              //   <button
              //     className="checkout-btn"
              //     disabled={bookTourLoading}
              //     onClick={handleBooking}
              //   >
              //     {bookTourLoading ? "Processing..." : "Check Out"}
              //   </button>
              // </div>
              // <div className="payment-container">
              //   <h2 className="title">Pay with Credit Card:</h2>

              //   <label htmlFor="card-number">Card Number</label>
              //   <div className="input-wrapper">
              //     <div className="card-input-container">
              //       <CardNumberElement
              //         id="card-number"
              //         className={`card-input ${
              //           cardNumberError ? "error-active" : ""
              //         }`}
              //         onChange={handleCardNumberChange}
              //         required
              //       />
              //       {cardNumberError ? (
              //         <svg
              //           className={`${
              //             cardNumberError ? "cvc-icon error-active" : ""
              //           }`}
              //           width="24"
              //           height="24"
              //           viewBox="0 0 24 24"
              //           xmlns="http://www.w3.org/2000/svg"
              //           role="img"
              //           aria-labelledby="cvcDesc"
              //         >
              //           <path
              //             opacity=".2"
              //             fillRule="evenodd"
              //             clipRule="evenodd"
              //             d="M15.337 4A5.493 5.493 0 0013 8.5c0 1.33.472 2.55 1.257 3.5H4a1 1 0 00-1 1v1a1 1 0 001 1h16a1 1 0 001-1v-.6a5.526 5.526 0 002-1.737V18a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h12.337zm6.707.293c.239.202.46.424.662.663a2.01 2.01 0 00-.662-.663z"
              //           ></path>
              //           <path
              //             opacity=".4"
              //             fillRule="evenodd"
              //             clipRule="evenodd"
              //             d="M13.6 6a5.477 5.477 0 00-.578 3H1V6h12.6z"
              //           ></path>
              //           <path
              //             fillRule="evenodd"
              //             clipRule="evenodd"
              //             d="M18.5 14a5.5 5.5 0 110-11 5.5 5.5 0 010 11zm-2.184-7.779h-.621l-1.516.77v.786l1.202-.628v3.63h.943V6.22h-.008zm1.807.629c.448 0 .762.251.762.613 0 .393-.37.668-.904.668h-.235v.668h.283c.565 0 .95.282.95.691 0 .393-.377.66-.911.66-.393 0-.786-.126-1.194-.37v.786c.44.189.88.291 1.312.291 1.029 0 1.736-.526 1.736-1.288 0-.535-.33-.967-.88-1.14.472-.157.778-.573.778-1.045 0-.738-.652-1.241-1.595-1.241a3.143 3.143 0 00-1.234.267v.77c.378-.212.763-.33 1.132-.33zm3.394 1.713c.574 0 .974.338.974.778 0 .463-.4.785-.974.785-.346 0-.707-.11-1.076-.337v.809c.385.173.778.26 1.163.26.204 0 .392-.032.573-.08a4.313 4.313 0 00.644-2.262l-.015-.33a1.807 1.807 0 00-.967-.252 3 3 0 00-.448.032V6.944h1.132a4.423 4.423 0 00-.362-.723h-1.587v2.475a3.9 3.9 0 01.943-.133z"
              //           ></path>
              //         </svg>
              //       ) : (
              //         <img
              //           src={credit_card}
              //           alt="Credit Card Icon"
              //           className="card-icon"
              //         />
              //       )}
              //     </div>
              //     {cardNumberError && (
              //       <div className="error-message">{cardNumberError}</div>
              //     )}
              //   </div>

              //   <label htmlFor="card-expiry">Expiration Date</label>
              //   <div className="input-wrapper">
              //     <div className="card-input-container">
              //       <CardExpiryElement
              //         id="card-expiry"
              //         className={`card-input ${
              //           expiryDateError ? "error-active" : ""
              //         }`}
              //         onChange={handleExpiryDateChange}
              //         required
              //       />
              //       <svg
              //         className={`cvc-icon ${
              //           expiryDateError ? "error-active" : ""
              //         }`}
              //         width="24"
              //         height="24"
              //         viewBox="0 0 24 24"
              //         xmlns="http://www.w3.org/2000/svg"
              //         role="img"
              //         aria-labelledby="cvcDesc"
              //       >
              //         <path
              //           opacity=".2"
              //           fillRule="evenodd"
              //           clipRule="evenodd"
              //           d="M15.337 4A5.493 5.493 0 0013 8.5c0 1.33.472 2.55 1.257 3.5H4a1 1 0 00-1 1v1a1 1 0 001 1h16a1 1 0 001-1v-.6a5.526 5.526 0 002-1.737V18a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h12.337zm6.707.293c.239.202.46.424.662.663a2.01 2.01 0 00-.662-.663z"
              //         ></path>
              //         <path
              //           opacity=".4"
              //           fillRule="evenodd"
              //           clipRule="evenodd"
              //           d="M13.6 6a5.477 5.477 0 00-.578 3H1V6h12.6z"
              //         ></path>
              //         <path
              //           fillRule="evenodd"
              //           clipRule="evenodd"
              //           d="M18.5 14a5.5 5.5 0 110-11 5.5 5.5 0 010 11zm-2.184-7.779h-.621l-1.516.77v.786l1.202-.628v3.63h.943V6.22h-.008zm1.807.629c.448 0 .762.251.762.613 0 .393-.37.668-.904.668h-.235v.668h.283c.565 0 .95.282.95.691 0 .393-.377.66-.911.66-.393 0-.786-.126-1.194-.37v.786c.44.189.88.291 1.312.291 1.029 0 1.736-.526 1.736-1.288 0-.535-.33-.967-.88-1.14.472-.157.778-.573.778-1.045 0-.738-.652-1.241-1.595-1.241a3.143 3.143 0 00-1.234.267v.77c.378-.212.763-.33 1.132-.33zm3.394 1.713c.574 0 .974.338.974.778 0 .463-.4.785-.974.785-.346 0-.707-.11-1.076-.337v.809c.385.173.778.26 1.163.26.204 0 .392-.032.573-.08a4.313 4.313 0 00.644-2.262l-.015-.33a1.807 1.807 0 00-.967-.252 3 3 0 00-.448.032V6.944h1.132a4.423 4.423 0 00-.362-.723h-1.587v2.475a3.9 3.9 0 01.943-.133z"
              //         ></path>
              //       </svg>
              //     </div>
              //     {expiryDateError && (
              //       <div className="error-message">{expiryDateError}</div>
              //     )}
              //   </div>

              //   <label htmlFor="card-cvc">CVC</label>
              //   <div className="input-wrapper">
              //     <div className="card-input-container">
              //       <CardCvcElement
              //         id="card-cvc"
              //         className={`card-input ${cvcError ? "error-active" : ""}`}
              //         onChange={handleCvcChange}
              //         required
              //       />
              //       {cvcError && (
              //         <svg
              //           className={`${cvcError ? "cvc-icon error-active" : ""}`}
              //           width="24"
              //           height="24"
              //           viewBox="0 0 24 24"
              //           xmlns="http://www.w3.org/2000/svg"
              //           role="img"
              //           aria-labelledby="cvcDesc"
              //         >
              //           <path
              //             opacity=".2"
              //             fillRule="evenodd"
              //             clipRule="evenodd"
              //             d="M15.337 4A5.493 5.493 0 0013 8.5c0 1.33.472 2.55 1.257 3.5H4a1 1 0 00-1 1v1a1 1 0 001 1h16a1 1 0 001-1v-.6a5.526 5.526 0 002-1.737V18a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h12.337zm6.707.293c.239.202.46.424.662.663a2.01 2.01 0 00-.662-.663z"
              //           ></path>
              //           <path
              //             opacity=".4"
              //             fillRule="evenodd"
              //             clipRule="evenodd"
              //             d="M13.6 6a5.477 5.477 0 00-.578 3H1V6h12.6z"
              //           ></path>
              //           <path
              //             fillRule="evenodd"
              //             clipRule="evenodd"
              //             d="M18.5 14a5.5 5.5 0 110-11 5.5 5.5 0 010 11zm-2.184-7.779h-.621l-1.516.77v.786l1.202-.628v3.63h.943V6.22h-.008zm1.807.629c.448 0 .762.251.762.613 0 .393-.37.668-.904.668h-.235v.668h.283c.565 0 .95.282.95.691 0 .393-.377.66-.911.66-.393 0-.786-.126-1.194-.37v.786c.44.189.88.291 1.312.291 1.029 0 1.736-.526 1.736-1.288 0-.535-.33-.967-.88-1.14.472-.157.778-.573.778-1.045 0-.738-.652-1.241-1.595-1.241a3.143 3.143 0 00-1.234.267v.77c.378-.212.763-.33 1.132-.33zm3.394 1.713c.574 0 .974.338.974.778 0 .463-.4.785-.974.785-.346 0-.707-.11-1.076-.337v.809c.385.173.778.26 1.163.26.204 0 .392-.032.573-.08a4.313 4.313 0 00.644-2.262l-.015-.33a1.807 1.807 0 00-.967-.252 3 3 0 00-.448.032V6.944h1.132a4.423 4.423 0 00-.362-.723h-1.587v2.475a3.9 3.9 0 01.943-.133z"
              //           ></path>
              //         </svg>
              //       )}
              //     </div>

              //     {cvcError && <div className="error-message">{cvcError}</div>}
              //   </div>

              //   <button
              //     className="checkout-btn"
              //     disabled={bookTourLoading}
              //     onClick={handleBooking}
              //   >
              //     {bookTourLoading ? "Processing..." : "Check Out"}
              //   </button>
              // </div>
              <div className="payment-container">
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm
                    cityName={cityName}
                    tourName={tourName}
                    tourId={tour.id}
                    tourPrice={tour.price}
                  />
                </Elements>
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
                  <div className="total-price">${totalPrice.toFixed(2)}</div>
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
