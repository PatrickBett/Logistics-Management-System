import React, { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import {
  FaTruck,
  FaUser,
  FaUsers,
  FaRoute,
  FaMoneyBillWave,
} from "react-icons/fa";
import TripsChart from "../../charts/TripsChart";

function Dashboard() {
  const {
    drivers,
    trucks,
    journeys,
    parties,
    totalrevenue,
    totalweighttransported,
  } = useContext(AdminContext);

  

  return (
    <div className="container-fluid px-3">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
      </div>

      {/* Summary cards */}
      <div className="row g-4 mb-5">
        {[
          {
            icon: <FaUser className="fs-3 text-primary mb-2" />,
            title: "Total Drivers",
            value: drivers.length,
          },
          {
            icon: <FaTruck className="fs-3 text-success mb-2" />,
            title: "Total Trucks",
            value: trucks.length,
          },
          {
            icon: <FaUsers className="fs-3 text-warning mb-2" />,
            title: "Total Parties",
            value: parties.length,
          },
          {
            icon: <FaRoute className="fs-3 text-danger mb-2" />,
            title: "Total Journeys",
            value: journeys.length,
          },
        ].map((card, idx) => (
          <div className="col-12 col-sm-6 col-md-3" key={idx}>
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body text-center">
                {card.icon}
                <h6 className="text-muted mb-1">{card.title}</h6>
                <div className="fs-3 fw-bold">{card.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tables & charts */}
      <div className="row g-4">
        {/* Company Updates */}
        <div className="col-lg-6">
          <div
            className="card shadow-sm border-0 h-100"
            style={{ background: "#F8F9FA" }}
          >
            <div className="card-header bg-white fw-bold">Company Updates</div>
            <div className="card-body">
              <div className="row g-3">
                {/* Revenue & Weight Cards */}
                {[
                  {
                    icon: (
                      <FaMoneyBillWave className="fs-3 text-warning mb-2" />
                    ),
                    title: "Total Revenue",
                    value: `KES ${totalrevenue}`,
                  },
                  {
                    icon: (
                      <FaMoneyBillWave className="fs-3 text-warning mb-2" />
                    ),
                    title: "Total Weight Transported",
                    value: `${totalweighttransported} Kgs`,
                  },
                ].map((stat, idx) => (
                  <div className="col-sm-6" key={idx}>
                    <div className="card shadow-sm border-0 h-100">
                      <div className="card-body text-center">
                        {stat.icon}
                        <h6 className="text-muted mb-1">{stat.title}</h6>
                        <div className="fs-4 fw-bold">{stat.value}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Overweight Shipments Table */}
              <div className="mt-4 card-header bg-white fw-bold">
                Overweight Shipments
              </div>
              <div className="mt-2 table-responsive">
                <table className="table table-bordered table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Party Name</th>
                      <th>Weight Exceeded</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parties
                      .filter(
                        (p) => Number(p.voltransported) > Number(p.total_vol),
                      )
                      .map((party, index) => {
                        const diff =
                          Number(party.voltransported) -
                          Number(party.total_vol);
                        return (
                          <tr
                            key={party.id}
                            className="fw-medium"
                            style={{
                              backgroundColor:
                                diff > 0 ? "#ffcccc" : "transparent",
                            }}
                          >
                            <td>{index + 1}</td>
                            <td>{party.name}</td>
                            <td>{diff} kgs</td>
                          </tr>
                        );
                      })}
                    {parties.filter(
                      (p) => Number(p.voltransported) > Number(p.total_vol),
                    ).length === 0 && (
                      <tr>
                        <td colSpan={3} className="text-center text-muted py-3">
                          No parties have exceeded their total volume
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Drivers on Leave */}
        <div className="col-lg-6">
          <div
            className="card shadow-sm border-0 h-100"
            style={{ background: "#F8F9FA" }}
          >
            <div className="card-header bg-white fw-bold">Drivers on Leave</div>
            <div className="card-body table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
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
                      .map((driver, idx) => (
                        <tr key={driver.id}>
                          <td>{idx + 1}</td>
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
                      <td colSpan={6} className="text-center text-muted py-4">
                        No driver currently on leave
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
