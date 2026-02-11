import React from "react";
import { FaBars, FaTimes, FaBell } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

function Header({ onToggleSidebar, sidebarOpen }) {
  return (
    <div
      className="row text-light p-3 px-5 align-items-center"
      style={{ borderBottom: "2px solid #e5e7eb" }}
      // style={{ backgroundColor: "#1a839a" }}
    >
      <div className="col">
        <button className="btn btn-dark d-md-none" onClick={onToggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="col text-end" onClick={() => alert("Profile")}>
        <FaBell className="text-dark me-5" />
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/250px-Outdoors-man-portrait_%28cropped%29.jpg"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />{" "}
        <IoMdArrowDropdown style={{ color: "black" }} />
      </div>
    </div>
  );
}

export default Header;
