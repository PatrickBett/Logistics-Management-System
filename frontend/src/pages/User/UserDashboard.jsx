import React, { useContext, useMemo } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import {
  FaTruck,
  FaCheckCircle,
  FaWeightHanging,
  FaClipboardList,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdOutlineArrowForward } from "react-icons/md";

function UserDashboard() {
  const { journeys, trucks, drivers } = useContext(AdminContext);
  const driverId = localStorage.getItem("user_id");

  // Filter journeys for the current driver
  const myJourneys = useMemo(() => {
    return journeys.filter(
      (j) => j.driver_info?.id?.toString() === drivers[0]?.id?.toString(),
    );
  }, [journeys, drivers]);

  const activeJourney = myJourneys.find(
    (j) => j.status === "inprogress" || j.status === "shipping",
  );

  const completedCount = myJourneys.filter(
    (j) => j.status === "delivered",
  ).length;

  const weightTransported = myJourneys.reduce(
    (sum, j) => sum + Number(j.weight || 0),
    0,
  );

  const myTruck = trucks.find(
    (t) => t.driver_info?.id?.toString() === drivers[0]?.id?.toString(),
  );

  const username = myTruck?.driver_info?.name || "Driver";

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
    },
    statCard: {
      backgroundColor: "#fff",
      borderRadius: "20px",
      padding: "1.25rem",
      border: "none",
      display: "flex",
      alignItems: "center",
      boxShadow: "0px 18px 40px rgba(0, 0, 0, 0.02)",
    },
    iconBox: (color) => ({
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      backgroundColor: "#F4F7FE",
      color: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "15px",
    }),
    activeCard: {
      background: "linear-gradient(135deg, #1a839a 0%, #707EAE 100%)",
      borderRadius: "20px",
      color: "#fff",
      padding: "1.5rem",
      position: "relative",
      overflow: "hidden",
      border: "none",
    },
    tableCard: {
      backgroundColor: "#fff",
      borderRadius: "20px",
      padding: "1.5rem",
      boxShadow: "0px 18px 40px rgba(0, 0, 0, 0.02)",
      border: "none",
    },
  };

  return (
    <div style={styles.container}>
      <div className="mb-4">
        <h2 style={styles.headerText}>Hello, {username} 👋</h2>
        <p className="text-muted small">
          Here is your trip overview for today.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row g-4 mb-4">
        <div className="col-md-3 col-6">
          <div style={styles.statCard}>
            <div style={styles.iconBox("#4318FF")}>
              <FaClipboardList size={20} />
            </div>
            <div>
              <p className="text-muted mb-0 small fw-bold">Trips</p>
              <h5 className="mb-0 fw-bold" style={{ color: "#2B3674" }}>
                {myJourneys.length}
              </h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-6">
          <div style={styles.statCard}>
            <div style={styles.iconBox("#05CD99")}>
              <FaCheckCircle size={20} />
            </div>
            <div>
              <p className="text-muted mb-0 small fw-bold">Done</p>
              <h5 className="mb-0 fw-bold" style={{ color: "#2B3674" }}>
                {completedCount}
              </h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-6">
          <div style={styles.statCard}>
            <div style={styles.iconBox("#FFB547")}>
              <FaWeightHanging size={20} />
            </div>
            <div>
              <p className="text-muted mb-0 small fw-bold">Load</p>
              <h5 className="mb-0 fw-bold" style={{ color: "#2B3674" }}>
                {weightTransported}kg
              </h5>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-6">
          <div style={styles.statCard}>
            <div style={styles.iconBox("#4318FF")}>
              <FaTruck size={20} />
            </div>
            <div>
              <p className="text-muted mb-0 small fw-bold">Truck</p>
              <h5 className="mb-0 fw-bold" style={{ color: "#2B3674" }}>
                {myTruck ? myTruck.truck_no : "None"}
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVE JOURNEY - PROMINENT VIEW */}
      {activeJourney ? (
        <div className="card shadow-sm mb-4" style={styles.activeCard}>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <span
                className="badge bg-white text-primary mb-2"
                style={{ borderRadius: "10px", fontSize: "0.7rem" }}
              >
                CURRENTLY SHIPPING
              </span>
              <h4 className="fw-bold mb-1">{activeJourney.party_info?.name}</h4>
              <div className="d-flex align-items-center mt-3">
                <div className="text-center">
                  <p className="mb-0 small opacity-75">Origin</p>
                  <p className="fw-bold">{activeJourney.startingpoint}</p>
                </div>
                <MdOutlineArrowForward size={24} className="mx-4 opacity-50" />
                <div className="text-center">
                  <p className="mb-0 small opacity-75">Destination</p>
                  <p className="fw-bold">{activeJourney.destination}</p>
                </div>
              </div>
            </div>
            <div className="text-end">
              <h3 className="fw-bold mb-0">{activeJourney.weight}</h3>
              <p className="small opacity-75">Total KGs</p>
            </div>
          </div>
          <FaMapMarkerAlt
            style={{
              position: "absolute",
              right: "-20px",
              bottom: "-20px",
              fontSize: "120px",
              opacity: "0.1",
            }}
          />
        </div>
      ) : (
        <div
          className="alert bg-white border-0 shadow-sm p-4 mb-4"
          style={{ borderRadius: "20px" }}
        >
          <p className="mb-0 text-muted">
            No active trip currently. Check your history below or contact
            dispatch.
          </p>
        </div>
      )}

      {/* JOURNEY HISTORY */}
      <div style={styles.tableCard}>
        <h5 className="fw-bold mb-4" style={{ color: "#2B3674" }}>
          Trip History
        </h5>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr
                style={{
                  color: "#A3AED0",
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                }}
              >
                <th className="border-0">Date</th>
                <th className="border-0">Client</th>
                <th className="border-0">Route</th>
                <th className="border-0 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {myJourneys.length > 0 ? (
                myJourneys.map((j) => (
                  <tr key={j.id} style={{ borderBottom: "1px solid #F4F7FE" }}>
                    <td className="py-3 small">{j.date}</td>
                    <td className="fw-bold" style={{ color: "#2B3674" }}>
                      {j.party_info?.name}
                    </td>
                    <td className="small text-muted">
                      {j.startingpoint} → {j.destination}
                    </td>
                    <td className="text-center">
                      <span
                        className={`badge ${j.status === "delivered" ? "bg-success-light text-success" : "bg-light text-muted"}`}
                        style={{ borderRadius: "10px", padding: "5px 10px" }}
                      >
                        {j.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-muted">
                    No history found
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
