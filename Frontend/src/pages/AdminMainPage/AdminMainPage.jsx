import React, { useState, useEffect } from "react";
import "./AdminMainPage.css";
import { useAuth0 } from "@auth0/auth0-react";
import { findRole } from "../../functions/findRole";
import { useAccessToken } from "../../hooks/useAccessToken";
import { useNavigate } from "react-router-dom";

const AdminMainPage = () => {
  const { isAuthenticated } = useAuth0();
  const { token } = useAccessToken();
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated && token) {
      const role = findRole(token);
      setRole(role);
      console.log("role is ", role);
      if (role !== "admin") {
        console.log("You are not authorized to view this page");
        navigate("/unauthorize");
      }
    }
  }, [isAuthenticated, token]);
  return <div className="admin-main-page">Admin page</div>;
};

export default AdminMainPage;
