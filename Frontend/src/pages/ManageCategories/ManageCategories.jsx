import React, { useState, useEffect, useRef } from "react";
import "./ManageCategories.css";
import { axiosInstance } from "../../apis/axiosInstance";
import { useAxiosFunction } from "../../hooks/useAxiosFunction";
import { useAccessToken } from "../../hooks/useAccessToken";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageCategories = () => {
  const { token } = useAccessToken();
  const { isAuthenticated, isLoading } = useAuth0();
  const [categories, categoriesError, categoriesLoading, fetchCategories] =
    useAxiosFunction();
  const [
    deletedCategoryId,
    deleteCategoryError,
    deleteCategoryLoading,
    deleteCategory,
  ] = useAxiosFunction();
  const [
    updatedCategoryId,
    updateCategoryError,
    updateCategoryLoading,
    updateCategory,
  ] = useAxiosFunction();
  const [
    postCategoryResponse,
    postCategoryError,
    postCategoryLoading,
    postCategory,
  ] = useAxiosFunction();
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef(null);
  const [deleteLoading, setDeleteLoading] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "" });
  useEffect(() => {
    fetchCategories({
      axiosInstance: axiosInstance,
      method: "GET",
      url: "/categories",
    });
  }, [deletedCategoryId, updatedCategoryId, postCategoryResponse]);
  console.log("all categories are ", categories);

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!selectedCategory) return;
    const data = await updateCategory({
      axiosInstance: axiosInstance,
      method: "PUT",
      url: `/secure/categories/${selectedCategory.id}`,
      requestConfig: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      },
    });
    if (data) {
      toast.success(
        `Category with id ${selectedCategory.id} has been updated successfully`
      );
      setOpenModal(false);
      setFormData({ name: "" });
      setSelectedCategory(null);
    }
  };
  const handleDeleteCategory = async (categoryId) => {
    // Set loading state for this specific category ID to true
    setDeleteLoading((prev) => ({ ...prev, [categoryId]: true }));

    const data = await deleteCategory({
      axiosInstance: axiosInstance,
      method: "DELETE",
      url: `/secure/categories/${categoryId}`,
      requestConfig: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    if (data) {
      toast.success(
        `Category with id ${categoryId} has been deleted successfully`
      );
    }
    // Reset the loading state for this specific category after deletion
    setDeleteLoading((prev) => {
      const { [categoryId]: removed, ...rest } = prev; // Remove categoryId from the object
      return rest; // Return the updated object
    });
  };
  const handlePostCategory = async (e) => {
    e.preventDefault();
    const data = await postCategory({
      axiosInstance: axiosInstance,
      method: "POST",
      url: `/secure/categories`,
      requestConfig: {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      },
    });
    if (data) {
      toast.success(`New category has been created successfully`);
      setOpenModal(false);
      setFormData({ name: "" });
    }
  };
  const toggleModal = (e) => {
    console.log("e.target is ", e.target);
    if (e.target === modalRef.current) {
      setOpenModal(false);
    }
  };
  useEffect(() => {
    if (deleteCategoryError) {
      toast.error(
        `Error deleting Category: ${deleteCategoryError.response.data.message}`
      );
    }
    if (updateCategoryError) {
      toast.error(
        `Error updating Category: ${updateCategoryError.response.data.message}`
      );
    }
    if (postCategoryError) {
      toast.error(
        `Error creating Category: ${postCategoryError.response.data.message}`
      );
    }
  }, [deleteCategoryError, updateCategoryError, postCategoryError]);
  useEffect(() => {
    if (selectedCategory) {
      setFormData(selectedCategory);
    }
  }, [selectedCategory]);
  console.log("deleteLoading is", deleteLoading);
  if (isLoading || categoriesLoading)
    return (
      <div style={{ display: "grid", placeItems: "center", height: "100dvh" }}>
        Loading...
      </div>
    );
  return (
    <div className="manage-categories-section">
      <div className="manage-categories-section-header">
        <h2 className="manage-categories-section-title">All Categories List</h2>
        <div className="post-btn">
          <button
            className="add-category-button"
            onClick={() => setOpenModal(true)}
          >
            Add New Category
          </button>
        </div>
      </div>
      <div className="categories-list-container">
        <div className="categories-list-title table-headers">
          <p>ID</p>
          <p>Name</p>
          <p>Update</p>
          <p>Remove</p>
        </div>
        <div className="categories-list-contents">
          {categories?.length > 0 &&
            categories
              .sort((a, b) => a.id - b.id)
              .map((category) => (
                <div
                  className="categories-list-title category-item"
                  key={category.id}
                >
                  <p>{category.id}</p>
                  <p>{category.name}</p>
                  <button
                    className="update-button"
                    onClick={() => {
                      setSelectedCategory(category);
                      setOpenModal(true);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="remove-button"
                    onClick={() => handleDeleteCategory(category.id)}
                    disabled={
                      deleteCategoryLoading && deleteLoading[category.id]
                    }
                  >
                    {deleteCategoryLoading && deleteLoading[category.id]
                      ? "Deleting..."
                      : "Remove"}
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
          <h2>{selectedCategory ? "Update Category" : "Add new Category"}</h2>
          <form
            onSubmit={
              selectedCategory ? handleUpdateCategory : handlePostCategory
            }
          >
            <label htmlFor="categoryName" className="modal-label">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              className="modal-input"
              placeholder="Category Name"
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
            {selectedCategory ? (
              <button
                type="submit"
                className="modal-update-button"
                disabled={updateCategoryLoading}
              >
                {updateCategoryLoading ? "Updating..." : "Update"}
              </button>
            ) : (
              <button
                type="submit"
                className="modal-update-button"
                disabled={postCategoryLoading}
              >
                {postCategoryLoading ? "Saving..." : "Save"}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManageCategories;
