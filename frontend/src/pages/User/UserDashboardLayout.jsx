import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../Admin/Header";
import { toast } from "react-toastify";

function UserDashboardLayout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      toast.success("Loggedout success");
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Header />
      <div className="d-flex vh-100">
        {/* Sidebar */}
        <div
          className="border-end d-flex flex-column ps-5 pt-3 bg-dark"
          style={{ width: "260px", minWidth: "260px" }}
        >
          <h3 style={{ color: "white" }}>Driver Panel</h3>
          <Link to="/user/dashboard" className="p-3 text-decoration-none">
            Dashboard
          </Link>

          <Link to="/user/trucks" className="p-3 text-decoration-none">
            Truck
          </Link>

          <Link to="/user/journeys" className="p-3 text-decoration-none">
            Journeys
          </Link>

          <span
            className="p-3 text-danger"
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            Logout
          </span>
        </div>

        {/* Main content */}
        <div className="flex-grow-1 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default UserDashboardLayout;
