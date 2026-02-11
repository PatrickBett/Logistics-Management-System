import React from "react";

function KpiCards({ journeys, drivers }) {

  const totalTrips = drivers.reduce(
    (sum, driver) => sum + (driver.complete_trips || 0),
    0,
  );


  const completedTrips = journeys.filter(
    (j) => j.status === "delivered",
  ).length;
  const incompletedTrips = journeys.filter(
    (j) => j.status === "cancelled",
  ).length;
  console.log("Completed Trips:", completedTrips);

 

  const onTimeRate =
    totalTrips === 0 ? 0 : ((completedTrips / (completedTrips + incompletedTrips)) * 100).toFixed(1);

  return (
    <div className="row mb-4">
      <div className="col">
        <div className="card p-3">
          <h6>Total Trips</h6>
          <h4>{totalTrips}</h4>
        </div>
      </div>

      {/* <div className="col">
        <div className="card p-3">
          <h6>Total Revenue</h6>
          <h4>{totalRevenue}</h4>
        </div>
      </div> */}

      <div className="col">
        <div className="card p-3">
          <h6>Active Drivers</h6>
          <h4>{drivers.length}</h4>
        </div>
      </div>

      <div className="col">
        <div className="card p-3">
          <h6>Completion Rate</h6>
          <h4>{onTimeRate}%</h4>
        </div>
      </div>
    </div>
  );
}

export default KpiCards;
