import React, { useContext } from "react";
import KpiCards from "./KpiCards";
import TopDriversChart from "./TopDriversChart";
import MonthlyTripsChart from "./MonthlyTripsChart";
import StatusPieChart from "./StatusPieChart";
import { AdminContext } from "../../contexts/AdminContext";
import MonthlyAvgRevenueChart from "./MonthlyAvgRevenueChart.jsx";

function Reports() {
  const {drivers, journeys} = useContext(AdminContext)
  return (
    <div className="container mt-4">
      <h3 className="mb-4">Logistics Reports Dashboard</h3>

      <KpiCards drivers={drivers} journeys={journeys} />

      <div className="row">
        <div className="col-md-6">
          <TopDriversChart drivers={drivers} journeys={journeys} />
        </div>

        <div className="col-md-6">
          <MonthlyAvgRevenueChart drivers={drivers} journeys={journeys} />
        </div>
      </div>

      <MonthlyTripsChart journeys={journeys} />

      <StatusPieChart journeys={journeys} />
    </div>
  );
}

export default Reports;
