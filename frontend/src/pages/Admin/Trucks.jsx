import React from "react";
import { FaPlus } from "react-icons/fa";
import AddTruck from "../Modals/AddTruck";

function Trucks() {
  return (
    <>
      <div>
        <div className="row p-2 align-items-center">
          <div className="col">
            <h2>Trucks Management</h2>
          </div>
          <div className="col text-end">
            <button className="btn btn-primary" data-bs-toggle='modal' data-bs-target='#truck-modal'>
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>KBV 830M</td>
                <td>Lorry</td>
                <td>Patrick Bett</td>
                <td>01/01/2026</td>
                <td>03/03/2026</td>
                <td>Good Condition</td>
              </tr>
              <tr>
                <td>KBV 830M</td>
                <td>Lorry</td>
                <td>Patrick Bett</td>
                <td>01/01/2026</td>
                <td>03/03/2026</td>
                <td>Good Condition</td>
              </tr>
              <tr>
                <td>KBV 830M</td>
                <td>Lorry</td>
                <td>Patrick Bett</td>
                <td>01/01/2026</td>
                <td>03/03/2026</td>
                <td>Good Condition</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <AddTruck/>
    </>
  );
}

export default Trucks;
