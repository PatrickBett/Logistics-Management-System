import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "./Header";
import { FaBars } from "react-icons/fa";

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
      <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <div className="d-flex vh-100">
        {/* Sidebar */}
        <div
          className={`border-end d-flex flex-column ps-3 pt-3 bg-dark ${
            sidebarOpen ? "d-block" : "d-none"
          } d-md-flex`} // d-md-flex ensures sidebar is always visible on md+ screens
          style={{ width: "230px", minWidth: "230px" }}
        >
          <h3 style={{ color: "white" }}>Admin Panel</h3>

          <Link to="/admin/dashboard" className="p-3 text-decoration-none">
            <FaTachometerAlt className="me-2" />
            Dashboard
          </Link>
          <Link to="/admin/drivers" className="p-3 text-decoration-none">
            <FaUser className="me-2" />
            Drivers
          </Link>
          <Link to="/admin/trucks" className="p-3 text-decoration-none">
            <FaTruck className="me-2" />
            Trucks
          </Link>
          <Link to="/admin/parties" className="p-3 text-decoration-none">
            <FaUsers className="me-2" />
            Parties
          </Link>
          <Link to="/admin/journeys" className="p-3 text-decoration-none">
            <FaRoute className="me-2" /> Journeys
          </Link>
          <Link to="/admin/report" className="p-3 text-decoration-none">
            <FaChartBar className="me-2" />
            Reports
          </Link>
          <span
            className="p-3 text-danger"
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-2" /> Logout
          </span>
        </div>

        {/* Main content */}
        <div
          className="flex-grow-1 p-4"
          style={{ width: "calc(100vw - 230px)" }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
