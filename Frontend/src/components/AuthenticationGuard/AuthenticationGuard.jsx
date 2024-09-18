import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const AuthenticationGuard = ({
  component: Component,
  allowedRoles = [],
  ...props
}) => {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const userRole = user ? user["https://travel-advisor/api/roles"] : [];
  console.log("userRole is ", userRole);

  // Role-based authorization check
  const isRoleAllowed =
    allowedRoles.length === 0 ||
    allowedRoles.some((role) => userRole?.includes(role));

  const ProtectedComponent = withAuthenticationRequired(Component, {
    onRedirecting: () => {
      return (
        <div
          style={{ display: "grid", placeItems: "center", height: "100dvh" }}
        >
          Loading...
        </div>
      );
    },
  });

  useEffect(() => {
    if (isAuthenticated && !isRoleAllowed) {
      console.log("You are not authorized to view this page");
      navigate("/unauthorize");
    }
  }, [isAuthenticated]);

  // Render the protected component if authenticated and authorized
  return <ProtectedComponent {...props} />;
};
