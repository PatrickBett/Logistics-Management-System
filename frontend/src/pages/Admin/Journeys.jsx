import React, { useContext, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { AdminContext } from "../../contexts/AdminContext";
import AddJourney from "../Modals/AddJourney";
import EditJourney from "../Modals/EditJourney";

function Journeys() {
  const role = localStorage.getItem("role");

  const {
    journeys,
    trucks,
    handleDeleteJourney,
    isEditingJourney,
    setEditingJourney,
    handleEditJourney,
  } = useContext(AdminContext);

  const [searchQuery, setSearchQuery] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [filter, setFilter] = useState("all"); // all, cancelled, inprogress, shipping, delivered
  console.log("Trucks in Journeys Component:", trucks);

  // 🔍 SEARCH LOGIC (SAFE + OPTIMIZED)
  const filteredJourneys = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return journeys
      .filter((journey) => {
        const driver = journey.driver_info?.name?.toLowerCase() || "";
        const truck = journey.truck_info?.truck_no?.toLowerCase() || "";
        const party = journey.party_info?.name?.toLowerCase() || "";

        return (
          driver.includes(query) ||
          truck.includes(query) ||
          party.includes(query)
        );
      })
      .filter((journey) => {
        if (filter === "cancelled") {
          return journey.status === "cancelled";
        } else if (filter === "inprogress") {
          return journey.status === "inprogress";
        } else if (filter === "shipping") {
          return journey.status === "shipping";
        } else if (filter === "delivered") {
          return journey.status === "delivered";
        }
        return true;
      });
  }, [journeys, searchQuery, filter]);
  console.log("Filtered Journeys:", filteredJourneys);

  return (
    <>
      <div>
        {/* HEADER */}
        <div className="row p-2 align-items-center">
          <div className="col">
            <h2>Journeys Management</h2>
          </div>

          {role === "admin" && (
            <div className="col text-end">
              <button
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#journey-modal"
              >
                <FaPlus className="me-2" />
                Journey
              </button>
            </div>
          )}
        </div>

        {/* SEARCH INPUT */}
        <div className="p-2 mb-3 input-group">
          <span className="input-group-text">🔍</span>
          <input
            type="search"
            className="form-control"
            placeholder="Search by driver, truck, or party..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Navbar */}
        <div
          style={{
            display: "flex",

            gap: "20px",
            marginBottom: "25px",
            borderBottom: "2px solid #e0e0e0", // bottom line for navbar
            paddingBottom: "10px",
          }}
        >
          {role === "admin" ? (<>
           { ["all", "cancelled", "inprogress", "shipping", "delivered"].map(
              (type) => (
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
                    : type === "cancelled"
                      ? "Cancelled"
                      : type === "inprogress"
                        ? "In Progress"
                        : type === "shipping"
                          ? "Shipping"
                          : "Delivered"}
                </div>
              )
            )}
            <div className="col text-end">
              <button
                className="btn btn-outline-primary"
                onClick={() =>
                  (window.location.href = `${API_BASE_URL}/api/journeys/download_csv/`)
                }
              >
                Download CSV
              </button>
            </div>
          </>) : (
            <h4>My Journeys</h4>
          )}
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Driver</th>
                <th>Truck</th>
                <th>Party</th>
                <th>Starting Point</th>
                <th>Destination</th>
                <th>Transported Weight</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredJourneys.length > 0 ? (
                filteredJourneys.map((journey, index) => (
                  <tr key={journey.id}>
                    <td>{index + 1}</td>
                    <td>{journey.date}</td>
                    <td>{journey.driver_info?.name || "-"}</td>
                    <td>{journey.truck_info?.truck_no || "-"}</td>
                    <td>{journey.party_info?.name || "-"}</td>
                    <td>{journey.startingpoint}</td>
                    <td>{journey.destination}</td>
                    <td className="text-center">{journey.weight} KGs</td>
                    <td
                      className={
                        journey.status === "delivered"
                          ? "bg-success text-white"
                          : journey.status === "cancelled"
                            ? "bg-danger text-white"
                            : journey.status === "inprogress"
                              ? "bg-warning text-dark"
                              : "bg-info text-white"
                      }
                    >
                      {journey.status}
                    </td>

                    <td className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-journey-modal"
                        onClick={() => {
                          console.log("Editing Journey:", journey);
                          setEditingJourney(journey);
                          console.log("Set editingJourney to:", journey);
                        }}
                      >
                        <MdModeEdit />
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteJourney(journey.id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={role === "admin" ? 9 : 10}
                    className="text-center"
                  >
                    No Journeys Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALS */}
      <AddJourney />
      <EditJourney
        journey={isEditingJourney}
        handleEditJourney={handleEditJourney}
      />
    </>
  );
}

export default Journeys;
