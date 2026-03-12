import React, { useContext, useEffect, useState, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaBell,
  FaUser,
  FaShieldAlt,
  FaCheck,
} from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { AdminContext } from "../../contexts/AdminContext";
import { jwtDecode } from "jwt-decode";
import UpdateProfile from "../Modals/UpdateProfile";

function Header({ onToggleSidebar, sidebarOpen }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // States for UI Interaction
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUpdateDivOpen, setIsUpdateDivOpen] = useState(false);

  const dropdownRef = useRef(null);

  const access = localStorage.getItem("access");
  const dec = access ? jwtDecode(access) : null;
  const username = dec?.username || "Driver";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const styles = {
    header: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid #E9EDF7",
      padding: "0.75rem 2rem",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    actionIcon: {
      fontSize: "1.2rem",
      color: "#A3AED0",
      cursor: "pointer",
    },
    badge: {
      position: "absolute",
      top: "-4px",
      right: "-4px",
      backgroundColor: "#EE5D50",
      color: "white",
      borderRadius: "50%",
      width: "18px",
      height: "18px",
      fontSize: "10px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid white",
    },
    profileSection: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "4px 12px",
      borderRadius: "30px",
      cursor: "pointer",
      position: "relative",
    },
    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "30px",
      objectFit: "cover",
      border: "2px solid #1a839a",
    },
    dropdownPop: {
      position: "absolute",
      top: "120%",
      right: "0px",
      backgroundColor: "white",
      boxShadow: "0px 10px 40px rgba(112, 144, 176, 0.2)",
      padding: "1.25rem",
      borderRadius: "20px",
      border: "1px solid #E9EDF7",
      minWidth: "230px",
      zIndex: 1100,
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      animation: "slideInDown 0.3s ease-out",
    },
    profileButton: {
      backgroundColor: "#1a839a",
      color: "white",
      border: "none",
      padding: "10px 16px",
      borderRadius: "12px",
      fontSize: "0.85rem",
      fontWeight: "600",
      cursor: "pointer",
      width: "100%",
    },
    // The "Pop from Left" edit div styles
    updateDiv: {
      position: "fixed",
      top: "80px", // Just below header
      right: isUpdateDivOpen ? "20px" : "-400px", // Slides in from right
      width: "350px",
      backgroundColor: "white",
      boxShadow: "0px 20px 50px rgba(0,0,0,0.15)",
      borderRadius: "20px",
      padding: "1.5rem",
      zIndex: 2000,
      transition: "right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    },
  };

  return (
    <header style={styles.header}>
      <style>
        {`
          @keyframes slideInDown {
            from { transform: translateY(-10px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .header-profile-hover:hover { background-color: #f7f9ff; }
        `}
      </style>

      {/* Left Section */}
      <div className="d-flex align-items-center">
        <button
          className="btn border-0 d-md-none me-3"
          onClick={onToggleSidebar}
        >
          {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
        <span className="d-none d-md-block fw-medium text-muted small">
          Pages / Dashboard
        </span>
      </div>

      {/* Right Section */}
      <div className="d-flex align-items-center gap-4">
        <div
          className="position-relative"
          style={{ cursor: "pointer" }}
          onClick={() => setUnreadCount(0)}
        >
          <FaBell style={styles.actionIcon} />
          {unreadCount > 0 && <span style={styles.badge}>{unreadCount}</span>}
        </div>

        <div
          ref={dropdownRef}
          style={styles.profileSection}
          className="header-profile-hover"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/250px-Outdoors-man-portrait_%28cropped%29.jpg"
            style={styles.avatar}
            alt="profile"
          />
          <div className="d-none d-lg-block">
            <div
              style={{
                color: "#2B3674",
                fontWeight: "700",
                fontSize: "0.9rem",
              }}
            >
              {username}
            </div>
          </div>
          <IoMdArrowDropdown
            style={{
              color: "#A3AED0",
              transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0)",
              transition: "0.3s",
            }}
          />

          {isDropdownOpen && (
            <div
              style={styles.dropdownPop}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ marginBottom: "4px" }}>
                <div style={{ color: "#2B3674", fontSize: "0.95rem" }}>
                  Hello, <strong>{username}</strong>
                </div>
                <span style={{ color: "#A3AED0", fontSize: "0.8rem" }}>
                  {dec?.role} manager
                </span>
              </div>
              <hr style={{ margin: "8px 0", borderTop: "1px solid #F4F7FE" }} />
              <button
                style={styles.profileButton}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsUpdateDivOpen(true);
                  setIsDropdownOpen(false);
                }}
              >
                Update Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Update Profile Div (Floating Card) */}
      <div style={styles.updateDiv}>
        <UpdateProfile user={dec} onClose={() => setIsUpdateDivOpen(false)} />
      </div>
    </header>
  );
}

export default Header;
