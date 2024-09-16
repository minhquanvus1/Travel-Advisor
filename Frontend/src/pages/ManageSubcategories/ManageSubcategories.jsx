import React, { useState, useEffect, useRef } from "react";
import "./ManageSubcategories.css";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxiosFunction } from "../../hooks/useAxiosFunction";
import { useAccessToken } from "../../hooks/useAccessToken";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageSubcategories = () => {
  const { token } = useAccessToken();
  const { isAuthenticated, isLoading } = useAuth0();
  const [
    subcategories,
    subcategoriesError,
    subcategoriesLoading,
    fetchSubcategories,
  ] = useAxiosFunction();
  const [
    deletedSubcategoryId,
    deleteSubcategoryError,
    deleteSubcategoryLoading,
    deleteSubcategory,
  ] = useAxiosFunction();
  const [
    updatedSubcategoryId,
    updateSubcategoryError,
    updateSubcategoryLoading,
    updateSubcategory,
  ] = useAxiosFunction();
  const [
    postSubcategoryResponse,
    postSubcategoryError,
    postSubcategoryLoading,
    postSubcategory,
  ] = useAxiosFunction();
  const [categories, categoriesError, categoriesLoading, fetchCategories] =
    useAxiosFunction();
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", categoryId: "" });
  useEffect(() => {
    if (!isAuthenticated || !token) return;
    fetchSubcategories({
      axiosInstance: axiosInstance,
      method: "GET",
      url: "/subcategories",
      //   requestConfig: {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   },
    });
  }, [
    isAuthenticated,
    token,
    deletedSubcategoryId,
    updatedSubcategoryId,
    postSubcategoryResponse,
  ]);
  console.log("all subcategories are ", subcategories);

  const handleDeleteSubcategory = async (subcategoryId) => {
    const data = await deleteSubcategory({
      axiosInstance: axiosInstance,
      method: "DELETE",
      url: `/subcategories/${subcategoryId}`,
    });
    if (data) {
      toast.success(
        `Subcategory with id ${subcategoryId} has been deleted successfully`
      );
    }
  };
  const handlePostSubcategory = async (e) => {
    e.preventDefault();
    const data = await postSubcategory({
      axiosInstance: axiosInstance,
      method: "POST",
      url: `/subcategories`,
      requestConfig: {
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      },
    });
    if (data) {
      toast.success(`New Subcategory has been created successfully`);
      setOpenModal(false);
      setFormData({ name: "" });
    }
  };

  const handleClickedAddSubcategory = () => {
    setOpenModal(true);
    fetchCategories({
      axiosInstance: axiosInstance,
      method: "GET",
      url: "/categories",
    });
  };
  const toggleModal = (e) => {
    console.log("e.target is ", e.target);
    if (e.target === modalRef.current) {
      setOpenModal(false);
    }
  };
  useEffect(() => {
    if (deleteSubcategoryError) {
      toast.error(
        `Error deleting Subcategory: ${deleteSubcategoryError.response.data.message}`
      );
    }
    if (postSubcategoryError) {
      toast.error(
        `Error creating Subcategory: ${postSubcategoryError.response.data.message}`
      );
    }
  }, [deleteSubcategoryError, postSubcategoryError]);

  if (isLoading || subcategoriesLoading)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100dvh" }}>
        Loading...
      </div>
    );
  return (
    <div className="manage-subcategories-section">
      <div className="manage-subcategories-section-header">
        <h2 className="manage-categories-section-title">
          All Subcategories List
        </h2>
        <div className="post-btn">
          <button
            className="add-subcategory-button"
            onClick={() => handleClickedAddSubcategory()}
          >
            Add New Subcategory
          </button>
        </div>
      </div>
      <div className="subcategories-list-container">
        <div className="subcategories-list-title table-headers">
          <p>ID</p>
          <p>Name</p>
          <p>Remove</p>
        </div>
        <div className="subcategories-list-contents">
          {subcategories?.length > 0 &&
            subcategories
              .sort((a, b) => a.id - b.id)
              .map((subcategory) => (
                <div
                  className="subcategories-list-title category-item"
                  key={subcategory.id}
                >
                  <p>{subcategory.id}</p>
                  <p>{subcategory.name}</p>
                  <button
                    className="remove-button"
                    onClick={() => handleDeleteSubcategory(subcategory.id)}
                    disabled={deleteSubcategoryLoading}
                  >
                    {deleteSubcategoryLoading ? "Deleting..." : "Remove"}
                  </button>
                </div>
              ))}
        </div>
      </div>
      <div
        className={`update-category-modal-container ${
          openModal ? "active" : ""
        }`}
        ref={modalRef}
        onClick={(e) => toggleModal(e)}
      >
        <div className="update-category-modal">
          <div className="modal-close-icon" onClick={() => setOpenModal(false)}>
            X
          </div>
          <h2>Add new Subcategory</h2>
          <form onSubmit={handlePostSubcategory}>
            <label htmlFor="subcategoryName" className="modal-label">
              Subcategory Name
            </label>
            <input
              type="text"
              id="subcategoryName"
              className="modal-input"
              placeholder="Subcategory Name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              required
            />
            <label htmlFor="categoryId" className="modal-label">
              Category
            </label>
            <select
              name="categoryId"
              id="categoryId"
              value={formData.categoryId}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
              className="modal-select"
              required
            >
              <option value="">Select Category</option>
              {categories?.length > 0 &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
            <button
              type="submit"
              className="modal-update-button"
              disabled={postSubcategoryLoading}
            >
              {postSubcategoryLoading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageSubcategories;
