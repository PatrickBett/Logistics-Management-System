import React from "react";
import { AdminContext } from "../../contexts/AdminContext";
import { useContext } from "react";
import {
  FaTruck,
  FaUser,
  FaTachometerAlt,
  FaChartBar,
  FaUsers,
  FaRoute,
} from "react-icons/fa";
import TripsChart from "../../charts/TripsChart";

function Dashboard() {
  const { drivers, trucks, journeys, parties } = useContext(AdminContext);
  console.log("Dashboard Drivers", drivers);
  return (
    <div>
      <h2 className="mb-4 mt-3">Welcome Admin</h2>

      <div className="row g-3 mb-5">
        <div className="col-12 col-sm-6 col-md-3">
          <div className="border p-4 text-center">
            <h5>
              <FaUser className="me-2" />
              Total Drivers
            </h5>
            <p className="fw-bold fs-4">{drivers.length}</p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <div className="border p-4 text-center">
            <h5>
              <FaTruck className="me-2" />
              Total Trucks
            </h5>
            <p className="fw-bold fs-4">{trucks.length}</p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <div className="border p-4 text-center">
            <h5>
              <FaUsers className="me-2" /> Total Parties
            </h5>
            <p className="fw-bold fs-4">{parties.length}</p>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3">
          <div className="border p-4 text-center">
            <h5>
              <FaRoute className="me-2" />
              Total Journeys
            </h5>
            <p className="fw-bold fs-4">{journeys.length}</p>
          </div>
        </div>
      </div>

      <div className="row">
        <h5>Drivers on Leave</h5>
        <div className="table-responsive col-sm-6">
          <table className="table table-bordered g-3">
            <thead>
              <tr>
                <th>Name</th>
                <th>License No</th>
                <th>Phone No</th>
                <th>Leave Date</th>
                <th>Return Date</th>
              </tr>
            </thead>
            <tbody>
              {drivers.filter((driver) => driver.status === "onLeave").length >
              0 ? (
                drivers
                  .filter((driver) => driver.status === "onLeave")
                  .map((driver) => (
                    <tr key={driver.id}>
                      <td>{driver.name}</td>
                      <td>{driver.license_no}</td>
                      <td>{driver.phone}</td>
                      <td>
                        {driver.leave_date
                          ? driver.leave_date.slice(0, 16)
                          : ""}
                      </td>
                      <td>
                        {driver.return_date
                          ? driver.return_date.slice(0, 16)
                          : ""}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No Driver Currently On Leave
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-sm-6">
          <h5>Trips By Drivers</h5>
          <div>
            <TripsChart className="mt-5 pt-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
