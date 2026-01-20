import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

function Header({ onToggleSidebar, sidebarOpen }) {
  return (
    <div
      className="row text-light p-3 px-5 align-items-center"
      style={{ backgroundColor: "#1a839a" }}
    >
      <div className="col">
        <button className="btn btn-dark d-md-none" onClick={onToggleSidebar}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div className="col text-end" onClick={()=>alert("Profile")}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/250px-Outdoors-man-portrait_%28cropped%29.jpg"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />{" "}
        <IoMdArrowDropdown />
      </div>
    </div>
  );
}

export default Header;
