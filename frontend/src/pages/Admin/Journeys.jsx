import React, { useContext, useMemo, useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaRoute,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { MdModeEdit, MdDelete } from "react-icons/md";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // --- BRAND COLORS ---
  const brandTeal = "#1a839a";
  const darkNavy = "#2B3674";

  // --- DATE FORMATTER (DATE ONLY) ---
  const formatDateOnly = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const styles = {
    container: {
      // padding: "1.5rem",
      backgroundColor: "#f4f7fe",
      minHeight: "100vh",
    },
    headerText: { color: darkNavy, fontWeight: "700", fontSize: "1.75rem" },
    searchWrapper: { position: "relative", maxWidth: "400px", width: "100%" },
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
      color: isActive ? brandTeal : "#A3AED0",
      borderBottom: isActive
        ? `3px solid ${brandTeal}`
        : "3px solid transparent",
      transition: "all 0.3s ease",
    }),
    statusBadge: (status) => {
      const config = {
        delivered: { bg: "#E6F6F4", text: "#05CD99" },
        inprogress: { bg: "#FFF8E6", text: "#FFB547" },
        shipping: { bg: "#F0F7FF", text: brandTeal },
        cancelled: { bg: "#FFF5F5", text: "#EE5D50" },
      };
      const style = config[status] || config.inprogress;
      return {
        backgroundColor: style.bg,
        color: style.text,
        padding: "5px 12px",
        borderRadius: "20px",
        fontSize: "0.72rem",
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
      };
    },
    pageButton: (isActive) => ({
      width: "35px",
      height: "35px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "10px",
      margin: "0 4px",
      border: "none",
      backgroundColor: isActive ? brandTeal : "transparent",
      color: isActive ? "#fff" : "#A3AED0",
      fontWeight: "600",
      transition: "0.2s",
    }),
  };

  // --- FILTER & SEARCH LOGIC ---
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

  // --- PAGINATION ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredJourneys.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredJourneys.length / itemsPerPage);

  return (
    <div style={styles.container}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={styles.headerText}>Logistics Tracker</h2>
          <p className="text-muted small mb-0">
            Monitor active routes and trip history
          </p>
        </div>
        {role === "admin" && (
          <button
            className="btn text-white px-4 d-flex align-items-center shadow-sm"
            style={{
              borderRadius: "12px",
              backgroundColor: brandTeal,
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
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div
          className="d-flex align-items-center gap-1"
          style={{ overflowX: "auto", whiteSpace: "nowrap" }}
        >
          {["all", "inprogress", "shipping", "delivered", "cancelled"].map(
            (type) => (
              <div
                key={type}
                onClick={() => {
                  setFilter(type);
                  setCurrentPage(1);
                }}
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
        </div>
      </div>

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
                <th className="border-0 pb-3">Client & Date</th>
                <th className="border-0 pb-3">Operator / Asset</th>
                <th className="border-0 pb-3">Route Path</th>
                <th className="border-0 pb-3 text-center">Current Status</th>
                <th className="border-0 pb-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((journey) => (
                  <tr
                    key={journey.id}
                    style={{ borderBottom: "1px solid #F4F7FE" }}
                  >
                    <td className="py-3">
                      <div className="fw-bold" style={{ color: darkNavy }}>
                        {journey.party_info?.name || "Private Trip"}
                      </div>
                      <div className="text-muted small fw-medium">
                        {formatDateOnly(journey.date)}
                      </div>
                    </td>
                    <td>
                      <div
                        className="fw-bold"
                        style={{ color: darkNavy, fontSize: "0.9rem" }}
                      >
                        {journey.driver_info?.name || "N/A"}
                      </div>
                      <div className="text-muted small">
                        {journey.truck_info?.truck_no || "No Truck"}
                      </div>
                    </td>
                    <td>
                      <div
                        className="d-flex align-items-center small fw-bold"
                        style={{ color: darkNavy }}
                      >
                        {journey.startingpoint}
                        <FaRoute
                          className="mx-2"
                          style={{ color: brandTeal, opacity: 0.6 }}
                        />
                        {journey.destination}
                      </div>
                    </td>
                    <td className="text-center">
                      <span style={styles.statusBadge(journey.status)}>
                        {journey.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <button
                        className="btn btn-sm me-1"
                        style={{ color: brandTeal }}
                        onClick={() => setEditingJourney(journey)}
                        data-bs-toggle="modal"
                        data-bs-target="#edit-journey-modal"
                      >
                        <MdModeEdit size={20} />
                      </button>
                      <button
                        className="btn btn-sm"
                        style={{ color: "#EE5D50" }}
                        onClick={() => handleDeleteJourney(journey.id)}
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-5 text-muted fw-bold"
                  >
                    No journey logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="d-flex justify-content-between align-items-center mt-4">
            <div className="text-muted small fw-bold">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredJourneys.length)} of{" "}
              {filteredJourneys.length}
            </div>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                <FaChevronLeft style={{ color: "#A3AED0" }} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  style={styles.pageButton(currentPage === i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="btn btn-sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                <FaChevronRight style={{ color: "#A3AED0" }} />
              </button>
            </div>
          </div>
        )}
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
