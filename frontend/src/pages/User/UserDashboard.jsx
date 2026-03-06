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
import { jwtDecode } from "jwt-decode";

function UserDashboard() {
  const { journeys, trucks, drivers } = useContext(AdminContext);

  // Auth logic
  const access = localStorage.getItem("access");
  const dec = access ? jwtDecode(access) : null;
  const username = dec?.username || "Driver";

  // 1. Filter journeys for current driver
  const myJourneys = useMemo(() => {
    // Create a Set of IDs for O(1) lookup performance
    const driverIds = new Set(drivers.map((d) => d.id?.toString()));

    return journeys.filter((j) => driverIds.has(j.driver_info?.id?.toString()));
  }, [journeys, drivers]);
  console.log("myjourney", myJourneys);
 

  // 2. LOGIC: Latest 6 Delivered Journeys
  const recentHistory = useMemo(() => {
    return myJourneys
      .filter((j) => j.status === "delivered")
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Newest first
      .slice(0, 6); // Take top 6
  }, [myJourneys]);

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

  const myTruck = trucks.find((t) =>
    drivers.some((d) => d.id?.toString() === t.driver_info?.id?.toString()),
  );


  const brandTeal = "#1a839a";
  const darkNavy = "#2B3674";

  const styles = {
    container: {
      padding: "1.5rem",
      backgroundColor: "#f4f7fe",
      minHeight: "100vh",
    },
    headerText: { color: darkNavy, fontWeight: "700", fontSize: "1.75rem" },
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
      width: "45px",
      height: "45px",
      borderRadius: "12px",
      backgroundColor: `${color}10`,
      color: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "12px",
    }),
    activeCard: {
      background: `linear-gradient(135deg, ${brandTeal} 0%, #3aacc4 100%)`,
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
          Quick summary of your fleet activity.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row g-4 mb-4">
        <div className="col-md-3 col-6">
          <div style={styles.statCard}>
            <div style={styles.iconBox(brandTeal)}>
              <FaClipboardList size={18} />
            </div>
            <div>
              <p className="text-muted mb-0 small fw-bold">Total Trips</p>
              <h5 className="mb-0 fw-bold" style={{ color: darkNavy }}>
                {myJourneys.length}
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div style={styles.statCard}>
            <div style={styles.iconBox("#05CD99")}>
              <FaCheckCircle size={18} />
            </div>
            <div>
              <p className="text-muted mb-0 small fw-bold">Completed</p>
              <h5 className="mb-0 fw-bold" style={{ color: darkNavy }}>
                {completedCount}
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div style={styles.statCard}>
            <div style={styles.iconBox("#FFB547")}>
              <FaWeightHanging size={18} />
            </div>
            <div>
              <p className="text-muted mb-0 small fw-bold">Load (kg)</p>
              <h5 className="mb-0 fw-bold" style={{ color: darkNavy }}>
                {weightTransported}
              </h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div style={styles.statCard}>
            <div style={styles.iconBox(brandTeal)}>
              <FaTruck size={18} />
            </div>
            <div>
              <p className="text-muted mb-0 small fw-bold">Truck No.</p>
              <h5 className="mb-0 fw-bold" style={{ color: darkNavy }}>
                {myTruck?.truck_no || "N/A"}
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* ACTIVE JOURNEY */}
      {activeJourney ? (
        <div className="card shadow-sm mb-4" style={styles.activeCard}>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <span
                className="badge bg-white mb-2"
                style={{ color: brandTeal, borderRadius: "10px" }}
              >
                IN TRANSIT
              </span>
              <h4 className="fw-bold mb-1">{activeJourney.party_info?.name}</h4>
              <div className="d-flex align-items-center mt-3">
                <div className="text-center">
                  <p className="mb-0 small opacity-75">Starting</p>
                  <p className="fw-bold mb-0">{activeJourney.startingpoint}</p>
                </div>
                <MdOutlineArrowForward size={24} className="mx-4 opacity-50" />
                <div className="text-center">
                  <p className="mb-0 small opacity-75">Destination</p>
                  <p className="fw-bold mb-0">{activeJourney.destination}</p>
                </div>
              </div>
            </div>
            <div className="text-end">
              <h3 className="fw-bold mb-0">{activeJourney.weight}</h3>
              <p className="small opacity-75">Payload KG</p>
            </div>
          </div>
          <FaMapMarkerAlt
            style={{
              position: "absolute",
              right: "-10px",
              bottom: "-10px",
              fontSize: "100px",
              opacity: "0.1",
            }}
          />
        </div>
      ) : (
        <div
          className="alert bg-white border-0 shadow-sm p-4 mb-4"
          style={{ borderRadius: "20px" }}
        >
          <p className="mb-0 text-muted fw-bold">
            No active shipments. Ready for next dispatch.
          </p>
        </div>
      )}

      {/* RECENT HISTORY - LIMITED TO 6 */}
      <div style={styles.tableCard}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold mb-0" style={{ color: darkNavy }}>
            Recent Delivered Trips
          </h5>
          <span
            className="badge bg-light text-muted"
            style={{ borderRadius: "8px" }}
          >
            Last 6 records
          </span>
        </div>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr
                style={{
                  color: "#A3AED0",
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                }}
              >
                <th className="border-0">Completion Date</th>
                <th className="border-0">Client</th>
                <th className="border-0">Route</th>
                <th className="border-0 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentHistory.length > 0 ? (
                recentHistory.map((j) => (
                  <tr key={j.id} style={{ borderBottom: "1px solid #F4F7FE" }}>
                    <td className="py-3">
                      <div className="fw-bold" style={{ color: darkNavy }}>
                        {new Date(j.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="fw-bold" style={{ color: darkNavy }}>
                      {j.party_info?.name}
                    </td>
                    <td className="small text-muted">
                      {j.startingpoint} → {j.destination}
                    </td>
                    <td className="text-center">
                      <span
                        className="badge"
                        style={{
                          backgroundColor: "#E6F6F4",
                          color: "#05CD99",
                          borderRadius: "10px",
                        }}
                      >
                        Delivered
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-muted">
                    No delivered trips yet.
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
