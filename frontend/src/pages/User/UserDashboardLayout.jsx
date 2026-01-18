import React from "react";
import { Link, Outlet } from "react-router-dom";
function UserDashboardLayout() {
  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div
        className="border-end d-flex flex-column ps-5 pt-3"
        style={{ width: "25%" }}
      >
        <h3>Driver Panel</h3>
        <Link to="/user/dashboard" className="p-3 text-decoration-none">
          Dashboard
        </Link>

        <Link to="/user/trucks" className="p-3 text-decoration-none">
          Truck
        </Link>

        <Link to="/user/journeys" className="p-3 text-decoration-none">
          Journeys
        </Link>

        <span className="p-3 text-danger" style={{ cursor: "pointer" }}>
          Logout
        </span>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 p-4" style={{ width: "75%" }}>
        <Outlet />
      </div>
    </div>
  );
}
export default UserDashboardLayout;
