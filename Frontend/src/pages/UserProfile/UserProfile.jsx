import React, { useState, useEffect, useContext } from "react";
import "./UserProfile.css";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxiosFunction } from "../../hooks/useAxiosFunction";
import { useAuth0 } from "@auth0/auth0-react";
import { useAccessToken } from "../../hooks/useAccessToken";
import { baseURL } from "../../baseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../context/UserContextProvider";

const UserProfile = (
  {
    // userFromDb,
    // userFromDbError,
    // postedUser,
    // setPostedUser,
    // postedUserError,
    // setPostedUserError,
    // postedUserLoading,
    // setPostedUserLoading,
  }
) => {
  const { userName } = useParams();
  const { user } = useAuth0();
  const { token } = useAccessToken();
  //   const [userFromDb, userFromDbError, userFromDbLoading, axiosFetch] =
  //     useAxiosFunction();
  //   const [postedUser, setPostedUser] = useState(null);
  //   const [postedUserError, setPostedUserError] = useState(null);
  //   const [postedUserLoading, setPostedUserLoading] = useState(false);
  //   const [postedUser, postedUserDbError, postedUserLoading, axiosPostUser] =
  //     useAxiosFunction();
  const [postedUser, setPostedUser] = useState(null);
  const [postedUserError, setPostedUserError] = useState(null);
  const [postedUserLoading, setPostedUserLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    country: "",
    imageUrl: "",
  });
  const { userFromDb, userFromDbError, userFromDbLoading, refetchUser } =
    useContext(UserContext);
  const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Add this flag
  console.log("user sub is ", user?.sub);
  //   useEffect(() => {
  //     if (user && token) {
  //       axiosFetch({
  //         axiosInstance: axiosInstance,
  //         method: "GET",
  //         url: `/secure/users/search/findBySubject?subject=${encodeURIComponent(
  //           user.sub
  //         )}`,
  //         requestConfig: {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         },
  //       });
  //     }
  //   }, [user, token, postedUser]);
  console.log("postedUserError is ", postedUserError);

  useEffect(() => {
    console.log("user from db is ", userFromDb);
  }, [userFromDb]);
  //   if (userFromDbError) return <div className="user-profile-section">Error</div>;
  // if (userFromDbLoading)
  //   return <div className="user-profile-section">Loading...</div>;
  useEffect(() => {
    console.log("form data is ", formData);
  }, [formData]);
  useEffect(() => {
    if (!Array.isArray(userFromDb) && userFromDb && isEditing) {
      setFormData({
        firstName: userFromDb.firstName || "",
        lastName: userFromDb.lastName || "",
        city: userFromDb.city || "",
        country: userFromDb.country || "",
        imageUrl: userFromDb.imageUrl || "",
      });
    }
  }, [userFromDb, isEditing]);
  useEffect(() => {
    if (postedUser) {
      refetchUser();
      setIsEditing(false);
    }
  }, [postedUser]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostedUserLoading(true);
    setPostedUserError(null);
    const isUpdatingUser = !Array.isArray(userFromDb) && userFromDb;
    const url = isUpdatingUser
      ? `/secure/users/${userFromDb.id}`
      : `/secure/users`;
    const method = isUpdatingUser ? "PUT" : "POST";
    try {
      const response = await axiosInstance.request({
        url,
        method: method.toLowerCase(),
        data: formData,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response data is ", response.data);
      setPostedUser(response.data);
      setFormData({
        firstName: "",
        lastName: "",
        city: "",
        country: "",
        imageUrl: "",
      });
      toast.success(
        `User ${isUpdatingUser ? "updated" : "created"} successfully!`
      );
    } catch (error) {
      console.log(
        `error ${isUpdatingUser ? "updated" : "created"} user is: ${error}`
      );
      setPostedUserError(error);
      if (error.response) {
        // Server responded with a status other than 2xx
        toast.error(
          `Error: ${
            error.response.data.message ||
            `Failed to ${isUpdatingUser ? "updated" : "created"} user`
          }`
        );
      } else if (error.request) {
        // Request was made but no response was received
        toast.error("No response from server. Please try again later.");
      } else {
        // Some other error occurred
        toast.error(`Error: ${error.message}`);
      }
    } finally {
      setPostedUserLoading(false);
    }

    // axiosPostUser({
    //   axiosInstance: axiosInstance,
    //   method: "POST",
    //   url: "/secure/users",
    //   requestConfig: {
    //     data: formData,
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   },
    // });
  };

  return (
    <div className="user-profile-section">
      {Array.isArray(userFromDb) &&
        userFromDb.length <= 0 &&
        userFromDbError?.status === 404 && (
          <>
            <h2>UserProfile: Hello User {userName}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                City:
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                Country:
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                Image URL:
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <button type="submit" disabled={postedUserLoading}>
                {postedUserLoading ? "Registering..." : "Register"}
              </button>
            </form>
          </>
        )}
      {!Array.isArray(userFromDb) && userFromDb && (
        <div className="user-profile-container">
          <div className="content-left">
            <h2>
              Hello {userFromDb.firstName} {userFromDb.lastName}
            </h2>
            <div>
              <img
                src={userFromDb.imageUrl ? userFromDb.imageUrl : user.picture}
                alt="user profile image"
              />
            </div>
            <div>First Name: {userFromDb.firstName}</div>
            <div>Last Name: {userFromDb.lastName}</div>
            <div>City: {userFromDb.city}</div>
            <div>Country: {userFromDb.country}</div>
          </div>
          <div className="content-right">
            {showUpdateUserForm ? (
              <button
                className="update-user-btn"
                onClick={() => setShowUpdateUserForm(false)}
              >
                Close Form
              </button>
            ) : (
              <button
                className="update-user-btn"
                onClick={() => {
                  setShowUpdateUserForm(true);
                  setIsEditing(true);
                }}
              >
                Update User
              </button>
            )}
            {!Array.isArray(userFromDb) && userFromDb && (
              <Link
                to={`/users/${userFromDb.id}/my_bookings`}
                className="my-bookings-btn"
              >
                My Bookings
              </Link>
            )}
            {showUpdateUserForm && (
              <form onSubmit={handleSubmit}>
                <label>
                  First Name:
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <br />
                <label>
                  Last Name:
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <br />
                <label>
                  City:
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <br />
                <label>
                  Country:
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <br />
                <label>
                  Image URL:
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <button type="submit" disabled={postedUserLoading}>
                  {postedUserLoading ? "Updating..." : "Update"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
