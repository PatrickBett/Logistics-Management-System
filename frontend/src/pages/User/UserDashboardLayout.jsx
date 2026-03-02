import React, { useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../Admin/Header";
import {
  FaTruck,
  FaTachometerAlt,
  FaRoute,
  FaSignOutAlt,
} from "react-icons/fa";

function UserDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.clear(); // Clears access, refresh, role, etc.
      toast.success("Logged out successfully");
      navigate("/");
      // Force reload only if necessary to clear global state
      window.location.reload();
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // --- MODERN UI STYLES ---
  const styles = {
    layoutWrapper: {
      display: "flex",
      height: "100vh",
      width: "100vw",
      backgroundColor: "#F4F7FE", // Consistent background
      overflow: "hidden",
    },
    sidebar: {
      width: sidebarOpen ? "280px" : "0px",
      minWidth: sidebarOpen ? "280px" : "0px",
      backgroundColor: "#FFFFFF",
      transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      borderRight: "1px solid #E9EDF7",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      zIndex: 1050,
    },
    logoSection: {
      padding: "2.5rem 1.5rem",
      borderBottom: "1px solid #F4F7FE",
    },
    logoText: {
      color: "#2B3674",
      fontWeight: "800",
      fontSize: "1.5rem",
      letterSpacing: "-1px",
      margin: 0,
    },
    navLinks: {
      flexGrow: 1,
      padding: "1.5rem 1rem",
    },
    link: ({ isActive }) => ({
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      padding: "12px 20px",
      marginBottom: "10px",
      borderRadius: "15px",
      fontSize: "0.95rem",
      fontWeight: isActive ? "700" : "500",
      color: isActive ? "#4318FF" : "#A3AED0",
      backgroundColor: isActive ? "#F4F7FE" : "transparent",
      transition: "all 0.25s ease",
      position: "relative",
    }),
    activeIndicator: {
      position: "absolute",
      right: "0",
      height: "25px",
      width: "4px",
      backgroundColor: "#4318FF",
      borderRadius: "4px",
    },
    mainContent: {
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "hidden",
    },
    contentArea: {
      flexGrow: 1,
      padding: "1.5rem",
      overflowY: "auto",
    },
    logoutSection: {
      padding: "1.5rem",
      borderTop: "1px solid #F4F7FE",
    },
    logoutBtn: {
      width: "100%",
      padding: "12px",
      borderRadius: "12px",
      border: "none",
      backgroundColor: "#FFF5F5",
      color: "#EE5D50",
      fontWeight: "700",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s",
    },
  };

  const menuItems = [
    { path: "/user/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/user/trucks", label: "My Truck", icon: <FaTruck /> },
    { path: "/user/journeys", label: "My Journeys", icon: <FaRoute /> },
  ];

  return (
    <div style={styles.layoutWrapper}>
      {/* Sidebar */}
      <aside
        style={styles.sidebar}
        className={sidebarOpen ? "" : "d-none d-md-flex"}
      >
        <div style={styles.logoSection}>
          <h3 style={styles.logoText}>
            FLEET<span style={{ color: "#4318FF" }}>PRO</span>
          </h3>
          <small style={{ color: "#A3AED0", fontWeight: "600" }}>
            USER PANEL
          </small>
        </div>

        <nav style={styles.navLinks}>
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} style={styles.link}>
              {({ isActive }) => (
                <>
                  <span style={{ marginRight: "12px", fontSize: "1.2rem" }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {isActive && <div style={styles.activeIndicator} />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div style={styles.logoutSection}>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <div style={styles.contentArea}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default UserDashboardLayout;
