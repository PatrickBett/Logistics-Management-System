import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "./Header";
import {
  FaTruck,
  FaUser,
  FaTachometerAlt,
  FaChartBar,
  FaRoute,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

function AdminDashboard() {
  // Collapse sidebar by default on mobile, open on desktop
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const navigate = useNavigate();
  const location = useLocation();

  // Close sidebar automatically on mobile after navigation
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const styles = {
    layoutWrapper: {
      display: "flex",
      height: "100vh",
      width: "100vw",
      backgroundColor: "#F4F7FE",
      overflow: "hidden",
    },
    sidebar: {
      width: sidebarOpen ? "285px" : "0px",
      minWidth: sidebarOpen ? "285px" : "0px",
      backgroundColor: "#FFFFFF", // Clean white looks better with the soft blue bg
      transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      borderRight: "1px solid #E9EDF7",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      zIndex: 1050,
    },
    logoSection: {
      padding: "2.5rem 1.5rem",
      textAlign: "center",
    },
    link: ({ isActive }) => ({
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      padding: "12px 20px",
      marginBottom: "8px",
      borderRadius: "15px",
      fontSize: "0.95rem",
      fontWeight: isActive ? "700" : "500",
      color: isActive ? "#1a839a" : "#A3AED0",
      backgroundColor: isActive ? "#F4F7FE" : "transparent",
      transition: "all 0.2s ease",
      position: "relative",
    }),
    activeIndicator: {
      position: "absolute",
      right: "0",
      height: "25px",
      width: "4px",
      backgroundColor: "#1a839a",
      borderRadius: "4px",
    },
  };

  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/admin/drivers", label: "Drivers", icon: <FaUser /> },
    { path: "/admin/trucks", label: "Trucks", icon: <FaTruck /> },
    { path: "/admin/parties", label: "Parties", icon: <FaUsers /> },
    { path: "/admin/journeys", label: "Journeys", icon: <FaRoute /> },
    { path: "/admin/report", label: "Reports", icon: <FaChartBar /> },
  ];

  return (
    <div style={styles.layoutWrapper}>
      <style>
        {`
          .nav-link-hover:hover {
            color: #1a839a !important;
            background-color: #F4F7FE !important;
          }
          .logout-btn:hover {
            background-color: #fee2e2 !important;
            transform: translateY(-1px);
          }
          @media (max-width: 768px) {
            .sidebar-overlay {
              position: fixed !important;
              height: 100% !important;
              box-shadow: ${sidebarOpen ? "20px 0 50px rgba(0,0,0,0.1)" : "none"};
            }
          }
        `}
      </style>

      {/* Sidebar */}
      <aside style={styles.sidebar} className="sidebar-overlay">
        <div style={styles.logoSection}>
          <h3
            style={{
              color: "#2B3674",
              fontWeight: "800",
              fontSize: "1.6rem",
              margin: 0,
            }}
          >
            FLEET<span style={{ color: "#1a839a" }}>PRO</span>
          </h3>
          <small
            style={{
              color: "#A3AED0",
              fontWeight: "700",
              textTransform: "uppercase",
              fontSize: "0.7rem",
              letterSpacing: "1px",
            }}
          >
            Admin Console
          </small>
        </div>

        <nav style={{ flexGrow: 1, padding: "1rem" }}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={styles.link}
              className="nav-link-hover"
            >
              {({ isActive }) => (
                <>
                  <span style={{ marginRight: "15px", fontSize: "1.2rem" }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {isActive && <div style={styles.activeIndicator} />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: "1.5rem", borderTop: "1px solid #F4F7FE" }}>
          <button
            className="logout-btn"
            style={{
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
              transition: "0.2s",
            }}
            onClick={handleLogout}
          >
            <FaSignOutAlt style={{ marginRight: "8px" }} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Header onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

        <div style={{ flexGrow: 1, padding: "1.5rem", overflowY: "auto" }}>
          {/* Internal Page Title (Optional) */}
          {/* <div style={{ marginBottom: "1.5rem" }}>
            <h2
              style={{
                color: "#2B3674",
                fontWeight: "700",
                fontSize: "1.8rem",
              }}
            >
              {menuItems.find((i) => i.path === location.pathname)?.label ||
                "Dashboard"}
            </h2>
          </div> */}

          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
