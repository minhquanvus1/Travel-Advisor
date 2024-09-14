import React, { useState, useEffect, useContext } from "react";
import "./WriteReview.css";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxios } from "../../hooks/useAxios";
import { Link, useParams } from "react-router-dom";
import { replaceUnderScoreWithWhiteSpace } from "../../functions/replaceUnderScoreWithWhiteSpace";
import { replaceWhiteSpaceWithUnderScore } from "../../functions/replaceWhiteSpaceWithUnderScore";
import ReviewRating from "../../components/ReviewRating/ReviewRating";
import { UserContext } from "../../context/UserContextProvider";
import { useAxiosFunction } from "../../hooks/useAxiosFunction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WriteReview = () => {
  const { attractionName } = useParams();
  const [attraction, attractionError, attractionLoading] = useAxios({
    axiosInstance: axiosInstance,
    method: "GET",
    url: `/attractions/search/findByNameIgnoreCase?name=${replaceUnderScoreWithWhiteSpace(
      attractionName
    )}`,
  });
  const [reviewData, setReviewData] = useState(() => {
    const reviewDataFromLocalStorage = localStorage.getItem("reviewData");
    return reviewDataFromLocalStorage
      ? JSON.parse(reviewDataFromLocalStorage)
      : { reviewDescription: "", reviewTitle: "", rating: 0 };
  });
  const [ratingDescription, setRatingDescription] = useState("");
  const { userFromDb, userFromDbError, userFromDbLoading } =
    useContext(UserContext);
  const [postReviewLoading, setPostReviewLoading] = useState(false);
  const [postReviewError, setPostReviewError] = useState(null);
  console.log("attraction in review is ", attraction);
  console.log("review data is ", reviewData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };
  const handleRatingChange = (rating) => {
    setReviewData({ ...reviewData, rating: rating });
  };
  const postReview = async (e) => {
    e.preventDefault();
    if (Array.isArray(userFromDb)) {
      toast.error("Please login, and register to be user to post a review");
      return;
    }
    if (attractionError) {
      toast.error("Error fetching attraction details");
      return;
    }
    if (reviewData.rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (
      reviewData.reviewTitle.trim() === "" ||
      reviewData.reviewDescription.trim() === ""
    ) {
      toast.error("Review title and description cannot be empty");
      return;
    }
    const review = {
      description: reviewData.reviewDescription,
      title: reviewData.reviewTitle,
      rating: reviewData.rating,
      attractionId: attraction.id,
      userId: userFromDb.id,
    };
    setPostReviewLoading(true);
    setPostReviewError(null);
    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/attraction-reviews",
        data: review,
      });
      console.log("response is ", response);
      toast.success("Review posted successfully");
      setReviewData({ reviewDescription: "", reviewTitle: "", rating: 0 });
      localStorage.removeItem("reviewData");
    } catch (error) {
      setPostReviewError(error);
      console.error("Error posting review: ", error);
      toast.error("Error posting review");
    } finally {
      setPostReviewLoading(false);
    }
  };
  useEffect(() => {
    if (reviewData.rating < 1 || reviewData.rating > 5) {
      console.log("invalid user rating value");
      setRatingDescription("");
      return;
    }
    if (reviewData.rating === 1) {
      setRatingDescription("Terrible");
    } else if (reviewData.rating === 2) {
      setRatingDescription("Poor");
    } else if (reviewData.rating === 3) {
      setRatingDescription("Average");
    } else if (reviewData.rating === 4) {
      setRatingDescription("Very Good");
    } else {
      setRatingDescription("Excellent");
    }
  }, [reviewData.rating]);
  useEffect(() => {
    if (
      reviewData.rating !== 0 ||
      reviewData.reviewDescription.trim() !== "" ||
      reviewData.reviewTitle.trim() !== ""
    ) {
      localStorage.setItem("reviewData", JSON.stringify(reviewData));
    }
  }, [reviewData]);
  if (attractionLoading) return <div>Loading...</div>;
  if (attractionError) return <div>Error...</div>;
  return (
    <div className="write-review-section">
      <div className="content-left">
        <div className="title">Tell us, how was your visit?</div>
        <div className="item-card-container">
          <div className="item-card">
            <Link
              to={`/cities/${replaceWhiteSpaceWithUnderScore(
                attraction.cityName
              )}/attractions/${attraction.name}`}
            >
              <div className="image-container">
                <img
                  src={attraction.imageUrl}
                  alt={`${attraction.name} image`}
                />
              </div>
              <div className="item-card-title">{attraction.name}</div>
            </Link>
            <div className="address-string">
              {attraction.addressObj.address}
            </div>
            <div className="attraction-city">{attraction.cityName}</div>
          </div>
        </div>
      </div>
      <div className="content-right">
        <form onSubmit={postReview}>
          <div className="give-rating-container">
            <div className="title">How would you rate your experience?</div>
            <ReviewRating
              rating={reviewData.rating}
              setRating={handleRatingChange}
            ></ReviewRating>
          </div>
          <div className="give-review-description-container">
            <div className="title-container">
              <div className="title">Write your review</div>
              <div className="review-tips">
                <svg viewBox="0 0 24 24" width="20px" height="20px">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.868 1.782a.75.75 0 0 1 .75.75v1a.75.75 0 1 1-1.5 0v-1a.75.75 0 0 1 .75-.75m7.245 3.286a.75.75 0 0 1 0 1.06l-.707.708a.75.75 0 1 1-1.06-1.061l.706-.707a.75.75 0 0 1 1.061 0m-14.446.035a.75.75 0 0 1 1.06 0l.707.707a.75.75 0 0 1-1.06 1.061l-.707-.707a.75.75 0 0 1 0-1.06M9.96 7.968c-1.423 1.147-1.706 2.518-1.496 3.823.218 1.362.981 2.645 1.624 3.399l.18.21v1.292h4.05v-1.238l.121-.186c.904-1.39 1.454-2.897 1.49-4.211.034-1.284-.415-2.357-1.506-3.067-1.795-1.168-3.716-.51-4.463-.022m-.86-1.23c1.014-.68 3.637-1.635 6.142-.005 1.61 1.047 2.233 2.663 2.187 4.364-.043 1.602-.673 3.298-1.61 4.798v2.297H8.77v-2.247c-.725-.915-1.533-2.34-1.785-3.917-.283-1.76.134-3.713 2.067-5.253l.024-.02zm-5.807 6.03a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75m14.914 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75m-7.929 7.342v.608h4.036v-.608zm-1.5-.65c0-.47.381-.85.85-.85h5.336c.469 0 .85.38.85.85v1.846a.98.98 0 0 1-.308.7.8.8 0 0 1-.542.212H9.628a.8.8 0 0 1-.542-.212.98.98 0 0 1-.308-.7z"
                  ></path>
                </svg>
                <div className="text">Review tips</div>
              </div>
            </div>
            <textarea
              className="review-description"
              name="reviewDescription"
              rows="6"
              value={reviewData.reviewDescription}
              onChange={handleInputChange}
              placeholder="The views are amazing. We took so many photos!..."
              required
            ></textarea>
          </div>
          <div className="give-review-description-container">
            <div className="title-container">
              <div className="title">Title your review</div>
            </div>
            <input
              className="review-title"
              name="reviewTitle"
              value={reviewData.reviewTitle}
              onChange={handleInputChange}
              placeholder="Give us the gist of your experience"
              required
            />
            <div className="validate-rule">0/255 max characters</div>
          </div>
          <div className="write-review-condition">
            <input type="checkbox" required />
            <p>
              I certify that this review is based on my own experience and is my
              genuine opinion of this establishment and that I have no personal
              or business relationship with this establishment, and have not
              been offered any incentive or payment originating from the
              establishment to write this review. I understand that Travel
              Advisor has a zero-tolerance policy on fake reviews.
            </p>
          </div>
          <button
            type="submit"
            className="submit-review-btn"
            disabled={postReviewLoading}
          >
            {postReviewLoading ? "Submitting..." : "Submit review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteReview;
