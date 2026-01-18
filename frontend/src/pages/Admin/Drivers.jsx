import React from "react";

function Drivers() {
  return (
    <div>
      <h2>Drivers Management</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>License No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Trips</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>DL7JHS78</td>
            <td>Patrick Bett</td>
            <td>0791474734</td>
            <td>patrickbett018@gmail.com</td>
            <td>3</td>
            <td>Available</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Drivers;
