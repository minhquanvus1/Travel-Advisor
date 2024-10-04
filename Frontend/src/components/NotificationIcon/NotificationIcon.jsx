import React, { useState, useEffect, useRef } from "react";
import "./NotificationIcon.css";
import { baseURL } from "../../baseUrl";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { Link } from "react-router-dom";

const NotificationIcon = () => {
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const stompClientRef = useRef(null);

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
          setNewNotificationCount((prev) => prev + 1);
        });
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
    };
  }, []);
  const handleNotificationClick = () => {
    // Reset the notification count to zero when clicked
    setNewNotificationCount(0);
    // Here you can also navigate to the notification view or modal
    console.log("Notifications viewed");
  };
  console.log("newnoticount is ", newNotificationCount);
  return (
    <div
      className="notification-icon-container"
      onClick={handleNotificationClick}
    >
      <Link to="/announcements">
        <i className="fas fa-bell"></i>
        {newNotificationCount > 0 && (
          <span className="notification-dot">{newNotificationCount}</span>
        )}
      </Link>
    </div>
  );
};

export default NotificationIcon;
