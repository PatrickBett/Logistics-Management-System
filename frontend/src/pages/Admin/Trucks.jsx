import React from "react";
import { FaPlus } from "react-icons/fa";
import AddTruck from "../Modals/AddTruck";
import { useContext, useState, useEffect } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import api from "../../api";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";

function Trucks() {
  const { drivers, isLoading, setIsLoading, fetchTrucks, trucks, setTrucks } =
    useContext(AdminContext);
  console.log("Trucks", trucks);

  return (
    <>
      <div>
        <div className="row p-2 align-items-center">
          <div className="col">
            <h2>Trucks Management</h2>
          </div>
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
              {trucks.map((truck) => (
                <tr key={truck.id}>
                  <td>{truck.truck_no}</td>
                  <td>{truck.type}</td>
                  <td>
                    {truck.driver_info
                      ? truck.driver_info.name
                      : "No Driver Assigned"}
                  </td>
                  <td>{truck.last_maintenance}</td>
                  <td>{truck.next_due}</td>
                  <td>
                    {truck.status}
                    <IoMdArrowDropdown />
                  </td>
                  <td className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target=""
                    >
                      <MdModeEdit />
                    </button>

                    <button className="btn btn-danger">
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddTruck drivers={drivers} />
    </>
  );
}

export default Trucks;
