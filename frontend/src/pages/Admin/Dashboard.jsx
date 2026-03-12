import React, { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import {
  FaTruck,
  FaUser,
  FaUsers,
  FaRoute,
  FaMoneyBillWave,
  FaWeightHanging,
  FaCalendarCheck,
} from "react-icons/fa";
import { motion } from "framer-motion";
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

  // --- CUSTOM STYLES ---
  const styles = {
    dashboardWrapper: {
      backgroundColor: "#f4f7fe",
      minHeight: "100vh",
      // padding: "2rem",
      fontFamily: "'Inter', sans-serif",
    },
    mainTitle: {
      color: "#2B3674",
      fontSize: "1.8rem",
      fontWeight: "800",
      letterSpacing: "-0.5px",
    },
    card: {
      background: "#ffffff",
      borderRadius: "20px",
      border: "none",
      boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.03)",
    },
    iconCircle: (bgColor) => ({
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: bgColor,
      marginBottom: "1rem",
    }),
    tableHeader: {
      backgroundColor: "#F8F9FA",
      color: "#A3AED0",
      textTransform: "uppercase",
      fontSize: "0.75rem",
      fontWeight: "700",
      letterSpacing: "0.05em",
    },
    statValue: {
      color: "#2B3674",
      fontSize: "1.5rem",
      fontWeight: "700",
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div style={styles.dashboardWrapper}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 style={styles.mainTitle}>Logistics Overview</h2>
        <div className="text-muted small fw-medium">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Summary cards */}
      <div className="row g-4 mb-5">
        {[
          {
            icon: <FaUser />,
            title: "Total Drivers",
            value: drivers.length,
            color: "#E7EEFF",
            iconColor: "#4318FF",
          },
          {
            icon: <FaTruck />,
            title: "Total Trucks",
            value: trucks.length,
            color: "#E6FAF5",
            iconColor: "#05CD99",
          },
          {
            icon: <FaUsers />,
            title: "Total Parties",
            value: parties.length,
            color: "#FFF8E6",
            iconColor: "#FFB547",
          },
          {
            icon: <FaRoute />,
            title: "Total Journeys",
            value: journeys.length,
            color: "#FFEAF2",
            iconColor: "#EE5D50",
          },
        ].map((card, idx) => (
          <motion.div
            className="col-12 col-sm-6 col-md-3"
            key={idx}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: idx * 0.1, duration: 0.4 }}
          >
            <div className="card h-100 p-3" style={styles.card}>
              <div className="card-body d-flex flex-column align-items-center text-center">
                <div style={styles.iconCircle(card.color)}>
                  {React.cloneElement(card.icon, {
                    style: { color: card.iconColor, fontSize: "1.5rem" },
                  })}
                </div>
                <h6 style={{ color: "#A3AED0", fontWeight: "600" }}>
                  {card.title}
                </h6>
                <div style={styles.statValue}>{card.value}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="row g-4">
        {/* Company Updates & Insights */}
        <div className="col-lg-6">
          <div className="card h-100" style={styles.card}>
            <div className="card-header bg-transparent border-0 px-4 pt-4">
              <h5 style={{ color: "#2B3674", fontWeight: "700" }}>
                Financial Performance
              </h5>
            </div>
            <div className="card-body px-4">
              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div
                    className="p-3"
                    style={{ background: "#F4F7FE", borderRadius: "15px" }}
                  >
                    <FaMoneyBillWave
                      className="mb-2"
                      style={{ color: "#05CD99" }}
                    />
                    <p className="text-muted small mb-1">Total Revenue</p>
                    <h5 className="fw-bold mb-0 text-dark">
                      KES {totalrevenue.toLocaleString()}
                    </h5>
                  </div>
                </div>
                <div className="col-6">
                  <div
                    className="p-3"
                    style={{ background: "#F4F7FE", borderRadius: "15px" }}
                  >
                    <FaWeightHanging
                      className="mb-2"
                      style={{ color: "#4318FF" }}
                    />
                    <p className="text-muted small mb-1">Weight Moved</p>
                    <h5 className="fw-bold mb-0 text-dark">
                      {totalweighttransported} Kgs
                    </h5>
                  </div>
                </div>
              </div>

              <h6
                className="mb-3"
                style={{
                  color: "#2B3674",
                  fontWeight: "700",
                  fontSize: "0.9rem",
                }}
              >
                Overweight Shipments Alert
              </h6>
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>Party</th>
                      <th style={styles.tableHeader} className="text-end">
                        Exceeded
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {parties
                      .filter(
                        (p) => Number(p.voltransported) > Number(p.total_vol),
                      )
                      .map((party, idx) => {
                        const diff =
                          Number(party.voltransported) -
                          Number(party.total_vol);
                        return (
                          <motion.tr key={party.id} variants={rowVariants}>
                            <td className="fw-bold text-secondary">
                              {party.name}
                            </td>
                            <td className="text-end">
                              <span className="badge rounded-pill bg-danger-subtle text-danger px-3">
                                + {diff} kg
                              </span>
                            </td>
                          </motion.tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Drivers on Leave */}
        <div className="col-lg-6">
          <div className="card h-100" style={styles.card}>
            <div className="card-header bg-transparent border-0 px-4 pt-4 d-flex justify-content-between align-items-center">
              <h5 style={{ color: "#2B3674", fontWeight: "700" }}>
                Drivers on Leave
              </h5>
              <FaCalendarCheck style={{ color: "#A3AED0" }} />
            </div>
            <div className="card-body px-4">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr>
                      <th style={styles.tableHeader}>Driver</th>
                      <th style={styles.tableHeader}>Phone</th>
                      <th style={styles.tableHeader}>Return Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drivers.filter((d) => d.status === "onLeave").length >
                    0 ? (
                      drivers
                        .filter((d) => d.status === "onLeave")
                        .map((driver, idx) => (
                          <motion.tr key={driver.id} variants={rowVariants}>
                            <td>
                              <div className="fw-bold text-dark">
                                {driver.name}
                              </div>
                              <div className="text-muted small">
                                {driver.license_no}
                              </div>
                            </td>
                            <td className="text-secondary small">
                              {driver.phone}
                            </td>
                            <td>
                              <div className="badge bg-primary-subtle text-primary fw-medium">
                                {driver.return_date
                                  ? driver.return_date.slice(0, 10)
                                  : "—"}
                              </div>
                            </td>
                          </motion.tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-center py-5">
                          <div className="text-muted">
                            All drivers are currently active
                          </div>
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
    </div>
  );
}

export default Dashboard;
