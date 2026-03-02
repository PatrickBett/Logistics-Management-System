import React, { useState } from "react";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaIdCard, FaShippingFast } from "react-icons/fa";
import truckImage from "../assets/truck-port-ship-fleet-management.png";

function RegisterPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (formData.password !== formData.confirm_password) {
      setError("Passwords must match");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be 6 characters or more");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await api.post("api/auth/driver/register/", formData);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please check your details.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- BRAND COLOR THEME ---
  const brandTeal = "#1a839a";
  const darkNavy = "#2B3674";

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      backgroundColor: "#F4F7FE",
      overflow: "hidden",
    },
    imageSection: {
      flex: 1.2,
      // Using #1a839a in a gradient overlay
      backgroundImage: `linear-gradient(rgba(26, 131, 154, 0.9), rgba(26, 131, 154, 0.7)), url(${truckImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      padding: "3rem",
    },
    formSection: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem",
      overflowY: "auto",
    },
    card: {
      width: "100%",
      maxWidth: "480px",
      backgroundColor: "#FFFFFF",
      padding: "2.5rem",
      borderRadius: "24px", // Smoother rounded corners
      boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.04)",
    },
    label: {
      color: darkNavy,
      fontWeight: "600",
      fontSize: "0.85rem",
      marginBottom: "8px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    input: {
      borderRadius: "12px",
      padding: "12px 15px",
      border: "1px solid #E0E5F2",
      fontSize: "0.95rem",
      color: darkNavy,
      backgroundColor: "#F9FAFB",
    },
    primaryBtn: {
      backgroundColor: brandTeal,
      border: "none",
      borderRadius: "12px",
      padding: "14px",
      fontWeight: "700",
      marginTop: "1rem",
      boxShadow: `0px 10px 20px rgba(26, 131, 154, 0.2)`,
      transition: "transform 0.2s ease",
    },
    iconWrap: {
      position: "absolute",
      right: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#A3AED0",
    },
  };

  return (
    <div style={styles.container}>
      {/* Visual Branding Side */}
      <div style={styles.imageSection} className="d-none d-lg-flex">
        <div className="text-center">
          <FaShippingFast
            style={{ fontSize: "5rem", marginBottom: "1.5rem" }}
          />
          <h1
            style={{
              fontWeight: "800",
              fontSize: "3rem",
              letterSpacing: "-1.5px",
            }}
          >
            FleetPro
          </h1>
          <div
            style={{
              width: "60px",
              height: "4px",
              backgroundColor: "white",
              margin: "20px auto",
              borderRadius: "2px",
            }}
          ></div>
          <p
            style={{
              fontSize: "1.2rem",
              opacity: 0.95,
              maxWidth: "450px",
              fontWeight: "400",
              lineHeight: "1.6",
            }}
          >
            Empowering the modern driver. Seamlessly track trips, manage your
            vehicle, and optimize your routes in real-time.
          </p>
        </div>
      </div>

      {/* Form Interaction Side */}
      <div style={styles.formSection}>
        <div style={styles.card}>
          <div className="mb-4">
            <h2
              style={{ color: darkNavy, fontWeight: "800", fontSize: "1.8rem" }}
            >
              Create Account
            </h2>
            <p style={{ color: "#A3AED0", fontWeight: "500" }}>
              Enter your details to join the network
            </p>
          </div>

          {error && (
            <div
              className="alert alert-danger py-2 small border-0 mb-4 text-center"
              style={{
                borderRadius: "10px",
                backgroundColor: "#FFF5F5",
                color: "#E03131",
              }}
            >
              <strong>Error:</strong> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label style={styles.label}>License Number</label>
              <input
                type="text"
                name="license_no"
                className="form-control"
                style={styles.input}
                placeholder="Ex: AB12345"
                required
                value={formData.license_no}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label style={styles.label}>Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                style={styles.input}
                placeholder="Choose a username"
                required
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3 position-relative">
              <label style={styles.label}>Password</label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  style={styles.input}
                  placeholder="Min. 6 characters"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.iconWrap}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="mb-4 position-relative">
              <label style={styles.label}>Confirm Password</label>
              <div className="position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  className="form-control"
                  style={styles.input}
                  placeholder="Repeat your password"
                  required
                  value={formData.confirm_password}
                  onChange={handleChange}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.iconWrap}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 shadow-sm"
              style={styles.primaryBtn}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Registering...
                </>
              ) : (
                "Get Started"
              )}
            </button>

            <div className="text-center mt-4 pt-2">
              <span
                style={{
                  color: "#A3AED0",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                Already a member?{" "}
              </span>
              <a
                href="/"
                style={{
                  color: brandTeal,
                  fontWeight: "700",
                  textDecoration: "none",
                }}
              >
                Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
