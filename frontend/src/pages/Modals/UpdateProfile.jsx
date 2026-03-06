import React, { useState } from "react";
import { FaUser, FaShieldAlt, FaTimes, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateProfile = ({ user, onClose }) => {
  const [username, setUsername] = useState(user?.username || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const updateProfile = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("access");
    // We use the ID from your decoded JWT (ensure your token has 'user_id' or 'id')
    const userId = user?.user_id || user?.id;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/users/${userId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username: username }),
        },
      );
      toast.success("Profile updated");

      if (response.ok) {
        // Success: Close the div and refresh to show new name in Header
        onClose();
        window.location.reload();
        const handleLogout = () => {
          try {
            localStorage.clear();
            toast.success("Profile updated");
            navigate("/");
            window.location.reload();
          } catch (e) {
            console.error("Logout error:", e);
          }
        };
        handleLogout();
      } else {
        const errData = await response.json();
        // Django returns errors as arrays, e.g., { username: ["This field is required"] }
        setError(
          errData.username
            ? errData.username[0]
            : "Update failed. Please try again.",
        );
      }
    } catch (err) {
      setError("Server connection failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold m-0" style={{ color: "#2B3674" }}>
          Edit Profile
        </h5>
        <button
          className="btn p-0 border-0"
          onClick={onClose}
          disabled={loading}
        >
          <FaTimes color="#A3AED0" />
        </button>
      </div>

      {/* Error Message Display */}
      {error && (
        <div
          className="alert alert-danger py-2 small mb-3"
          style={{ borderRadius: "10px" }}
        >
          {error}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label small fw-bold text-muted">USERNAME</label>
        <div className="input-group">
          <span className="input-group-text bg-light border-0">
            <FaUser color="#1a839a" />
          </span>
          <input
            type="text"
            className="form-control bg-light border-0 shadow-none"
            style={{ borderRadius: "0 10px 10px 0" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label small fw-bold text-muted">ROLE</label>
        <div className="input-group opacity-75">
          <span className="input-group-text bg-light border-0">
            <FaShieldAlt color="#1a839a" />
          </span>
          <input
            type="text"
            className="form-control bg-light border-0 shadow-none"
            value={`${user?.role || "User"} Manager`}
            disabled
          />
        </div>
      </div>

      <button
        className="btn w-100 py-2 text-white fw-bold d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: "#1a839a",
          borderRadius: "12px",
          opacity: loading ? 0.7 : 1,
        }}
        onClick={updateProfile}
        disabled={loading}
      >
        {loading ? (
          <span className="spinner-border spinner-border-sm me-2"></span>
        ) : (
          <FaCheck className="me-2" />
        )}
        {loading ? "Updating..." : "Save Changes"}
      </button>
    </div>
  );
};

export default UpdateProfile;
