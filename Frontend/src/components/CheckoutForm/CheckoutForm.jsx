import React, { useState, useMemo, useContext } from "react";
import "./CheckoutForm.css";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { axiosInstance } from "../../apis/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../../context/UserContextProvider";
import { useAccessToken } from "../../hooks/useAccessToken";

const CheckoutForm = ({ cityName, tourName, tourId, tourPrice }) => {
  const { token } = useAccessToken();
  const { userFromDb } = useContext(UserContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const bookingDetails = JSON.parse(localStorage.getItem("bookingDetails"));

  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  const [bookTourLoading, setBookTourLoading] = useState(false);
  const [bookTourError, setBookTourError] = useState(null);
  let totalPrice = useMemo(() => {
    if (
      bookingDetails.numberOfPeople &&
      tourPrice &&
      !isNaN(bookingDetails.numberOfPeople) &&
      !isNaN(tourPrice)
    ) {
      return bookingDetails.numberOfPeople * tourPrice;
    }
  }, [bookingDetails, tourPrice]);
  console.log("total price is ", totalPrice);
  const handleBooking = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Please login to book this tour");
      loginWithRedirect();
      return;
    }

    if (!stripe || !elements) {
      console.error("Stripe.js or Elements not loaded.");
      return;
    }
    // Trigger the form submission and validation
    const { error: submitError } = await elements.submit();
    if (submitError) {
      console.error("Form submission error:", submitError);
      toast.error(`Form submission error: ${submitError.message}`);
      return;
    }
    const paymentInfo = {
      amount: Math.round(totalPrice * 100), // Convert to cents
      currency: "USD",
      receiptEmail: user.email,
    };

    setBookTourLoading(true);
    setBookTourError(null);

    try {
      // Create PaymentIntent
      const paymentIntentResponse = await axiosInstance({
        method: "POST",
        url: "/secure/payment-intent",
        data: paymentInfo,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const paymentIntent = paymentIntentResponse.data;

      const paymentResult = await stripe.confirmPayment(
        {
          elements,
          clientSecret: paymentIntent.client_secret,
          redirect: "if_required",
          confirmParams: {
            payment_method_data: {
              billing_details: {
                name: `${userFromDb.firstName} ${userFromDb.lastName}`, // Full name
                email: user.email,
                address: {
                  city: userFromDb.city,
                },
              },
            },
          },
        },
        { handleActions: false }
      );
      if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
      }

      // Booking Tour
      const bookingData = {
        tourId: tourId,
        userId: userFromDb.id,
        numberOfPeople: bookingDetails.numberOfPeople,
        tourStartDate: bookingDetails.tourStartDate,
        totalPrice: totalPrice,
      };

      const bookingResponse = await axiosInstance({
        method: "POST",
        url: "/secure/book-tour",
        data: bookingData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(
        `Tour booked successfully with Tour Tracking Number: ${bookingResponse.data.tourBookingTrackingNumber}`
      );
      localStorage.removeItem("bookingDetails");
      navigate(`/cities/${cityName}/tours/${tourName}`);
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        toast.error(`Error booking tour: ${error.response.data}`);
      } else if (error.request) {
        toast.error(
          `Error booking tour: No response from server. ${error.request}`
        );
      } else {
        toast.error(`Error booking tour: ${error.message}`);
      }
    } finally {
      setBookTourLoading(false);
    }
  };
  if (!bookingDetails) return <div>Booking details not found</div>;
  return (
    <div>
      <h2>Pay with Credit Card: </h2>
      <form onSubmit={handleBooking}>
        <PaymentElement />
        <button
          type="submit"
          className="checkout-btn"
          disabled={bookTourLoading}
        >
          {bookTourLoading ? "Processing..." : "Submit"}
        </button>
        {bookTourError && <div className="error">{bookTourError.message}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
