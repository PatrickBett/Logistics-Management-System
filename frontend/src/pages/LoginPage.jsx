import React, { useState, useContext } from "react";
import truckImage from "../assets/truck-port-ship-fleet-management.png";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { FaTruck, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { AdminContext } from "../contexts/AdminContext";

function LoginPage() {
  const { setIsAuthenticated } = useContext(AdminContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post("/api/token/", formData);
      const { access, refresh } = response.data;

      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);

      const decoded = jwtDecode(access);
      const role = decoded.role;
      localStorage.setItem("role", role);
      setIsAuthenticated(true);

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "manager") {
        navigate("/manager-dashboard");
      } else {
        navigate("/user/dashboard");
      }
      toast.success("LogIn Success!");
    } catch (err) {
      setError("Invalid username or password.");
      // toast.error("Login Failed");
    } finally {
      setLoading(false);
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
    },
    card: {
      width: "100%",
      maxWidth: "450px",
      backgroundColor: "#FFFFFF",
      padding: "3rem",
      borderRadius: "24px",
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
      fontSize: "1rem",
      marginTop: "1.5rem",
      boxShadow: `0px 10px 20px rgba(26, 131, 154, 0.2)`,
    },
  };

  return (
    <div style={styles.container}>
      {/* Visual Branding Side */}
      <div style={styles.imageSection} className="d-none d-lg-flex">
        <FaTruck style={{ fontSize: "5rem", marginBottom: "1.5rem" }} />
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
            textAlign: "center",
            maxWidth: "400px",
            lineHeight: "1.6",
          }}
        >
          Secure access to your fleet dashboard. Monitor operations, manage
          assets, and drive efficiency.
        </p>
      </div>

      {/* Login Interaction Side */}
      <div style={styles.formSection}>
        <div style={styles.card}>
          <div className="text-center mb-4 d-lg-none">
            <h2 style={{ color: brandTeal, fontWeight: "800" }}>FleetPro</h2>
          </div>

          <h2
            style={{
              color: darkNavy,
              fontWeight: "800",
              fontSize: "1.8rem",
              marginBottom: "0.5rem",
            }}
          >
            Sign In
          </h2>
          <p
            style={{
              color: "#A3AED0",
              fontWeight: "500",
              marginBottom: "2rem",
            }}
          >
            Enter your credentials to continue
          </p>

          <form onSubmit={handleLogin}>
            {error && (
              <div
                className="alert alert-danger py-2 small border-0 mb-4 text-center"
                style={{
                  borderRadius: "10px",
                  backgroundColor: "#FFF5F5",
                  color: "#E03131",
                }}
              >
                {error}
              </div>
            )}

            <div className="mb-4">
              <label style={styles.label}>Username</label>
              <input
                type="text"
                className="form-control"
                style={styles.input}
                placeholder="Enter username"
                required
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            <div className="mb-3 position-relative">
              <label style={styles.label}>Password</label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  style={styles.input}
                  placeholder="Enter password"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#A3AED0",
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember"
                  style={{ cursor: "pointer" }}
                />
                <label
                  className="form-check-label small text-muted"
                  htmlFor="remember"
                  style={{ cursor: "pointer" }}
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="small text-decoration-none"
                style={{ color: brandTeal, fontWeight: "600" }}
              >
                Forgot Password?
              </a>
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
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            <p className="mt-4 text-center text-muted small fontWeight-500">
              Not registered yet?{" "}
              <a
                href="/register"
                style={{
                  color: brandTeal,
                  fontWeight: "700",
                  textDecoration: "none",
                }}
              >
                Create Account
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
