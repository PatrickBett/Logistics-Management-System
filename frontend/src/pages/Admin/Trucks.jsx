import React from "react";

function Trucks() {
  return (
    <div>
      <h2>Trucks Management</h2>
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
        </tbody>
      </table>
    </div>
  );
}

export default Trucks;
