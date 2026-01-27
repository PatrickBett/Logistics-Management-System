import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "./Header";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

import {
  FaTruck,
  FaUser,
  FaTachometerAlt,
  FaChartBar,
  FaRoute,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  // const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      toast.success("LoggedOut success");
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  return (
    <>
      <div className="d-flex vh-100">
        {/* Sidebar */}
        <div
          id="sidebar"
          className={`border-end d-flex flex-column ps-3 pt-3 bg-dark ${
            sidebarOpen ? "d-block" : "d-none"
          } d-md-flex`} // d-md-flex ensures sidebar is always visible on md+ screens
          style={{ width: "230px", minWidth: "230px" }}
        >
          <h3 style={{ color: "white" }} className="mb-5">
            Admin Panel
          </h3>

          <NavLink to="/admin/dashboard" className="sidebar-link">
            <FaTachometerAlt className="icon" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/drivers" className="sidebar-link">
            <FaUser className="icon" />
            <span>Drivers</span>
          </NavLink>

          <NavLink to="/admin/trucks" className="sidebar-link">
            <FaTruck className="icon" />
            <span>Trucks</span>
          </NavLink>

          <NavLink to="/admin/parties" className="sidebar-link">
            <FaUsers className="icon" />
            <span>Parties</span>
          </NavLink>

          <NavLink to="/admin/journeys" className="sidebar-link">
            <FaRoute className="icon" />
            <span>Journeys</span>
          </NavLink>

          <NavLink to="/admin/report" className="sidebar-link">
            <FaChartBar className="icon" />
            <span>Reports</span>
          </NavLink>

          <span
            className="p-3 mb-5 text-danger sidebar-link"
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-2" /> Logout
          </span>
        </div>

        {/* Main content */}
        <div
          className="flex-grow-1 px-3"
          style={{
            width: sidebarOpen ? "calc(100vw - 230px)" : "100%",
            maxHeight: "100vh",
            overflowY: "auto", // vertical scroll when content overflows
            overflowX: "hidden", // optional: hide horizontal scroll
          }}
        >
          <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
