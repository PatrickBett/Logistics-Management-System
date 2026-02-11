import React, { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import AddTruck from "../Modals/AddTruck";
import EditTruck from "../Modals/EditTruck";
import { useContext, useState, useEffect } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import api from "../../api";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";

function Trucks() {
  const {
    drivers,
    isLoading,
    setIsLoading,
    fetchTrucks,
    handleDeleteTruck,
    trucks,
    setTrucks,
    isEditingTruck,
    setEditingTruck,
    handleEditTruck,
  } = useContext(AdminContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); // all, assigned, not assigned
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const role = localStorage.getItem("role");

  const filterTrucks = useMemo(() => {
    return trucks
      .filter(
        (truck) =>
          truck.truck_no?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          truck.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          truck.driver_info?.name
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      )
      .filter((truck) => {
        if (filter == "assigned") {
          return truck.driver_info && truck.driver_info.name;
        } else if (filter == "unassigned") {
          return !truck.driver_info || !truck.driver_info.name;
        }
        return true;
      });
  }, [searchQuery, trucks,filter]);
  return (
    <>
      <div>
        <div className="row p-2 align-items-center">
          <div className="col">
            <h2>Trucks Management</h2>
          </div>
          {role === "admin" ? (
            <div className="col text-end">
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#truck-modal"
              >
                <FaPlus className="me-2" />
                Truck
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="p-2 mb-3 input-group">
          <span className="input-group-text">🔍</span>
          <input
            type="search"
            className="form-control"
            placeholder="Search by Truck Type, Driver, Truck No..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Filter Navbar */}
        <div
          style={{
            display: "flex",

            gap: "30px",
            marginBottom: "25px",
            borderBottom: "2px solid #e0e0e0", // bottom line for navbar
            paddingBottom: "10px",
          }}
        >{role === "admin" ? (
          <>
            {["all", "assigned", "unassigned"].map((type) => (
              <div
                key={type}
                onClick={() => setFilter(type)}
                style={{
                  cursor: "pointer",
                  fontWeight: "600",
                  paddingBottom: "5px",
                  color: filter === type ? "#1a839a" : "#555",
                  borderBottom:
                    filter === type
                      ? "3px solid #1a839a"
                      : "3px solid transparent",
                  transition: "0.3s",
                }}
              >
                {type === "all"
                  ? "All"
                  : type === "assigned"
                    ? "Driver assigned"
                    : "Driver Unassigned"}
              </div>
            ))}
            <div className="col text-end">
              <button
                className="btn btn-outline-primary"
                onClick={() =>
                  (window.location.href = `${API_BASE_URL}/api/trucks/download_csv/`)
                }
              >
                Download CSV
              </button>
            </div>
          </>
        ) : (
          <h4>My Truck</h4>
        )}
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>id</th>
                <th>Truck No</th>
                <th>Type</th>
                <th>Driver</th>
                <th>Last Maintenance</th>
                <th>Next Maintenance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterTrucks.length > 0 ? (
                filterTrucks.map((truck, index) => (
                  <tr key={truck.id}>
                    <td>{index + 1}</td>
                    <td>{truck.truck_no}</td>
                    <td>{truck.type}</td>
                    <td>
                      {truck.driver_info
                        ? truck.driver_info.name
                        : "No Driver Assigned"}
                    </td>
                    <td>
                      {truck.last_maintenance
                        ? truck.last_maintenance
                        : "Not yet Maintained"}
                    </td>
                    <td>{truck.next_due ? truck.next_due : "Not scheduled"}</td>
                    <td className="text-center">
                      {truck.status == "onMaintenance"
                        ? "On Maintenance"
                        : "Good Condition"}
                    </td>
                    <td className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-truck-modal"
                        onClick={() => {
                          setEditingTruck(truck);
                          console.log("Editing", truck);
                        }}
                      >
                        <MdModeEdit />
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDeleteTruck(truck.id);
                        }}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center" colSpan={8}>
                    No Trucks available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AddTruck drivers={drivers} />
      <EditTruck truck={isEditingTruck} handleEditTruck={handleEditTruck} />
    </>
  );
}

export default Trucks;
