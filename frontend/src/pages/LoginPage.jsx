import React, { useState } from "react";
import truckImage from "../assets/truck-port-ship-fleet-management.png";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { FaTruck } from "react-icons/fa";
import { useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";

function LoginPage() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AdminContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("api/token/", formData);

      const { access, refresh } = response.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      // 🔑 Decode token to get role
      const decoded = jwtDecode(access);
      console.log(decoded);
      const role = decoded.role;
      localStorage.setItem("role", role);
      setIsAuthenticated(true);

      // 🧭 Role-based navigation
      if (role === "admin") {
        navigate("/admin/dashboard");
        // window.location.reload();
      } else if (role === "manager") {
        navigate("/manager-dashboard");
        // window.location.reload();
      } else {
        navigate("/user/dashboard");
        // window.location.reload();
      }
      toast.success("Logged In Successfully");
    } catch (err) {
      setError("Invalid username or password");
      console.error(err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="bg-dark text-white p-4 rounded shadow formbg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h1 className="text-center">
          <FaTruck style={{ color: "#FF5349" }} />
        </h1>
        <h3 className="mb-4 text-center">
          Brighter Logistics Management System
        </h3>

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
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {isLoading ? "Logging In..." : "Login"}
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
