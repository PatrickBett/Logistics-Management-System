import React, { useState, useEffect } from "react";

function EditDriver({ driver, handleEdit }) {
  const [license_no, setLicenseNo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [trips, setTrips] = useState(0);
  const [incomplete_trips, setIncompleteTrips] = useState(0);
  const [status, setStatus] = useState("");
  const [leaveDate, setLeaveDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sync state with driver prop
  useEffect(() => {
    if (driver) {
      setLicenseNo(driver.license_no || "");
      setName(driver.name || "");
      setPhone(driver.phone || "");
      setEmail(driver.email || "");
      setIncompleteTrips(driver.incomplete_trips || 0);
      setTrips(driver.complete_trips || 0);
      setStatus(driver.status || "isAvailable");

      // Handle potential null dates from backend for the input fields
      setLeaveDate(driver.leave_date ? driver.leave_date.substring(0, 16) : "");
      setReturnDate(
        driver.return_date ? driver.return_date.substring(0, 16) : "",
      );
    }
  }, [driver]);

  // Helper to format date to ISO 8601 for the Backend
  const formatToISO = (dateString) => {
    if (!dateString || dateString === "") return null;
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date.toISOString();
  };

  const handleUpdateClick = async () => {
    setIsLoading(true);

    const payload = {
      id: driver.id,
      license_no,
      name,
      phone,
      email,
      complete_trips: Number(trips),
      incomplete_trips: Number(incomplete_trips),
      status,
      // If status isn't "onLeave", send null to avoid validation errors
      leave_date: status === "onLeave" ? formatToISO(leaveDate) : null,
      return_date: status === "onLeave" ? formatToISO(returnDate) : null,
    };

    try {
      await handleEdit(payload);
      // Bootstrap's data-bs-dismiss="modal" on the button usually handles closing
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    modalContent: {
      borderRadius: "20px",
      border: "none",
      boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.1)",
    },
    header: { borderBottom: "1px solid #F4F7FE", padding: "1.5rem" },
    title: { color: "#2B3674", fontWeight: "700" },
    label: {
      color: "#2B3674",
      fontWeight: "600",
      fontSize: "0.9rem",
      marginBottom: "0.5rem",
    },
    input: {
      borderRadius: "12px",
      padding: "0.6rem 1rem",
      border: "1px solid #D1D9E8",
      color: "#2B3674",
    },
    primaryBtn: {
      backgroundColor: "#1a839a",
      border: "none",
      borderRadius: "12px",
      padding: "0.6rem 1.5rem",
      fontWeight: "600",
    },
  };

  return (
    <div
      className="modal fade"
      id="edit-driver-modal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={styles.modalContent}>
          <div className="modal-header" style={styles.header}>
            <h5 className="modal-title" style={styles.title}>
              Update Driver Profile
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4">
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label style={styles.label}>License Number</label>
                  <input
                    type="text"
                    className="form-control"
                    style={styles.input}
                    value={license_no}
                    onChange={(e) => setLicenseNo(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={styles.label}>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    style={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label style={styles.label}>Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    style={styles.input}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={styles.label}>Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    style={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label style={styles.label}>Completed Trips</label>
                  <input
                    type="number"
                    className="form-control"
                    style={styles.input}
                    value={trips}
                    onChange={(e) => setTrips(e.target.value)}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={styles.label}>Incomplete Trips</label>
                  <input
                    type="number"
                    className="form-control"
                    style={styles.input}
                    value={incomplete_trips}
                    onChange={(e) => setIncompleteTrips(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label style={styles.label}>Employment Status</label>
                <select
                  className="form-select"
                  style={styles.input}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="isAvailable">Available</option>
                  <option value="onDuty">On Duty</option>
                  <option value="onLeave">On Leave</option>
                </select>
              </div>

              {status === "onLeave" && (
                <div className="row animate__animated animate__fadeIn">
                  <div className="col-md-6 mb-3">
                    <label style={styles.label}>Leave Date</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      style={styles.input}
                      value={leaveDate}
                      onChange={(e) => setLeaveDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label style={styles.label}>Return Date</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      style={styles.input}
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </form>
          </div>
          <div className="modal-footer border-0 p-4">
            <button
              type="button"
              className="btn btn-link text-muted fw-bold text-decoration-none"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary shadow"
              style={styles.primaryBtn}
              onClick={handleUpdateClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Updating...
                </>
              ) : (
                "Update Driver"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditDriver;
