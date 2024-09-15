// import { withAuthenticationRequired } from "@auth0/auth0-react";
// import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import UnauthorizedPage from "../../pages/UnauthorizedPage/UnauthorizedPage";
// export const AuthenticationGuard = ({
//   component,
//   allowedRoles = [],
//   ...props
// }) => {
//   const { user, isAuthenticated, isLoading } = useAuth0();
//   const userRole = user ? user["https://travel-advisor/api/roles"] : []; // Adjust based on your Auth0 setup

//   const isRoleAllowed =
//     allowedRoles.length === 0 ||
//     allowedRoles.some((role) => userRole.includes(role));
//   const Component = withAuthenticationRequired(component, {
//     onRedirecting: () => <div>Loading...</div>,
//   });
//   if (isLoading)
//     return (
//       <div style={{ display: "grid", placeItems: "center" }}>Loading...</div>
//     );
//   if (!isAuthenticated) {
//     return null;
//   }
//   return <>{isRoleAllowed ? <Component {...props} /> : <UnauthorizedPage />}</>;
// };

import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UnauthorizedPage from "../../pages/UnauthorizedPage/UnauthorizedPage";
import { useNavigate } from "react-router-dom";
export const AuthenticationGuard = ({
  component: Component,
  allowedRoles = [],
  ...props
}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const userRole = user ? user["https://travel-advisor/api/roles"] : []; // Adjust based on your Auth0 setup

  // Role-based authorization check
  const isRoleAllowed =
    allowedRoles.length === 0 ||
    allowedRoles.some((role) => userRole.includes(role));

  // Component with authentication required
  // const ProtectedComponent = withAuthenticationRequired(Component, {
  //   onRedirecting: () => (
  //     <div style={{ display: "grid", placeItems: "center", height: "100dvh" }}>
  //       Loading...
  //     </div>
  //   ),
  // });
  const ProtectedComponent = withAuthenticationRequired(Component, {
    onRedirecting: () => {
      // Redirect to the current path + /admin
      // window.location.href = window.location.origin + "/admin";
      // const history = useHistory();

      // Redirect to the current path + /admin
      // history.push(window.location.origin + "/admin");

      return (
        <div
          style={{ display: "grid", placeItems: "center", height: "100dvh" }}
        >
          Loading...
        </div>
      );
    },
  });

  // if (isLoading) {
  //   return (
  //     <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
  //       Loading...
  //     </div>
  //   );
  // }

  // if (!isAuthenticated) {
  //   // If not authenticated, `withAuthenticationRequired` should handle the redirection
  //   return null;
  // }

  // if (!isRoleAllowed) {
  //   return <UnauthorizedPage />;
  // }
  useEffect(() => {
    if (isAuthenticated && !isRoleAllowed) {
      console.log("You are not authorized to view this page");
      navigate("/unauthorize");
    }
  }, [isAuthenticated]);

  // Render the protected component if authenticated and authorized
  return <ProtectedComponent {...props} />;
};
