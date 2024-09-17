import React, { useState, useEffect } from "react";
import "./ManageTourBookings.css";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxios } from "../../hooks/useAxios";
import { useAxiosFunction } from "../../hooks/useAxiosFunction";
import { useAccessToken } from "../../hooks/useAccessToken";
import { useAuth0 } from "@auth0/auth0-react";
import { Bar, Line, Pie } from "react-chartjs-2";

const ManageTourBookings = () => {
  const { token } = useAccessToken();
  const { isAuthenticated, isLoading } = useAuth0();
  const [
    tourBookings,
    tourBookingsError,
    tourBookingsLoading,
    fetchTourBookings,
  ] = useAxios({
    axiosInstance: axiosInstance,
    method: "GET",
    url: "/tour-bookings",
  });
  const [users, usersError, usersLoading, fetchUsers] = useAxiosFunction();

  const [tourBookingsOfThisUser, setTourBookingsOfThisUser] = useState([]);
  const [updatedTourBookings, setUpdatedTourBookings] = useState([]);
  const [tourBookingsByMonth, setTourBookingsByMonth] = useState([]);
  useEffect(() => {
    if (!isAuthenticated || !token) return;
    fetchUsers({
      axiosInstance: axiosInstance,
      method: "GET",
      url: "/secure/users",
      requestConfig: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
  }, [isAuthenticated, token]);
  useEffect(() => {
    if (!users || !tourBookings) return;

    const totalRevenue = tourBookings.reduce(
      (acc, tourBooking) => acc + tourBooking.totalPrice,
      0
    );
    const tourBookingsOfThisUser = users.map((user) => {
      const tourBookingsOfThisUser = tourBookings.filter(
        (tourBooking) => tourBooking.userId === user.id
      );
      const userRevenue = tourBookingsOfThisUser.reduce(
        (acc, tourBooking) => acc + tourBooking.totalPrice,
        0
      );

      const userPercentage =
        totalRevenue > 0 ? ((userRevenue / totalRevenue) * 100).toFixed(2) : 0;
      return {
        userName: `${user.firstName} ${user.lastName}`,
        userContribution: userPercentage,
      };
    });
    setTourBookingsOfThisUser(tourBookingsOfThisUser);
  }, [tourBookings, users]);
  useEffect(() => {
    const revenueByTour = tourBookings.reduce((acc, tourBooking) => {
      if (!acc[tourBooking.tourName]) {
        acc[tourBooking.tourName] = 0;
      }
      acc[tourBooking.tourName] += tourBooking.totalPrice;
      return acc;
    }, {});

    const newTourBookings = tourBookings.reduce((acc, tourBooking) => {
      if (!acc.some((booking) => booking.tourName === tourBooking.tourName)) {
        acc.push({
          tourName: tourBooking.tourName,
          totalRevenue: revenueByTour[tourBooking.tourName],
        });
      }
      return acc;
    }, []);

    setUpdatedTourBookings(newTourBookings);
    console.log("updated tour bookings are ", newTourBookings);
  }, [tourBookings]);
  useEffect(() => {
    const revenueByMonth = tourBookings.reduce((acc, tourBooking) => {
      console.log("tour start date is ", tourBooking.tourStartDate);
      const month = new Date(tourBooking.tourStartDate).getMonth() + 1;
      const monthName = new Date(tourBooking.tourStartDate).toLocaleString(
        "en-US",
        { month: "long" }
      );
      console.log("month name  ", monthName);
      if (!acc[monthName]) {
        acc[monthName] = 0;
      }
      acc[monthName] += tourBooking.totalPrice;
      return acc;
    }, {});
    console.log("revenue by month is ", revenueByMonth);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const tourBookingsByMonth = monthNames.map((monthName) => {
      return {
        month: monthName,
        revenue: revenueByMonth[monthName] || 0,
      };
    });
    setTourBookingsByMonth(tourBookingsByMonth);
    console.log("tour bookings by month are ", tourBookingsByMonth);
  }, [tourBookings]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchTourBookings();
      fetchUsers({
        axiosInstance: axiosInstance,
        method: "GET",
        url: "/secure/users",
        requestConfig: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);
  const tourBookingsByMonthData = {
    labels: tourBookingsByMonth.map((tourBooking) => tourBooking.month),
    datasets: [
      {
        label: "Revenue ($)",
        data: tourBookingsByMonth.map((tourBooking) => tourBooking.revenue),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };
  const tourBookingsByMonthOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#444", // Legend text color
          font: {
            size: 14, // Legend font size
          },
        },
      },
      title: {
        display: true,
        text: "Revenue of Tour Over the Months",
        color: "#444",
        font: {
          size: 18, // Title font size
          weight: "bold", // Title font weight
        },
        padding: {
          bottom: 20, // Spacing below the title
        },
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#ddd",
        borderWidth: 1,
        caretSize: 6, // Tooltip arrow size
        padding: 10, // Tooltip padding
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
          color: "#444",
          font: {
            size: 16, // X-axis title font size
            weight: "bold", // X-axis title font weight
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "#444",
          autoSkip: false,
          font: {
            size: 12, // X-axis ticks font size
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue ($)",
          color: "#444",
          font: {
            size: 16, // Y-axis title font size
            weight: "bold", // Y-axis title font weight
          },
        },
        grid: {
          borderColor: "#ddd",
          borderWidth: 1,
          lineWidth: 0.5, // Grid line width
          color: "#ddd", // Grid line color
        },
        ticks: {
          color: "#444",
          beginAtZero: true,
          font: {
            size: 12, // Y-axis ticks font size
          },
        },
      },
    },
  };

  const userTourBookingsData = {
    labels: tourBookingsOfThisUser.map((tourBooking) => tourBooking.userName),
    datasets: [
      {
        label: "Revenue (%)",
        data: tourBookingsOfThisUser.map(
          (tourBooking) => tourBooking.userContribution
        ),
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(53, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
          "rgba(201, 203, 207)",
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };
  const userTourBookingsOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Revenue of Each User",
        color: "#333",
        font: {
          size: 18,
        },
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#ddd",
        borderWidth: 1,
        callbacks: {
          // Customize the label for each tooltip item
          label: function (context) {
            // Get the label and value
            const label = context.label || "";
            const value = Number(context.raw) || 0;
            // Customize the tooltip text
            return `${label}: ${value.toFixed(2)}%`;
          },
          // Customize the footer (if needed)
          footer: function (context) {
            // Example: display additional footer information
            return "Total Contribution";
          },
        },
      },
    },
  };
  const tourBookingsData = {
    labels: updatedTourBookings.map((tourBooking) => tourBooking.tourName),
    datasets: [
      {
        label: "Revenue ($)",
        data: updatedTourBookings.map(
          (tourBooking) => tourBooking.totalRevenue
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
        hoverBorderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };
  const tourBookingsOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Revenue of Each Tour",
        color: "#333",
        font: {
          size: 18,
        },
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#ddd",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tour Name",
          color: "#333",
          font: {
            size: 14,
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "#333",
          autoSkip: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue ($)",
          color: "#333",
          font: {
            size: 14,
          },
        },
        grid: {
          borderColor: "#ddd",
          borderWidth: 1,
        },
        ticks: {
          color: "#333",
          beginAtZero: true,
        },
      },
    },
  };
  console.log("all users are", users);
  console.log("all tour bookings are ", tourBookings);
  if (isLoading || tourBookingsLoading)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100dvh" }}>
        Loading...
      </div>
    );

  return (
    <div className="manage-tour-bookings-section">
      <h2 className="dashboard-title">Tour Bookings Dashboard</h2>
      <div className="chart-container">
        <div className="chart-item">
          <Bar data={tourBookingsData} options={tourBookingsOptions} />
        </div>
        <div className="chart-item">
          <Pie data={userTourBookingsData} options={userTourBookingsOptions} />
        </div>
        <div className="chart-item">
          <Line
            data={tourBookingsByMonthData}
            options={tourBookingsByMonthOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageTourBookings;
