import React, { useMemo, useContext, useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaFileCsv,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const role = localStorage.getItem("role");

  const brandTeal = "#1a839a";
  const darkNavy = "#2B3674";

  // --- DATE FORMATTER HELPER ---
  const formatDateTime = (dateStr) => {
    if (!dateStr) return <span className="text-muted opacity-50">Not Set</span>;
    const date = new Date(dateStr);
    return (
      <div style={{ fontSize: "0.85rem" }}>
        <div className="fw-bold" style={{ color: darkNavy }}>
          {date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <div className="text-muted small">
          {date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    );
  };

  // --- CUSTOM STYLES ---
  const styles = {
    container: {
      // padding: "1.5rem",
      backgroundColor: "#f4f7fe",
      minHeight: "100vh",
    },
    headerText: { color: darkNavy, fontWeight: "700", fontSize: "1.75rem" },
    searchWrapper: { position: "relative", maxWidth: "450px", width: "100%" },
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
      color: isActive ? brandTeal : "#A3AED0",
      borderBottom: isActive
        ? `3px solid ${brandTeal}`
        : "3px solid transparent",
      transition: "all 0.3s ease",
    }),
    statusBadge: (status) => {
      const isOnMaint = status === "onMaintenance" || status === "outOfService";
      return {
        backgroundColor: isOnMaint ? "#FFF8E6" : "#E6F6F4",
        color: isOnMaint ? "#FFB547" : "#05CD99",
        padding: "6px 14px",
        borderRadius: "12px",
        fontSize: "0.75rem",
        fontWeight: "700",
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
      color: type === "edit" ? brandTeal : "#EE5D50",
      transition: "all 0.2s",
    }),
    pageBtn: (isActive) => ({
      borderRadius: "8px",
      backgroundColor: isActive ? brandTeal : "#fff",
      color: isActive ? "#fff" : darkNavy,
      border: "none",
      width: "35px",
      height: "35px",
      fontWeight: "600",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
  };

  // --- FILTER & SEARCH LOGIC ---
  const filteredTrucks = useMemo(() => {
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
        if (filter === "assigned") return truck.driver_info?.name;
        if (filter === "unassigned") return !truck.driver_info?.name;
        return true;
      });
  }, [searchQuery, trucks, filter]);

  const totalPages = Math.ceil(filteredTrucks.length / itemsPerPage);
  const currentTrucks = filteredTrucks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={styles.headerText}>Fleet Inventory</h2>
          <p className="text-muted small mb-0">
            Monitor truck condition and driver assignments
          </p>
        </div>
        {role === "admin" && (
          <button
            className="btn text-white px-4 shadow-sm d-flex align-items-center"
            style={{
              borderRadius: "12px",
              backgroundColor: brandTeal,
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

      {/* Search & Tabs */}
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
        <div style={styles.searchWrapper}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="search"
            className="form-control"
            style={styles.searchInput}
            placeholder="Find plate number or driver..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="d-flex align-items-center gap-2">
          {role === "admin" ? (
            <>
              {["all", "assigned", "unassigned"].map((type) => (
                <div
                  key={type}
                  onClick={() => {
                    setFilter(type);
                    setCurrentPage(1);
                  }}
                  style={styles.tab(filter === type)}
                >
                  {type === "all"
                    ? "Total Fleet"
                    : type === "assigned"
                      ? "Assigned"
                      : "Available"}
                </div>
              ))}
              <button
                className="btn btn-link text-decoration-none text-muted small ms-3"
                onClick={() =>
                  (window.location.href = `${API_BASE_URL}api/trucks/download_csv/`)
                }
              >
                <FaFileCsv className="me-1" /> Export CSV
              </button>
            </>
          ) : (
            <span
              className="badge bg-white text-dark p-2 shadow-sm border-0"
              style={{ borderRadius: "10px" }}
            >
              <MdLocalShipping className="me-2" style={{ color: brandTeal }} />{" "}
              Unit Overview
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      <div style={styles.tableCard}>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr
                style={{
                  color: "#A3AED0",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                <th className="border-0 pb-3">Vehicle Details</th>
                <th className="border-0 pb-3">Assigned Operator</th>
                <th className="border-0 pb-3">Last Maintenance</th>
                <th className="border-0 pb-3">Next Service Due</th>
                <th className="border-0 pb-3 text-center">Condition</th>
                <th className="border-0 pb-3 text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTrucks.length > 0 ? (
                currentTrucks.map((truck) => (
                  <tr
                    key={truck.id}
                    style={{ borderBottom: "1px solid #F4F7FE" }}
                  >
                    <td className="py-3">
                      <div className="fw-bold" style={{ color: darkNavy }}>
                        {truck.truck_no}
                      </div>
                      <div className="text-muted small">{truck.type}</div>
                    </td>
                    <td>
                      {truck.driver_info ? (
                        <div className="d-flex align-items-center">
                          <div
                            className="rounded-circle me-2 d-flex align-items-center justify-content-center text-white fw-bold"
                            style={{
                              width: "32px",
                              height: "32px",
                              fontSize: "0.75rem",
                              backgroundColor: brandTeal,
                            }}
                          >
                            {truck.driver_info.name.charAt(0)}
                          </div>
                          <span
                            style={{
                              color: darkNavy,
                              fontWeight: "600",
                              fontSize: "0.9rem",
                            }}
                          >
                            {truck.driver_info.name}
                          </span>
                        </div>
                      ) : (
                        <span
                          className="badge bg-light text-muted fw-normal"
                          style={{ borderRadius: "6px" }}
                        >
                          Not Assigned
                        </span>
                      )}
                    </td>
                    <td>{formatDateTime(truck.last_maintenance)}</td>
                    <td>{formatDateTime(truck.next_due)}</td>
                    <td className="text-center">
                      <span style={styles.statusBadge(truck.status)}>
                        {truck.status === "onMaintenance"
                          ? "MAINTENANCE"
                          : truck.status === "isGood"
                            ? "OPERATIONAL"
                            : "OUT OF SERVICE"}
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
                  <td
                    colSpan={6}
                    className="text-center py-5 text-muted fw-bold"
                  >
                    No matching vehicles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className="d-flex justify-content-between align-items-center mt-4 pt-3"
            style={{ borderTop: "1px solid #F4F7FE" }}
          >
            <div className="text-muted small fw-bold">
              Showing {currentTrucks.length} of {filteredTrucks.length} assets
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-light"
                style={styles.pageBtn(false)}
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <FaChevronLeft size={12} />
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  style={styles.pageBtn(currentPage === idx + 1)}
                  onClick={() => handlePageChange(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                className="btn btn-light"
                style={styles.pageBtn(false)}
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          </div>
        )}
      </div>

      <AddTruck drivers={drivers} />
      <EditTruck truck={isEditingTruck} handleEditTruck={handleEditTruck} />
    </div>
  );
}

export default Trucks;
