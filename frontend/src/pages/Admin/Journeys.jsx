import React, { useContext, useMemo, useState } from "react";
import { FaPlus, FaSearch, FaFileDownload, FaRoute } from "react-icons/fa";
import { MdModeEdit, MdDelete, MdLocationOn } from "react-icons/md";
import { AdminContext } from "../../contexts/AdminContext";
import AddJourney from "../Modals/AddJourney";
import EditJourney from "../Modals/EditJourney";

function Journeys() {
  const role = localStorage.getItem("role");
  const {
    journeys,
    handleDeleteJourney,
    isEditingJourney,
    setEditingJourney,
    handleEditJourney,
  } = useContext(AdminContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
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
      maxWidth: "400px",
      width: "100%",
    },
    searchInput: {
      borderRadius: "30px",
      paddingLeft: "45px",
      border: "none",
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
      height: "45px",
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
      fontSize: "0.85rem",
      color: isActive ? "#4318FF" : "#A3AED0",
      borderBottom: isActive ? "3px solid #4318FF" : "3px solid transparent",
      transition: "all 0.3s ease",
    }),
    statusBadge: (status) => {
      const config = {
        delivered: { bg: "#F0FFF4", text: "#05CD99" },
        inprogress: { bg: "#FFF8E6", text: "#FFB547" },
        shipping: { bg: "#F0F7FF", text: "#4318FF" },
        cancelled: { bg: "#FFF5F5", text: "#EE5D50" },
      };
      const style = config[status] || config.inprogress;
      return {
        backgroundColor: style.bg,
        color: style.text,
        padding: "5px 12px",
        borderRadius: "20px",
        fontSize: "0.75rem",
        fontWeight: "700",
        textTransform: "capitalize",
      };
    },
    routeText: {
      fontSize: "0.85rem",
      color: "#2B3674",
      fontWeight: "600",
    },
  };

  const filteredJourneys = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return journeys
      .filter((j) => {
        const driver = j.driver_info?.name?.toLowerCase() || "";
        const truck = j.truck_info?.truck_no?.toLowerCase() || "";
        const party = j.party_info?.name?.toLowerCase() || "";
        return (
          driver.includes(query) ||
          truck.includes(query) ||
          party.includes(query)
        );
      })
      .filter((j) => filter === "all" || j.status === filter);
  }, [journeys, searchQuery, filter]);

  return (
    <div style={styles.container}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={styles.headerText}>Journeys & Logistics</h2>
          <p className="text-muted small mb-0">
            Track real-time trip status and delivery routes
          </p>
        </div>
        {role === "admin" && (
          <button
            className="btn btn-primary px-4 d-flex align-items-center shadow-sm"
            style={{
              borderRadius: "12px",
              backgroundColor: "#4318FF",
              border: "none",
              height: "45px",
            }}
            data-bs-toggle="modal"
            data-bs-target="#journey-modal"
          >
            <FaPlus className="me-2" /> New Journey
          </button>
        )}
      </div>

      {/* Search & Tabs */}
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
        <div style={styles.searchWrapper}>
          <FaSearch
            style={{
              position: "absolute",
              left: "18px",
              top: "14px",
              color: "#A3AED0",
            }}
          />
          <input
            type="search"
            className="form-control"
            style={styles.searchInput}
            placeholder="Search driver, truck, or client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="d-flex align-items-center gap-2">
          {role === "admin" ? (
            <>
              {["all", "inprogress", "shipping", "delivered", "cancelled"].map(
                (type) => (
                  <div
                    key={type}
                    onClick={() => setFilter(type)}
                    style={styles.tab(filter === type)}
                  >
                    {type === "all"
                      ? "All Trips"
                      : type === "inprogress"
                        ? "Pending"
                        : type.charAt(0).toUpperCase() + type.slice(1)}
                  </div>
                ),
              )}
              <button
                className="btn btn-link text-muted text-decoration-none small ms-2"
                onClick={() =>
                  (window.location.href = `${API_BASE_URL}/api/journeys/download_csv/`)
                }
              >
                <FaFileDownload className="me-1" /> CSV
              </button>
            </>
          ) : (
            <h4 style={styles.headerText}>Active Routes</h4>
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
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                <th className="border-0 pb-3">Trip Details</th>
                <th className="border-0 pb-3">Driver & Truck</th>
                <th className="border-0 pb-3">Route (Origin → Destination)</th>
                <th className="border-0 pb-3 text-center">Load</th>
                <th className="border-0 pb-3 text-center">Status</th>
                <th className="border-0 pb-3 text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredJourneys.length > 0 ? (
                filteredJourneys.map((journey) => (
                  <tr
                    key={journey.id}
                    style={{ borderBottom: "1px solid #F4F7FE" }}
                  >
                    <td className="py-3">
                      <div className="fw-bold" style={{ color: "#2B3674" }}>
                        {journey.party_info?.name || "Private Trip"}
                      </div>
                      <div className="text-muted small">{journey.date}</div>
                    </td>
                    <td>
                      <div className="d-flex flex-column">
                        <span
                          style={{
                            color: "#2B3674",
                            fontWeight: "600",
                            fontSize: "0.9rem",
                          }}
                        >
                          {journey.driver_info?.name || "N/A"}
                        </span>
                        <span className="text-muted small">
                          {journey.truck_info?.truck_no || "No Truck"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div
                          className="text-center"
                          style={{ minWidth: "80px" }}
                        >
                          <div style={styles.routeText}>
                            {journey.startingpoint}
                          </div>
                        </div>
                        <div className="flex-grow-1 mx-2 text-muted d-flex align-items-center justify-content-center">
                          <div
                            style={{
                              height: "2px",
                              width: "30px",
                              backgroundColor: "#E0E5F2",
                            }}
                          ></div>
                          <FaRoute
                            className="mx-2"
                            size={14}
                            style={{ color: "#A3AED0" }}
                          />
                          <div
                            style={{
                              height: "2px",
                              width: "30px",
                              backgroundColor: "#E0E5F2",
                            }}
                          ></div>
                        </div>
                        <div
                          className="text-center"
                          style={{ minWidth: "80px" }}
                        >
                          <div style={styles.routeText}>
                            {journey.destination}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      className="text-center fw-bold"
                      style={{ color: "#2B3674", fontSize: "0.85rem" }}
                    >
                      {journey.weight}{" "}
                      <span className="text-muted fw-normal">KG</span>
                    </td>
                    <td className="text-center">
                      <span style={styles.statusBadge(journey.status)}>
                        {journey.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-light"
                          style={{
                            backgroundColor: "#F4F7FE",
                            color: "#4318FF",
                            borderRadius: "10px",
                            border: "none",
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#edit-journey-modal"
                          onClick={() => setEditingJourney(journey)}
                        >
                          <MdModeEdit size={18} />
                        </button>
                        <button
                          className="btn btn-light"
                          style={{
                            backgroundColor: "#F4F7FE",
                            color: "#EE5D50",
                            borderRadius: "10px",
                            border: "none",
                          }}
                          onClick={() => handleDeleteJourney(journey.id)}
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-5 text-muted">
                    No active journeys found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddJourney />
      <EditJourney
        journey={isEditingJourney}
        handleEditJourney={handleEditJourney}
      />
    </div>
  );
}

export default Journeys;
