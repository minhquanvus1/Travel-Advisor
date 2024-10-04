import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-items">
        <NavLink to="/admin/users">Users</NavLink>
        <NavLink to="/admin/categories">Categories</NavLink>
        <NavLink to="/admin/subcategories">Subcategories</NavLink>
        <NavLink to="/admin/tour_bookings">Tour Bookings</NavLink>
        <NavLink to="/admin/announcement">Announcement</NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
