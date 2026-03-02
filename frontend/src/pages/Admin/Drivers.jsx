import React, { useContext, useMemo, useState } from "react";
import { FaPlus, FaSearch, FaDownload } from "react-icons/fa";
import { MdModeEdit, MdDelete } from "react-icons/md";
import AddDriver from "../Modals/AddDriver";
import EditDriver from "../Modals/EditDriver";
import { AdminContext } from "../../contexts/AdminContext";

function Drivers() {
  const {
    drivers,
    isEditingDriver,
    setEditingDriver,
    handleEdit,
    handleAddDriver,
    handleDelete,
  } = useContext(AdminContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
      flex: "1",
      maxWidth: "400px",
    },
    searchInput: {
      borderRadius: "30px",
      paddingLeft: "40px",
      border: "none",
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
      height: "45px",
    },
    searchIcon: {
      position: "absolute",
      left: "15px",
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
      padding: "10px 20px",
      color: isActive ? "#4318FF" : "#A3AED0",
      borderBottom: isActive ? "3px solid #4318FF" : "3px solid transparent",
      transition: "all 0.3s ease",
    }),
    statusBadge: (status) => {
      const colors = {
        onLeave: { bg: "#FFF5F5", text: "#EE5D50" },
        onDuty: { bg: "#F0F7FF", text: "#4318FF" },
        available: { bg: "#F0FFF4", text: "#05CD99" },
      };
      const style = colors[status] || colors.available;
      return {
        backgroundColor: style.bg,
        color: style.text,
        padding: "5px 12px",
        borderRadius: "20px",
        fontSize: "0.85rem",
        fontWeight: "700",
      };
    },
    actionBtn: {
      width: "35px",
      height: "35px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      transition: "transform 0.2s",
    },
  };

  const filteredDrivers = useMemo(() => {
    return drivers
      .filter((driver) => {
        const query = searchQuery.toLowerCase();
        return (
          driver.license_no?.toLowerCase().includes(query) ||
          driver.name?.toLowerCase().includes(query)
        );
      })
      .filter((driver) => {
        if (filter === "onLeave") return driver.status === "onLeave";
        if (filter === "available") return driver.status === "isAvailable";
        if (filter === "onduty") return driver.status === "onDuty";
        return true;
      });
  }, [searchQuery, drivers, filter]);

  const driversPerPage = 6;
  const totalPages = Math.ceil(filteredDrivers.length / driversPerPage);
  const currentDrivers = filteredDrivers.slice(
    (currentPage - 1) * driversPerPage,
    currentPage * driversPerPage,
  );

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={styles.headerText}>Drivers Management</h2>
        <button
          className="btn btn-primary px-4 shadow-sm"
          style={{
            borderRadius: "12px",
            backgroundColor: "#4318FF",
            border: "none",
          }}
          data-bs-toggle="modal"
          data-bs-target="#driver-modal"
        >
          <FaPlus className="me-2" /> Add New Driver
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
        <div style={styles.searchWrapper}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            className="form-control"
            style={styles.searchInput}
            placeholder="Search license or name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="d-flex gap-2">
          {["all", "onLeave", "available", "onduty"].map((type) => (
            <div
              key={type}
              onClick={() => setFilter(type)}
              style={styles.tab(filter === type)}
            >
              {type.charAt(0).toUpperCase() +
                type.slice(1).replace("onduty", "On Duty")}
            </div>
          ))}
        </div>

        <button
          className="btn btn-outline-secondary"
          style={{ borderRadius: "12px", fontSize: "0.9rem" }}
          onClick={() =>
            (window.location.href = `${API_BASE_URL}/api/drivers/download_csv/`)
          }
        >
          <FaDownload className="me-2" /> Export CSV
        </button>
      </div>

      {/* Table Section */}
      <div style={styles.tableCard}>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr
                style={{
                  color: "#A3AED0",
                  fontSize: "0.85rem",
                  borderBottom: "1px solid #F4F7FE",
                }}
              >
                <th className="pb-3">NAME & DETAILS</th>
                <th className="pb-3">CONTACT</th>
                <th className="pb-3 text-center">TRIPS (INC/COM)</th>
                <th className="pb-3 text-center">STATUS</th>
                <th className="pb-3 text-end">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentDrivers.length > 0 ? (
                currentDrivers.map((driver) => (
                  <tr
                    key={driver.id}
                    style={{ borderBottom: "1px solid #F4F7FE" }}
                  >
                    <td className="py-3">
                      <div className="fw-bold" style={{ color: "#2B3674" }}>
                        {driver.name}
                      </div>
                      <div className="text-muted small">
                        {driver.license_no}
                      </div>
                    </td>
                    <td>
                      <div style={{ color: "#2B3674", fontSize: "0.9rem" }}>
                        {driver.phone}
                      </div>
                      <div className="text-muted small">{driver.email}</div>
                    </td>
                    <td className="text-center">
                      <span className="text-danger fw-bold">
                        {driver.incomplete_trips}
                      </span>
                      <span className="text-muted mx-1">/</span>
                      <span className="text-success fw-bold">
                        {driver.complete_trips}
                      </span>
                    </td>
                    <td className="text-center">
                      <span style={styles.statusBadge(driver.status)}>
                        {driver.status === "onLeave"
                          ? "On Leave"
                          : driver.status === "onDuty"
                            ? "On Duty"
                            : "Available"}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-light text-primary"
                          style={styles.actionBtn}
                          data-bs-toggle="modal"
                          data-bs-target="#edit-driver-modal"
                          onClick={() => setEditingDriver(driver)}
                        >
                          <MdModeEdit size={18} />
                        </button>
                        <button
                          className="btn btn-light text-danger"
                          style={styles.actionBtn}
                          onClick={() => handleDelete(driver.id)}
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-5 text-muted">
                    No drivers found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Improved Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center mt-4">
            <div className="text-muted small">
              Showing {currentDrivers.length} of {filteredDrivers.length}{" "}
              drivers
            </div>
            <nav>
              <ul className="pagination mb-0 gap-1">
                {[...Array(totalPages)].map((_, idx) => (
                  <li
                    key={idx}
                    className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link border-0 shadow-sm"
                      style={{
                        borderRadius: "8px",
                        backgroundColor:
                          currentPage === idx + 1 ? "#4318FF" : "#fff",
                        color: currentPage === idx + 1 ? "#fff" : "#2B3674",
                      }}
                      onClick={() => {
                        setCurrentPage(idx + 1);
                        window.scrollTo(0, 0);
                      }}
                    >
                      {idx + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>

      <AddDriver handleAddDriver={handleAddDriver} />
      <EditDriver handleEdit={handleEdit} driver={isEditingDriver} />
    </div>
  );
}

export default Drivers;
