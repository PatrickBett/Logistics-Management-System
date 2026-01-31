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
    handleDeleteJourney,
    isEditingJourney,
    setEditingJourney,
    handleEditJourney,
  } = useContext(AdminContext);

  const [searchQuery, setSearchQuery] = useState("");

  // 🔍 SEARCH LOGIC (SAFE + OPTIMIZED)
  const filteredJourneys = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return journeys.filter((journey) => {
      const driver = journey.driver_info?.name?.toLowerCase() || "";
      const truck = journey.truck_info?.truck_no?.toLowerCase() || "";
      const party = journey.party_info?.name?.toLowerCase() || "";

      return (
        driver.includes(query) || truck.includes(query) || party.includes(query)
      );
    });
  }, [journeys, searchQuery]);

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

        {/* TABLE */}
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <th>Driver</th>
                <th>Truck</th>
                <th>Party</th>
                <th>Starting Point</th>
                <th>Destination</th>
                {role === "admin" && <th>Cost</th>}
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredJourneys.length > 0 ? (
                filteredJourneys.map((journey) => (
                  <tr key={journey.id}>
                    <td>{journey.driver_info?.name || "-"}</td>
                    <td>{journey.truck_info?.truck_no || "-"}</td>
                    <td>{journey.party_info?.name || "-"}</td>
                    <td>{journey.startingpoint}</td>
                    <td>{journey.destination}</td>
                    {role === "admin" && <td>{journey.cost} KES</td>}
                    <td>{journey.status}</td>

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
                    colSpan={role === "admin" ? 8 : 7}
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
