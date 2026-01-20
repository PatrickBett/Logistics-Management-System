import React from "react";
import { FaPlus } from "react-icons/fa";
import AddJourney from "../Modals/AddJourney";


function Journeys() {
  return (
    <>
      <div>
        <div className="row p-2 align-items-center">
          <div className="col">
            <h2>Journeys Management</h2>
          </div>
          <div className="col text-end">
            <button className="btn btn-primary" data-bs-toggle='modal' data-bs-target='#journey-modal'>
              <FaPlus className="me-2" />
              Journey
            </button>
          </div>
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
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Patrick Bett</td>
                <td>KBV 830M</td>

                <td>Chandaria Limited</td>
                <td>Chandaria Warehouse</td>
                <td>Kisumu</td>
                <td>In Progress</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <AddJourney/>
    </>
  );
}

export default Journeys;
