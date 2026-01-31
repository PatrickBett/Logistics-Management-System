import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../Admin/Header";
import { toast } from "react-toastify";
import { useState } from "react";
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

function UserDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("role");
      toast.success("Loggedout success");

      navigate("/");
      window.location.reload();
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
          <h3 style={{ color: "white" }}>User Panel</h3>

          <NavLink
            to="/user/dashboard"
            className="p-3 text-decoration-none sidebar-link"
          >
            <FaTachometerAlt className="me-2" />
            Dashboard
          </NavLink>

          <NavLink
            to="/user/trucks"
            className="p-3 text-decoration-none sidebar-link"
          >
            <FaTruck className="me-2" />
            Trucks
          </NavLink>

          <NavLink
            to="/user/journeys"
            className="p-3 text-decoration-none sidebar-link"
          >
            <FaRoute className="me-2" /> Journeys
          </NavLink>

          <span
            className="p-3 text-danger sidebar-link"
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
export default UserDashboardLayout;
