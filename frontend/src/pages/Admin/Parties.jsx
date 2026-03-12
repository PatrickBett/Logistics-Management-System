import React, { useMemo, useState, useContext } from "react";
import {
  FaPlus,
  FaSearch,
  FaFileDownload,
  FaUserShield,
  FaPhoneAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { MdModeEdit, MdDelete, MdBusinessCenter } from "react-icons/md";
import { AdminContext } from "../../contexts/AdminContext";
import AddPartyModal from "../Modals/AddPartyModal";
import EditParty from "../Modals/EditParty";

function Parties() {
  const {
    parties,
    handleDeleteParty,
    isEditingParty,
    setEditingParty,
    handleEditParty,
  } = useContext(AdminContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 6;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // --- CUSTOM STYLES ---
  const styles = {
    container: {
      // padding: "1.5rem",
      backgroundColor: "#f4f7fe",
      minHeight: "100vh",
    },
    headerText: { color: "#2B3674", fontWeight: "700", fontSize: "1.75rem" },
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
      padding: "10px 20px",
      color: isActive ? "#1a839a" : "#A3AED0",
      borderBottom: isActive ? "3px solid #1a839a" : "3px solid transparent",
      transition: "all 0.3s ease",
    }),
    statusBadge: (isActive) => ({
      backgroundColor: isActive ? "#F0FFF4" : "#FFF5F5",
      color: isActive ? "#05CD99" : "#EE5D50",
      padding: "4px 12px",
      borderRadius: "20px",
      fontSize: "0.75rem",
      fontWeight: "700",
    }),
    priceText: { color: "#2B3674", fontWeight: "700", fontSize: "0.95rem" },
    pageBtn: (isActive) => ({
      borderRadius: "8px",
      backgroundColor: isActive ? "#4318FF" : "#fff",
      color: isActive ? "#fff" : "#2B3674",
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
  const filteredParties = useMemo(() => {
    return parties
      .filter((p) => {
        const query = searchQuery.toLowerCase();
        return (
          p.name?.toLowerCase().includes(query) ||
          p.contact_person?.toLowerCase().includes(query)
        );
      })
      .filter((p) => {
        if (filter === "isactive") return p.status === "isActive";
        if (filter === "isnotactive") return p.status === "isNotActive";
        return true;
      });
  }, [searchQuery, parties, filter]);

  // --- PAGINATION CALCULATIONS ---
  const totalPages = Math.ceil(filteredParties.length / itemsPerPage);
  const currentParties = filteredParties.slice(
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
          <h2 style={styles.headerText}>Parties Management</h2>
          <p className="text-muted small mb-0">
            Manage client accounts, logistics weight, and billing
          </p>
        </div>
        <button
          className="btn btn-primary px-4 d-flex align-items-center shadow-sm"
          style={{
            borderRadius: "12px",
            backgroundColor: "#1a839a",
            border: "none",
            height: "45px",
          }}
          data-bs-toggle="modal"
          data-bs-target="#party-modal"
        >
          <FaPlus className="me-2" /> Add Party
        </button>
      </div>

      {/* Filter Bar */}
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
            type="text"
            className="form-control"
            style={styles.searchInput}
            placeholder="Search by client or contact..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to page 1 on search
            }}
          />
        </div>

        <div className="d-flex gap-2">
          {["all", "isactive", "isnotactive"].map((type) => (
            <div
              key={type}
              onClick={() => {
                setFilter(type);
                setCurrentPage(1); // Reset to page 1 on filter change
              }}
              style={styles.tab(filter === type)}
            >
              {type === "all"
                ? "All Clients"
                : type === "isactive"
                  ? "Active"
                  : "Inactive"}
            </div>
          ))}
          <button
            className="btn btn-link text-muted text-decoration-none small ms-3"
            style={{
              border: "1px solid #1a839a",
              color: "#1a839a",
              backgroundColor: "transparent",
            }}
            onClick={() =>
              (window.location.href = `${API_BASE_URL}/api/parties/download_csv/`)
            }
          >
            <FaFileDownload className="me-1" /> Export CSV
          </button>
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
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                <th className="border-0 pb-3">Client Information</th>
                <th className="border-0 pb-3">Logistics (Weight)</th>
                <th className="border-0 pb-3">Billing (KES)</th>
                <th className="border-0 pb-3 text-center">Status</th>
                <th className="border-0 pb-3 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentParties.length > 0 ? (
                currentParties.map((party) => (
                  <tr
                    key={party.id}
                    style={{ borderBottom: "1px solid #F4F7FE" }}
                  >
                    <td className="py-3">
                      <div className="d-flex align-items-center">
                        <div
                          className="p-2 rounded-3 me-3"
                          style={{
                            backgroundColor: "#F4F7FE",
                            color: "#1a839a",
                          }}
                        >
                          <MdBusinessCenter size={20} />
                        </div>
                        <div>
                          <div className="fw-bold" style={{ color: "#2B3674" }}>
                            {party.name}
                          </div>
                          <div className="text-muted small d-flex align-items-center">
                            <FaUserShield className="me-1" size={10} />{" "}
                            {party.contact_person}
                          </div>
                          <div className="text-muted small d-flex align-items-center">
                            <FaPhoneAlt className="me-1" size={10} />{" "}
                            {party.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div
                        className="small fw-bold"
                        style={{ color: "#2B3674" }}
                      >
                        {party.voltransported}{" "}
                        <span className="text-muted fw-normal">
                          / {party.total_vol} Kgs
                        </span>
                      </div>
                      <div
                        className="progress mt-1"
                        style={{
                          height: "6px",
                          width: "120px",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          className="progress-bar"
                          style={{
                            width: `${(party.voltransported / party.total_vol) * 100}%`,
                            backgroundColor: "#1a839a",
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div style={styles.priceText}>
                        {party.pricepaid.toLocaleString()}
                        <span className="text-muted fw-normal small">
                          {" "}
                          / {party.price.toLocaleString()}
                        </span>
                      </div>
                      <div
                        className="small"
                        style={{
                          color:
                            party.price - party.pricepaid > 0
                              ? "#EE5D50"
                              : "#05CD99",
                        }}
                      >
                        {party.price - party.pricepaid > 0
                          ? `Balance: ${(party.price - party.pricepaid).toLocaleString()}`
                          : "Fully Paid"}
                      </div>
                    </td>
                    <td className="text-center">
                      <span
                        style={styles.statusBadge(party.status === "isActive")}
                      >
                        {party.status === "isActive" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-light text-primary border-0"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "#F4F7FE",
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#edit-party-modal"
                          onClick={() => setEditingParty(party)}
                        >
                          <MdModeEdit size={18} />
                        </button>
                        <button
                          className="btn btn-light text-danger border-0"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "#F4F7FE",
                          }}
                          onClick={() => handleDeleteParty(party.id)}
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
                    No parties found matching the search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION CONTROLS --- */}
        {totalPages > 1 && (
          <div
            className="d-flex justify-content-between align-items-center mt-4 pt-3"
            style={{ borderTop: "1px solid #F4F7FE" }}
          >
            <div className="text-muted small fw-bold">
              Showing {currentParties.length} of {filteredParties.length}{" "}
              clients
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-light shadow-sm"
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
                className="btn btn-light shadow-sm"
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

      <AddPartyModal />
      <EditParty party={isEditingParty} handleEditParty={handleEditParty} />
    </div>
  );
}

export default Parties;
