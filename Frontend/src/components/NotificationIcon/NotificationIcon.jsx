import React, { useEffect, useRef } from "react";
import "./NotificationIcon.css";
import { baseURL } from "../../baseUrl";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxios } from "../../hooks/useAxios";

const NotificationIcon = ({
  newNotificationCount,
  setNewNotificationCount,
}) => {
  const stompClientRef = useRef(null);
  const [
    unreadNotifications,
    unreadNotificationsError,
    unreadNotificationsLoading,
    refetchUnreadNotifications,
  ] = useAxios({
    axiosInstance: axiosInstance,
    method: "GET",
    url: "/notifications/unread",
  });

  useEffect(() => {
    if (unreadNotifications.length > 0) {
      setNewNotificationCount(unreadNotifications.length);
    }
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
          if (!response.body.includes("Announcement is deleted with id"))
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
  }, [unreadNotifications]);
  const handleNotificationClick = () => {
    // Reset the notification count to zero when clicked
    setNewNotificationCount(0);
    // Here you can also navigate to the notification view or modal
    console.log("Notifications viewed");
  };
  console.log("newnoticount is ", newNotificationCount);

  if (unreadNotificationsError) {
    console.log("Error fetching unread notifications");
  }
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
