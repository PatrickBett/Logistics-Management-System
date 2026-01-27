import React from "react";
import { useState } from "react";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    license_no: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //password validation
    if (formData.password !== formData.confirm_password) {
      setError("Passwords must match");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be 6 characters or more");
      return;
    }
    setError("");

    try {
      const response = await api.post("api/auth/driver/register/", formData);
      console.log(response.data);
      toast.success("Signup successful!");
      setFormData({
        license_no: "",
        username: "",
        password: "",
        confirm_password: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("ERROR Registering!!");
    }
  };
  return (
    <>
      {error && (
        <div className="d-flex justify-content-center">
          <div
            className="alert alert-danger"
            style={{ maxWidth: "400px", width: "100%" }}
          >
            {error}
          </div>
        </div>
      )}
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <form
          onSubmit={handleSubmit}
          className="bg-dark text-white p-4 rounded shadow formbg"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h3 className="text-center mb-4">Register as Driver</h3>

          <div className="mb-3">
            <label htmlFor="license_no" className="form-label">
              License Number
            </label>
            <input
              type="text"
              name="license_no"
              id="license_no"
              className="form-control"
              placeholder="Enter Driving License"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              placeholder="Enter username"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Enter password"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              className="form-control"
              placeholder="Confirm password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
          <p className="text-center mt-3">
            Already have an account?{" "}
            <a href="/" className="text-info">
              Login
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;
