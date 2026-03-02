import React, { useMemo, useContext, useState } from "react";
import { FaPlus, FaSearch, FaFileCsv } from "react-icons/fa";
import { MdModeEdit, MdDelete, MdLocalShipping } from "react-icons/md";
import { AdminContext } from "../../contexts/AdminContext";
import AddTruck from "../Modals/AddTruck";
import EditTruck from "../Modals/EditTruck";

function Trucks() {
  const {
    drivers,
    handleDeleteTruck,
    trucks,
    isEditingTruck,
    setEditingTruck,
    handleEditTruck,
  } = useContext(AdminContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const role = localStorage.getItem("role");

  // --- CUSTOM STYLES ---
  const styles = {
    container: {
      padding: "1.5rem",
      backgroundColor: "#f4f7fe",
      minHeight: "100vh",
    },
    headerText: {
      color: "#2B3674",
      fontWeight: "700",
      fontSize: "1.75rem",
    },
    searchWrapper: {
      position: "relative",
      maxWidth: "450px",
      width: "100%",
    },
    searchInput: {
      borderRadius: "30px",
      paddingLeft: "45px",
      border: "none",
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
      height: "45px",
      fontSize: "0.9rem",
    },
    searchIcon: {
      position: "absolute",
      left: "18px",
      top: "14px",
      color: "#A3AED0",
    },
    tableCard: {
      backgroundColor: "#fff",
      borderRadius: "20px",
      padding: "1.5rem",
      boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.03)",
      border: "none",
    },
    tab: (isActive) => ({
      cursor: "pointer",
      fontWeight: "600",
      padding: "10px 15px",
      fontSize: "0.9rem",
      color: isActive ? "#4318FF" : "#A3AED0",
      borderBottom: isActive ? "3px solid #4318FF" : "3px solid transparent",
      transition: "all 0.3s ease",
    }),
    statusBadge: (status) => {
      const isOnMaint = status === "onMaintenance";
      return {
        backgroundColor: isOnMaint ? "#FFF8E6" : "#F0FFF4",
        color: isOnMaint ? "#FFB547" : "#05CD99",
        padding: "5px 12px",
        borderRadius: "20px",
        fontSize: "0.75rem",
        fontWeight: "700",
        display: "inline-block",
      };
    },
    actionBtn: (type) => ({
      width: "35px",
      height: "35px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      backgroundColor: "#F4F7FE",
      color: type === "edit" ? "#4318FF" : "#EE5D50",
      transition: "all 0.2s",
    }),
  };

  const filterTrucks = useMemo(() => {
    return trucks
      .filter((truck) => {
        const query = searchQuery.toLowerCase();
        return (
          truck.truck_no?.toLowerCase().includes(query) ||
          truck.type?.toLowerCase().includes(query) ||
          truck.driver_info?.name?.toLowerCase().includes(query)
        );
      })
      .filter((truck) => {
        if (filter === "assigned")
          return truck.driver_info && truck.driver_info.name;
        if (filter === "unassigned")
          return !truck.driver_info || !truck.driver_info.name;
        return true;
      });
  }, [searchQuery, trucks, filter]);

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={styles.headerText}>Trucks Inventory</h2>
          <p className="text-muted small mb-0">
            Manage fleet details and maintenance schedules
          </p>
        </div>
        {role === "admin" && (
          <button
            className="btn btn-primary px-4 shadow-sm d-flex align-items-center"
            style={{
              borderRadius: "12px",
              backgroundColor: "#4318FF",
              border: "none",
              height: "45px",
            }}
            data-bs-toggle="modal"
            data-bs-target="#truck-modal"
          >
            <FaPlus className="me-2" /> Add Truck
          </button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
        <div style={styles.searchWrapper}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="search"
            className="form-control"
            style={styles.searchInput}
            placeholder="Search by No, Type, or Driver..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="d-flex align-items-center gap-2">
          {role === "admin" ? (
            <>
              {["all", "assigned", "unassigned"].map((type) => (
                <div
                  key={type}
                  onClick={() => setFilter(type)}
                  style={styles.tab(filter === type)}
                >
                  {type === "all"
                    ? "All Fleet"
                    : type === "assigned"
                      ? "Assigned"
                      : "Unassigned"}
                </div>
              ))}
              <button
                className="btn btn-link text-decoration-none text-muted small ms-3"
                onClick={() =>
                  (window.location.href = `${API_BASE_URL}/api/trucks/download_csv/`)
                }
              >
                <FaFileCsv className="me-1" /> Export
              </button>
            </>
          ) : (
            <span
              className="badge bg-white text-dark p-2 shadow-sm"
              style={{ borderRadius: "10px" }}
            >
              <MdLocalShipping className="me-2 text-primary" /> My Assigned
              Truck
            </span>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div style={styles.tableCard}>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr
                style={{
                  color: "#A3AED0",
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                <th className="border-0 pb-3">Truck Details</th>
                <th className="border-0 pb-3">Current Driver</th>
                <th className="border-0 pb-3">Maintenance Log</th>
                <th className="border-0 pb-3 text-center">Status</th>
                <th className="border-0 pb-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterTrucks.length > 0 ? (
                filterTrucks.map((truck) => (
                  <tr
                    key={truck.id}
                    style={{ borderBottom: "1px solid #F4F7FE" }}
                  >
                    <td className="py-3">
                      <div className="fw-bold" style={{ color: "#2B3674" }}>
                        {truck.truck_no}
                      </div>
                      <div className="text-muted small">{truck.type}</div>
                    </td>
                    <td>
                      {truck.driver_info ? (
                        <div className="d-flex align-items-center">
                          <div
                            className="bg-light rounded-circle me-2 d-flex align-items-center justify-content-center"
                            style={{
                              width: "30px",
                              height: "30px",
                              fontSize: "0.8rem",
                            }}
                          >
                            {truck.driver_info.name.charAt(0)}
                          </div>
                          <span style={{ color: "#2B3674", fontWeight: "600" }}>
                            {truck.driver_info.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted italic small">Vacant</span>
                      )}
                    </td>
                    <td>
                      <div className="small">
                        <span className="text-muted">Last:</span>{" "}
                        {truck.last_maintenance || "N/A"}
                      </div>
                      <div className="small">
                        <span className="text-muted">Next:</span>{" "}
                        <span className="text-primary fw-medium">
                          {truck.next_due || "Not set"}
                        </span>
                      </div>
                    </td>
                    <td className="text-center">
                      <span style={styles.statusBadge(truck.status)}>
                        {truck.status === "onMaintenance"
                          ? "In Service"
                          : "Operational"}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          style={styles.actionBtn("edit")}
                          data-bs-toggle="modal"
                          data-bs-target="#edit-truck-modal"
                          onClick={() => setEditingTruck(truck)}
                        >
                          <MdModeEdit size={18} />
                        </button>
                        {role === "admin" && (
                          <button
                            style={styles.actionBtn("delete")}
                            onClick={() => handleDeleteTruck(truck.id)}
                          >
                            <MdDelete size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-5 text-muted">
                    No trucks found in the inventory.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddTruck drivers={drivers} />
      <EditTruck truck={isEditingTruck} handleEditTruck={handleEditTruck} />
    </div>
  );
}

export default Trucks;
