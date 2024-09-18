import React, { useState, useEffect, useContext } from "react";
import "./MyTourBooking.css";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAuth0 } from "@auth0/auth0-react";
import { useAxios } from "../../hooks/useAxios";
import { useAccessToken } from "../../hooks/useAccessToken";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAxiosFunction } from "../../hooks/useAxiosFunction";

const MyTourBooking = () => {
  const { token } = useAccessToken();
  const { isAuthenticated, isLoading } = useAuth0();
  const { userFromDb, userFromDbError, userFromDbLoading } =
    useContext(UserContext);
  const { id: userId } = useParams();
  console.log("userId is", userId);
  const [myBookings, myBookingsError, myBookingsLoading, fetchTourBookings] =
    useAxiosFunction();
  const [deletedTourBookingId, setDeletedTourBookingId] = useState(null);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchTourBookings({
        axiosInstance: axiosInstance,
        method: "GET",
        url: `/secure/tour-bookings/search/findByUserId?userId=${userId}`,
        requestConfig: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    }
  }, [isAuthenticated, token]);
  useEffect(() => {
    if (deletedTourBookingId) {
      fetchTourBookings({
        axiosInstance: axiosInstance,
        method: "GET",
        url: `/secure/tour-bookings/search/findByUserId?userId=${userId}`,
        requestConfig: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    }
  }, [deletedTourBookingId]);
  console.log("my bookings are ", myBookings);
  const deleteTourBooking = async (bookingId) => {
    try {
      const response = await axiosInstance({
        method: "DELETE",
        url: `/secure/tour-bookings/${bookingId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeletedTourBookingId(response.data.deletedId);
      toast("Tour booking deleted successfully");
    } catch (error) {
      toast.error("Error deleting tour booking");
    }
  };
  // Format the date to a human-friendly format
  const formattedDate = (dateString) => {
    const dateObject = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long", // Full month name (e.g., September)
      day: "numeric", // Day of the month (e.g., 12)
    }).format(dateObject);
  };
  if (myBookingsLoading) return <p>Loading...</p>;
  if (myBookingsError) return <p>Error fetching tour bookings</p>;
  return (
    <div className="my-tour-booking-section">
      <div className="my-tour-booking-title">
        <p>Tours</p>
        <p>Name</p>
        <p>Number of people</p>
        <p>Tour start date</p>
        <p>Total price</p>
        <p>Remove</p>
      </div>
      <br />
      <hr />
      {myBookings.length > 0 &&
        myBookings.map((booking) => {
          return (
            <div key={booking.id}>
              <div className="my-tour-booking-title tour-booking-item">
                <img
                  src={booking.tourPrimaryImageUrl}
                  alt={`${booking.tourName} image`}
                />
                <p>{booking.tourName}</p>
                <p>{booking.numberOfPeople}</p>
                <p>{formattedDate(booking.tourStartDate)}</p>
                <p>${booking.totalPrice.toFixed(2)}</p>
                <p
                  onClick={() => deleteTourBooking(booking.id)}
                  className="cross"
                >
                  x
                </p>
              </div>
              <hr />
            </div>
          );
        })}
    </div>
  );
};

export default MyTourBooking;
