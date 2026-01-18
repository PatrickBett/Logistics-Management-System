import React from "react";

function Parties() {
  return (
    <div>
      <h2>Parties Management</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Person</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Total Volume</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Chandaria Limited Company</td>
            <td>Shadrack Malel</td>
            <td>0791474734</td>
            <td>chandarialimited@gmail.com</td>
            <td>24000 tonnes</td>
            <td>Active</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Parties;
