import React, { useContext, useMemo } from "react";
import { AdminContext } from "../../contexts/AdminContext";

function UserDashboard() {
  const { journeys, trucks } = useContext(AdminContext);
  console.log("mytuck",trucks)

  const driverId = localStorage.getItem("user_id");

  const myJourneys = useMemo(() => {
    return journeys.filter((j) => j.driver_info?.id?.toString() === j.driver);
  }, [journeys, driverId]);
  console.log("my j",myJourneys)

  const activeJourney = myJourneys.find(
    (j) => j.status === "inprogress" || j.status === "shipping",
  );

  const completedCount = journeys.filter(
    (j) => j.status === "delivered",
  ).length;

  const totalWeight = myJourneys
    .filter((j) => j.status === "delivered")
    .reduce((sum, j) => sum + Number(j.weight || 0), 0);

  const myTruck = trucks.find(
    (t) => t.driver_info?.id?.toString() === t.driver,
  );
  const username = myTruck?.driver_info?.user?.username || "User";
  const weighttransported = myJourneys.reduce(
    (sum, j) => sum + Number(j.weight || 0),
    0,
  );

  return (
    <div className="container-fluid px-3">
      <h2 className="my-4">Welcome {username}</h2>

      {/* SUMMARY CARDS */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm text-center p-3">
            <h6>Total Journeys</h6>
            <h3>{myJourneys.length}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm text-center p-3">
            <h6>Completed</h6>
            <h3>{completedCount}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm text-center p-3">
            <h6>Total Weight</h6>
            <h3>{weighttransported} KGs</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm text-center p-3">
            <h6>Assigned Truck</h6>
            <h5>{myTruck ? myTruck.truck_no : "Not Assigned"}</h5>
          </div>
        </div>
      </div>

      {/* ACTIVE JOURNEY */}
      {activeJourney && (
        <div className="card shadow-sm mb-4">
          <div className="card-header fw-bold">Active Journey</div>
          <div className="card-body">
            <p>
              <strong>Party:</strong> {activeJourney.party_info?.name}
            </p>
            <p>
              <strong>From:</strong> {activeJourney.startingpoint}
            </p>
            <p>
              <strong>To:</strong> {activeJourney.destination}
            </p>
            <p>
              <strong>Weight:</strong> {activeJourney.weight} KGs
            </p>
            <span className="badge bg-info text-dark">
              {activeJourney.status}
            </span>
          </div>
        </div>
      )}

      {/* JOURNEY HISTORY */}
      <div className="card shadow-sm">
        <div className="card-header fw-bold">My Journey History</div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Party</th>
                <th>Route</th>
                <th>Weight</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myJourneys.length > 0 ? (
                myJourneys.map((j, index) => (
                  <tr key={j.id}>
                    <td>{index + 1}</td>
                    <td>{j.date}</td>
                    <td>{j.party_info?.name}</td>
                    <td>
                      {j.startingpoint} → {j.destination}
                    </td>
                    <td>{j.weight} KGs</td>
                    <td>{j.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No journeys assigned
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
