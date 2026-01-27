import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";

function UserDashboard() {
  const { drivers } = useContext(AdminContext);
  return (
    <div>
      <h2>This is User Dashboard</h2>
    </div>
  );
}

export default UserDashboard;
