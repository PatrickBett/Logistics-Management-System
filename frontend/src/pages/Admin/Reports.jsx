import React, { useContext } from "react";
import KpiCards from "./KpiCards";
import TopDriversChart from "./TopDriversChart";
import MonthlyTripsChart from "./MonthlyTripsChart";
import StatusPieChart from "./StatusPieChart";
import MonthlyAvgRevenueChart from "./MonthlyAvgRevenueChart.jsx";
import { AdminContext } from "../../contexts/AdminContext";
import { MdInsertChartOutlined, MdFileDownload } from "react-icons/md";

function Reports() {
  const { drivers, journeys } = useContext(AdminContext);

  // --- CUSTOM STYLES ---
  const styles = {
    container: {
      padding: "1.5rem",
      backgroundColor: "#f4f7fe",
      minHeight: "100vh",
    },
    headerText: {
      color: "#2B3674",
      fontWeight: "700",
      fontSize: "1.75rem",
      marginBottom: "0.25rem",
    },
    chartCard: {
      backgroundColor: "#fff",
      borderRadius: "20px",
      padding: "1.5rem",
      boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.02)",
      border: "none",
      height: "100%", // Ensures cards in the same row are equal height
      marginBottom: "1.5rem",
    },
    cardTitle: {
      color: "#2B3674",
      fontWeight: "700",
      fontSize: "1.1rem",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "1.5rem",
    },
    exportBtn: {
      backgroundColor: "#fff",
      color: "#4318FF",
      border: "1px solid #E0E5F2",
      borderRadius: "12px",
      padding: "8px 16px",
      fontSize: "0.85rem",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "0.2s",
    },
  };

  return (
    <div style={styles.container}>
      {/* Dashboard Header */}
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 style={styles.headerText}>Analytics Dashboard</h2>
          <p className="text-muted small mb-0">
            Real-time performance metrics and logistics overview
          </p>
        </div>
        <button style={styles.exportBtn} onClick={() => window.print()}>
          <MdFileDownload size={18} /> Export Report
        </button>
      </div>

      {/* KPI Section */}
      <div className="mb-4">
        <KpiCards drivers={drivers} journeys={journeys} />
      </div>

      {/* Top Row: Driver Performance & Revenue */}
      <div className="row">
        <div className="col-lg-7 col-md-12">
          <div style={styles.chartCard}>
            <div style={styles.cardTitle}>
              <div
                style={{
                  padding: "8px",
                  backgroundColor: "#F4F7FE",
                  borderRadius: "10px",
                  color: "#4318FF",
                }}
              >
                <MdInsertChartOutlined />
              </div>
              Top Performing Drivers
            </div>
            <TopDriversChart drivers={drivers} journeys={journeys} />
          </div>
        </div>

        <div className="col-lg-5 col-md-12">
          <div style={styles.chartCard}>
            <div style={styles.cardTitle}>
              <div
                style={{
                  padding: "8px",
                  backgroundColor: "#F4F7FE",
                  borderRadius: "10px",
                  color: "#05CD99",
                }}
              >
                <MdInsertChartOutlined />
              </div>
              Revenue Analysis
            </div>
            <MonthlyAvgRevenueChart drivers={drivers} journeys={journeys} />
          </div>
        </div>
      </div>

      {/* Bottom Row: Trip Volume & Delivery Status */}
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <div style={styles.chartCard}>
            <div style={styles.cardTitle}>
              <div
                style={{
                  padding: "8px",
                  backgroundColor: "#F4F7FE",
                  borderRadius: "10px",
                  color: "#4318FF",
                }}
              >
                <MdInsertChartOutlined />
              </div>
              Monthly Trip Volume
            </div>
            <MonthlyTripsChart journeys={journeys} />
          </div>
        </div>

        <div className="col-lg-4 col-md-12">
          <div style={styles.chartCard}>
            <div style={styles.cardTitle}>
              <div
                style={{
                  padding: "8px",
                  backgroundColor: "#F4F7FE",
                  borderRadius: "10px",
                  color: "#FFB547",
                }}
              >
                <MdInsertChartOutlined />
              </div>
              Delivery Status
            </div>
            <StatusPieChart journeys={journeys} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
