import React from "react";

import {
  FaTruck,
  FaUser,
  FaTachometerAlt,
  FaChartBar,
  FaUsers,
  FaRoute,
} from "react-icons/fa";



function Dashboard() {
  return (
    <div className="container-fluid">
      <h2 className="mb-4">Welcome Admin</h2>

      <div className="row g-3 mb-5">
        <div className="col-12 col-sm-6 col-md-3">
          <div className="border p-4 text-center">
            <h5>
              <FaUser className="me-2" />
              Total Drivers
            </h5>
            <p className="fw-bold fs-4">120</p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <div className="border p-4 text-center">
            <h5>
              <FaTruck className="me-2" />
              Total Trucks
            </h5>
            <p className="fw-bold fs-4">45</p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <div className="border p-4 text-center">
            <h5>
              <FaUsers className="me-2" /> Total Parties
            </h5>
            <p className="fw-bold fs-4">4</p>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <div className="border p-4 text-center">
            <h5>
              <FaRoute className="me-2" />
              Total Journeys
            </h5>
            <p className="fw-bold fs-4">320</p>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6">
          <h5>Unavailable Drivers</h5>
          <table className="table table-bordered g-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>License No</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>James Kariuki</td>
                <td>DL234</td>
                <td>On Leave</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-sm-6">
          <h5>Unavailable Drivers</h5>
          <table className="table table-bordered g-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>License No</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>James Kariuki</td>
                <td>DL234</td>
                <td>On Leave</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
