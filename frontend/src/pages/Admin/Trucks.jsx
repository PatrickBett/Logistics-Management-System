import React from "react";
import { FaPlus } from "react-icons/fa";
import AddTruck from "../Modals/AddTruck";
import EditTruck from "../Modals/EditTruck";
import { useContext, useState, useEffect } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import api from "../../api";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";

function Trucks() {
  const { drivers, isLoading, setIsLoading, fetchTrucks, trucks, setTrucks, isEditingTruck, setEditingTruck, handleEditTruck } =
    useContext(AdminContext);
  console.log("Trucks", trucks);
  const role = localStorage.getItem("role");

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
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
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
              {trucks.length > 0 ? (
                trucks.map((truck) => (
                  <tr key={truck.id}>
                    <td>{truck.truck_no}</td>
                    <td>{truck.type}</td>
                    <td>
                      {truck.driver_info
                        ? truck.driver_info.name
                        : "No Driver Assigned"}
                    </td>
                    <td>{truck.last_maintenance?truck.last_maintenance:'Not yet Maintained'}</td>
                    <td>{truck.next_due?truck.next_due:'Not scheduled'}</td>
                    <td>
                      {truck.status}
                      <IoMdArrowDropdown />
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

                      <button className="btn btn-danger">
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center" colSpan={7}>
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
