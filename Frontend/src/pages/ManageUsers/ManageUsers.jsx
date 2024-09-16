import React, { useEffect, useContext } from "react";
import "./ManageUsers.css";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxiosFunction } from "../../hooks/useAxiosFunction";
import { useAccessToken } from "../../hooks/useAccessToken";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../../context/UserContextProvider";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageUsers = () => {
  const { token } = useAccessToken();
  const { isAuthenticated, isLoading } = useAuth0();
  const { userFromDb, userFromDbLoading } = useContext(UserContext);
  const [users, usersError, usersLoading, fetchUsers] = useAxiosFunction();
  const [deletedUserId, deleteUserError, deleteUserLoading, deleteUser] =
    useAxiosFunction();
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
  }, [isAuthenticated, token, deletedUserId]);
  const handleDeleteUser = async (userId) => {
    const data = await deleteUser({
      axiosInstance: axiosInstance,
      method: "DELETE",
      url: `/user/${userId}`,
    });
    if (data) {
      toast.success(`User with id ${userId} has been deleted successfully`);
    }
  };
  useEffect(() => {
    if (deleteUserError) {
      toast.error(
        `Error deleting user: ${deleteUserError.response.data.message}`
      );
    }
  }, [deleteUserError]);
  console.log("all users are ", users);
  console.log("deletedUserId is ", deletedUserId);
  if (isLoading || userFromDbLoading)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100dvh" }}>
        Loading...
      </div>
    );
  return (
    <div className="manage-users-section">
      <h2 className="manage-users-section-title">All Users List</h2>
      <div className="users-list-container">
        <div className="users-list-title table-headers">
          <p>Profile Image</p>
          <p>First Name</p>
          <p>Last Name</p>
          <p>City</p>
          <p>Country</p>
          <p>Remove</p>
        </div>
        <div className="users-list-contents">
          {users?.length > 0 &&
            users.map((user) => {
              if (user.id !== userFromDb.id) {
                return (
                  <div
                    key={user.id}
                    className="users-list-title users-list-item"
                  >
                    <div className="users-list-item-wrapper">
                      <Link
                        to={`/admin/users/${user.id}/user_details`}
                        className="users-list-item-link"
                      >
                        <img
                          src={user.imageUrl}
                          alt={`${user.firstName} profile image`}
                        />
                        <p>{user.firstName}</p>
                        <p>{user.lastName}</p>
                        <p>{user.city}</p>
                        <p>{user.country}</p>
                      </Link>
                    </div>
                    <p
                      className="remove-cross-icon"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      X
                    </p>
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
