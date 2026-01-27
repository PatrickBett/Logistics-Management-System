import React from "react";
import { FaPlus } from "react-icons/fa";
import AddJourney from "../Modals/AddJourney";
import { useState, useEffect, useContext } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import api from "../../api";
import { AdminContext } from "../../contexts/AdminContext";
import { toast } from "react-toastify";
import EditJourney from "../Modals/EditJourney";
function Journeys() {
  const role = localStorage.getItem("role");
  const {
    journeys,
    setJourneys,
    handleDeleteJourney,
    isEditing,
    setEditingParty,
    handleEditParty,
    isEditingJourney,
    setEditingJourney,
    handleEditJourney,
  } = useContext(AdminContext);

  return (
    <>
      <div>
        <div className="row p-2 align-items-center">
          <div className="col">
            <h2>Journeys Management</h2>
          </div>
          {role === "admin" ? (
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
          ) : (
            ""
          )}
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
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
              {journeys.length > 0 ? (
                journeys.map((journey) => (
                  <tr key={journey.id}>
                    <td>{journey.driver_info.name}</td>
                    <td>{journey.truck_info.truck_no}</td>
                    <td>{journey.party_info.name}</td>
                    <td>{journey.startingpoint}</td>
                    <td>{journey.destination}</td>
                    {role === "admin" && <td>{journey.cost} kes</td>}
                    <td>{journey.status}</td>
                    <td className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-journey-modal"
                        onClick={() => {
                          setEditingJourney(journey);
                          console.log(journey);
                        }}
                      >
                        <MdModeEdit />
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteJourney(journey.id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center" colSpan={8}>
                    No Journies Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <AddJourney />
      <EditJourney
        handleEditJourney={handleEditJourney}
        journey={isEditingJourney}
      />
    </>
  );
}

export default Journeys;
