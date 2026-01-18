import React from "react";
import { Link, Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div
        className="border-end d-flex flex-column ps-5 pt-3"
        style={{ width: "25%" }}
      >
        <h3>Admin Panel</h3>
        <Link to="/admin/dashboard" className="p-3 text-decoration-none">
          Dashboard
        </Link>
        <Link to="/admin/drivers" className="p-3 text-decoration-none">
          Drivers
        </Link>
        <Link to="/admin/trucks" className="p-3 text-decoration-none">
          Trucks
        </Link>
        <Link to="/admin/parties" className="p-3 text-decoration-none">
          Parties
        </Link>
        <Link to="/admin/journeys" className="p-3 text-decoration-none">
          Journeys
        </Link>
        <Link to="/admin/report" className="p-3 text-decoration-none">
          Reports
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

export default AdminDashboard;
