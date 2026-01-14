import React from "react";
import truckImage from "../assets/truck-port-ship-fleet-management.png";

function LoginPage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      {/* Login Form */}
      <form
        className="bg-dark text-white p-4 rounded shadow formbg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="mb-4 text-center" >Brighter Logistics Management System</h3>

        <div className="mb-3 text-start">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="form-control"
            placeholder="Enter username"
          />
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

        <p className="mt-3">
          Don't have an account?{" "}
          <a href="/register" className="text-info">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
