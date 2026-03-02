import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes, FaBell, FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { AdminContext } from "../../contexts/AdminContext";

function Header({ onToggleSidebar, sidebarOpen }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const { trucks, drivers } = useContext(AdminContext);

  const myTruck = trucks.find(
    (t) => t.driver_info?.id?.toString() === drivers[0]?.id?.toString(),
  );

  const username = myTruck?.driver_info?.name || "Driver";

  // --- CUSTOM STYLES ---
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
      transition: "color 0.2s",
    },
    badge: {
      position: "absolute",
      top: "-4px",
      right: "-4px",
      backgroundColor: "#EE5D50", // Matching your dashboard's "danger" red
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
      padding: "4px 8px",
      borderRadius: "30px",
      cursor: "pointer",
      transition: "background 0.2s",
    },
    avatar: {
      width: "40px",
      height: "40px",
      borderRadius: "12px", // Modern "Squircle" look
      objectFit: "cover",
      border: "2px solid #4318FF",
    },
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    const ws = new WebSocket(
      `ws://127.0.0.1:8000/ws/notifications/?token=${token}`,
    );

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prev) => [data, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    return () => ws.close();
  }, []);

  return (
    <header style={styles.header}>
      {/* Left: Mobile Toggle */}
      <div className="d-flex align-items-center">
        <button
          className="btn border-0 d-md-none me-3"
          onClick={onToggleSidebar}
          style={{ color: "#2B3674" }}
        >
          {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
        <span className="d-none d-md-block fw-medium text-muted small">
          Pages / Dashboard
        </span>
      </div>

      {/* Right: Actions & Profile */}
      <div className="d-flex align-items-center gap-4">
        {/* Notification Bell */}
        <div
          className="position-relative"
          style={{ cursor: "pointer" }}
          onClick={() => setUnreadCount(0)}
        >
          <FaBell style={styles.actionIcon} />
          {unreadCount > 0 && <span style={styles.badge}>{unreadCount}</span>}
        </div>

        {/* User Profile */}
        <div style={styles.profileSection} className="header-profile-hover">
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
                lineHeight: "1",
              }}
            >
              {username || "Alex Johnson"}
            </div>
            <span style={{ color: "#A3AED0", fontSize: "0.75rem" }}>
              Admin Manager
            </span>
          </div>
          <IoMdArrowDropdown style={{ color: "#A3AED0" }} />
        </div>
      </div>
    </header>
  );
}

export default Header;
