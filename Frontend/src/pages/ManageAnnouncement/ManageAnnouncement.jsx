import React, { useState, useEffect, useContext, useRef } from "react";
import "./ManageAnnouncement.css";
import { UserContext } from "../../context/UserContextProvider";
import { baseURL } from "../../baseUrl";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageAnnouncement = () => {
  const [announcementData, setAnnouncementData] = useState({
    title: "",
    message: "",
  });
  const { userFromDb } = useContext(UserContext);
  //   const stompClientRef = useRef(null);
  const [stompClientState, setStompClientState] = useState(null);
  //   const [successMessage, setSuccessMessage] = useState("");
  //   const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    const socket = new SockJS(`${baseURL}/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log("Connected to WebSocket");
        stompClient.subscribe("/topic/notifications", (response) => {
          console.log("Received message:", response.body);
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    stompClient.activate();
    // stompClientRef.current = stompClient;
    setStompClientState(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    // setErrorMessage("");
    // setSuccessMessage("");

    // Validate form inputs
    if (!announcementData.title.trim()) {
      toast.error("Notification Title must be provided");
      return;
    }

    if (!announcementData.message.trim()) {
      toast.error("Notification Message must be provided");
      return;
    }

    // Prepare the notification data
    const notificationData = {
      ...announcementData,
      senderId: userFromDb.id, // Use the sender ID from the user
    };
    // const stompClient = stompClientRef.current;
    if (stompClientState) {
      stompClientState.publish({
        destination: "/app/send-noti",
        body: JSON.stringify(notificationData),
      });
      toast.success("Notification sent successfully!");

      // Reset the form fields
      setAnnouncementData({ title: "", message: "" });
    } else {
      toast.error("Unable to send notification, WebSocket not connected.");
      console.log("Stomp Client not connected");
    }
  };
  console.log("stompclientRef is ", stompClientState);
  return (
    <div className="manage-announcement-section">
      <h2 className="form-title">Send Notification</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Notification Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={announcementData.title}
            onChange={handleChange}
            required
            placeholder="Enter Notification Title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Notification Message:</label>
          <textarea
            id="message"
            name="message"
            value={announcementData.message}
            onChange={handleChange}
            required
            placeholder="Enter Notification Message"
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Send Notification
        </button>
      </form>
      {/* {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )} */}
    </div>
  );
};

export default ManageAnnouncement;
