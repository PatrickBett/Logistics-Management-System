import React, { useEffect, useState } from "react";
import { FaBars, FaTimes, FaBell } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

function Header({ onToggleSidebar, sidebarOpen }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("access"); // Or wherever your JWT is stored
    const ws = new WebSocket(
      `ws://127.0.0.1:8000/ws/notifications/?token=${token}`,
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("New notification:", data);
      setNotifications((prev) => [data, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleBellClick = () => {
    setUnreadCount(0); // Mark as read when user clicks
    alert("You have " + notifications.length + " notifications");
  };

  return (
    <div
      className="row text-light p-3 px-5 align-items-center"
      style={{ borderBottom: "2px solid #e5e7eb" }}
    >
      <div className="col">
        <button className="btn btn-dark d-md-none" onClick={onToggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="col text-end" style={{ position: "relative" }}>
        <FaBell
          className="text-dark me-5"
          style={{ cursor: "pointer" }}
          onClick={handleBellClick}
        />
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "5px",
              right: "80px",
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {unreadCount}
          </span>
        )}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/250px-Outdoors-man-portrait_%28cropped%29.jpg"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          alt="profile"
        />{" "}
        <IoMdArrowDropdown style={{ color: "black" }} />
      </div>
    </div>
  );
}

export default Header;
