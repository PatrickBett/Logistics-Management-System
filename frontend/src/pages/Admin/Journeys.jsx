import React from "react";

function Journeys() {
  return (
    <div>
      <h2>Journeys Management</h2>
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
  );
}

export default Journeys;
