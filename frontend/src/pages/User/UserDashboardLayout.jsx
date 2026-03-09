import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../Admin/Header";
import {
  FaTruck,
  FaTachometerAlt,
  FaRoute,
  FaSignOutAlt,
} from "react-icons/fa";

function UserDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const navigate = useNavigate();
  const location = useLocation();

  const brandTeal = "#1a839a";
  const darkNavy = "#2B3674";

  // Auto-close sidebar on mobile after route change
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/");
    // Reloading isn't always necessary with navigate, but keeps state clean
    window.location.reload();
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
      width: sidebarOpen ? "280px" : "0px",
      minWidth: sidebarOpen ? "280px" : "0px",
      backgroundColor: "#FFFFFF", // White sidebar looks cleaner against the blue background
      transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      borderRight: "1px solid #E9EDF7",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      zIndex: 1050,
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
      backgroundColor: isActive ? `${brandTeal}10` : "transparent",
      transition: "all 0.25s ease",
      position: "relative",
    }),
  };

  const menuItems = [
    { path: "/user/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/user/trucks", label: "My Truck", icon: <FaTruck /> },
    { path: "/user/journeys", label: "My Journeys", icon: <FaRoute /> },
  ];

  return (
    <div style={styles.layoutWrapper}>
      <style>
        {`
          .user-nav-hover:hover {
            color: ${brandTeal} !important;
            background-color: ${brandTeal}05 !important;
          }
          @media (max-width: 768px) {
            .sidebar-mobile-overlay {
              position: fixed !important;
              height: 100% !important;
              box-shadow: ${sidebarOpen ? "15px 0 40px rgba(0,0,0,0.1)" : "none"};
            }
          }
        `}
      </style>

      {/* Sidebar */}
      <aside style={styles.sidebar} className="sidebar-mobile-overlay">
        <div style={{ padding: "2.5rem 1.5rem", textAlign: "center" }}>
          <h3
            style={{
              color: darkNavy,
              fontWeight: "800",
              fontSize: "1.5rem",
              margin: 0,
            }}
          >
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
            Driver Console
          </small>
        </div>

        <nav style={{ flexGrow: 1, padding: "1.5rem 1rem" }}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={styles.link}
              className="user-nav-hover"
            >
              {({ isActive }) => (
                <>
                  <span style={{ marginRight: "12px", fontSize: "1.2rem" }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        right: "0",
                        height: "25px",
                        width: "4px",
                        backgroundColor: brandTeal,
                        borderRadius: "4px 0 0 4px",
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: "1.5rem", borderTop: "1px solid #F4F7FE" }}>
          <button
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
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#ffebeb")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#FFF5F5")
            }
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
          {/* Page Context Heading */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h2
              style={{ color: darkNavy, fontWeight: "700", fontSize: "1.6rem" }}
            >
              {menuItems.find((i) => i.path === location.pathname)?.label ||
                "Welcome Back"}
            </h2>
          </div>

          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default UserDashboardLayout;
