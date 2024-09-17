import React, { useState, useEffect } from "react";
import "./AdminMainPage.css";
import { useAccessToken } from "../../hooks/useAccessToken";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const AdminMainPage = () => {
  const { isAuthenticated } = useAuth0();
  const { token } = useAccessToken();
  const navigate = useNavigate();
  //   useEffect(() => {
  //     if (isAuthenticated && token) {
  //       console.log("role is ", role);
  //       if (role !== "admin") {
  //         console.log("You are not authorized to view this page");
  //         navigate("/unauthorize");
  //       }
  //     }
  //   }, [isAuthenticated, token]);
  return (
    <div className="admin-main-page">
      <div className="admin-main-page-contents">Hello Admin</div>
    </div>
  );
};

export default AdminMainPage;
