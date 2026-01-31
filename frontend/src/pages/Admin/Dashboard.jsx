import React, { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import { FaTruck, FaUser, FaUsers, FaRoute } from "react-icons/fa";
import TripsChart from "../../charts/TripsChart";

function Dashboard() {
  const { drivers, trucks, journeys, parties } = useContext(AdminContext);

  return (
    <div className="container-fluid px-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
        <h2 className="fw-semibold">Admin Dashboard</h2>
      </div>

      {/* Summary cards */}
      <div className="row g-4 mb-5">
        <div className="col-12 col-sm-6 col-md-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <FaUser className="fs-3 text-primary mb-2" />
              <h6 className="text-muted mb-1">Total Drivers</h6>
              <div className="fs-3 fw-bold">{drivers.length}</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <FaTruck className="fs-3 text-success mb-2" />
              <h6 className="text-muted mb-1">Total Trucks</h6>
              <div className="fs-3 fw-bold">{trucks.length}</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <FaUsers className="fs-3 text-warning mb-2" />
              <h6 className="text-muted mb-1">Total Parties</h6>
              <div className="fs-3 fw-bold">{parties.length}</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-3">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <FaRoute className="fs-3 text-danger mb-2" />
              <h6 className="text-muted mb-1">Total Journeys</h6>
              <div className="fs-3 fw-bold">{journeys.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tables & charts */}
      <div className="row g-4">
        {/* Drivers on leave */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white fw-semibold">
              Drivers on Leave
            </div>
            <div className="card-body table-responsive">
              <table className="table table-sm table-striped table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Name</th>
                    <th>License No</th>
                    <th>Phone</th>
                    <th>Leave Date</th>
                    <th>Return Date</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers.filter((d) => d.status === "onLeave").length > 0 ? (
                    drivers
                      .filter((d) => d.status === "onLeave")
                      .map((driver) => (
                        <tr key={driver.id}>
                          <td className="fw-medium">{driver.name}</td>
                          <td>{driver.license_no}</td>
                          <td>{driver.phone}</td>
                          <td>
                            {driver.leave_date
                              ? driver.leave_date.slice(0, 16)
                              : "—"}
                          </td>
                          <td>
                            {driver.return_date
                              ? driver.return_date.slice(0, 16)
                              : "—"}
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center text-muted py-4">
                        No driver currently on leave
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-white fw-semibold">
              Trips by Drivers
            </div>
            <div
              className="card-body d-flex align-items-center justify-content-center"
              style={{ minHeight: "320px" }}
            >
              <TripsChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
