import React, { useEffect, useRef } from "react";
import "./AnnouncementsPage.css";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxios } from "../../hooks/useAxios";
import ExpandableDescription from "../../components/ExpandableDescription/ExpandableDescription";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { baseURL } from "../../baseUrl";

const AnnouncementsPage = () => {
  const [announcements, error, loading, refetch] = useAxios({
    axiosInstance: axiosInstance,
    method: "GET",
    url: "/notifications",
  });
  const stompClientRef = useRef(null);
  console.log("announcements are: ", announcements);
  const formatDate = (dateString) => {
    // Convert the date string into a Date object
    const dateObject = new Date(dateString);

    // Format the date using toLocaleString with options
    const formattedDate = dateObject.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
    return formattedDate;
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
          refetch();
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
  const markAsRead = async (announcementId) => {
    try {
      // Send PATCH request with the isRead: true field in the body
      const response = await axiosInstance.patch(
        `/notifications/${announcementId}`
      );
      console.log("mark as read ", response.data);
      refetch();
    } catch (error) {
      console.error("Error marking the announcement as read:", error);
    }
  };

  if (loading)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100dvh" }}>
        Loading...
      </div>
    );
  if (error)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100dvh" }}>
        Error fetching announcements...
      </div>
    );
  return (
    <div className="announcements-page-section">
      <h2 className="announcements-page-section-title">Announcements</h2>
      <div className="announcements-card-container">
        {announcements.length > 0 &&
          announcements.map((announcement) => (
            <div
              className={`announcement-card ${
                announcement.isRead ? "read" : "unread"
              }`}
              key={announcement.id}
              onClick={() => markAsRead(announcement.id)}
            >
              <div className="card-header">
                <div className="content-left">
                  <img
                    src={announcement.sender?.imageUrl}
                    alt={`${announcement.sender?.firstName} ${announcement.sender?.lastName}`}
                    className="sender-image"
                  />
                </div>
                <div className="content-right">
                  <h3 className="announcement-title">{announcement.title}</h3>
                  <h4 className="created-date-time">
                    {formatDate(announcement.sentAt)}
                  </h4>
                  <div className="sender-info">
                    <h4 className="sender-name">
                      {announcement.sender?.firstName}{" "}
                      {announcement.sender?.lastName}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="announcement-message">
                <ExpandableDescription
                  text={announcement.message}
                  lineClamp={7}
                ></ExpandableDescription>
              </div>
            </div>
          ))}
      </div>
      {announcements.length <= 0 && (
        <div
          style={{ display: "grid", placeItems: "center", height: "100dvh" }}
        >
          There are no announcements now
        </div>
      )}
    </div>
  );
};

export default AnnouncementsPage;
