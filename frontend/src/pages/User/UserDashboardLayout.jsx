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

  const brandTeal = "#1a839a";
  const darkNavy = "#2B3674";

  const handleLogout = () => {
    try {
      localStorage.clear();
      toast.success("Logged out successfully");
      navigate("/");
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
      backgroundColor: "#F4F7FE",
      overflow: "hidden",
    },
    sidebar: {
      width: sidebarOpen ? "280px" : "0px",
      minWidth: sidebarOpen ? "280px" : "0px",
      backgroundColor: "#E9EEF6",
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
      color: darkNavy,
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
      color: isActive ? brandTeal : "#A3AED0",
      backgroundColor: isActive ? `${brandTeal}10` : "transparent", // 10% opacity teal
      transition: "all 0.25s ease",
      position: "relative",
    }),
    activeIndicator: {
      position: "absolute",
      left: "0",
      height: "25px",
      width: "4px",
      backgroundColor: brandTeal,
      borderRadius: "0 4px 4px 0",
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
            FLEET<span style={{ color: brandTeal }}>PRO</span>
          </h3>
          <small
            style={{
              color: "#A3AED0",
              fontWeight: "700",
              textTransform: "uppercase",
              fontSize: "0.65rem",
              letterSpacing: "1px",
            }}
          >
            Admin Portal
          </small>
        </div>

        <nav style={styles.navLinks}>
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} style={styles.link}>
              {({ isActive }) => (
                <>
                  {isActive && <div style={styles.activeIndicator} />}
                  <span style={{ marginRight: "12px", fontSize: "1.2rem" }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div style={styles.logoutSection}>
          <button
            style={styles.logoutBtn}
            onClick={handleLogout}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#ffebeb")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#FFF5F5")
            }
          >
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
