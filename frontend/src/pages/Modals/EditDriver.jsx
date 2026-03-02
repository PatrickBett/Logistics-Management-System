import React, { useState, useEffect } from "react";
import {
  MdEdit,
  MdBadge,
  MdPhone,
  MdEmail,
  MdEventAvailable,
  MdHistory,
} from "react-icons/md";

function EditDriver({ driver, handleEdit }) {
  const [formData, setFormData] = useState({
    license_no: "",
    name: "",
    phone: "",
    email: "",
    trips: 0,
    incomplete_trips: 0,
    status: "",
    leaveDate: "",
    returnDate: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);

  // Sync internal state when the "driver" prop changes (when user clicks edit)
  useEffect(() => {
    if (driver) {
      setFormData({
        license_no: driver.license_no || "",
        name: driver.name || "",
        phone: driver.phone || "",
        email: driver.email || "",
        incomplete_trips: driver.incomplete_trips || 0,
        trips: driver.complete_trips || 0,
        status: driver.status || "isAvailable",
        leaveDate: driver.leave_date || "",
        returnDate: driver.return_date || "",
      });
    }
  }, [driver]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onUpdate = async () => {
    setIsUpdating(true);
    await handleEdit({
      id: driver.id,
      license_no: formData.license_no,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      complete_trips: formData.trips,
      incomplete_trips: formData.incomplete_trips,
      status: formData.status,
      leave_date: formData.leaveDate,
      return_date: formData.returnDate,
    });
    setIsUpdating(false);
  };

  const styles = {
    modalContent: {
      borderRadius: "20px",
      border: "none",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    },
    header: {
      backgroundColor: "#F4F7FE",
      borderTopLeftRadius: "20px",
      borderTopRightRadius: "20px",
      padding: "20px 24px",
    },
    label: {
      fontSize: "0.75rem",
      fontWeight: "700",
      color: "#2B3674",
      marginLeft: "4px",
      marginBottom: "6px",
    },
    input: {
      borderRadius: "12px",
      padding: "10px 16px",
      border: "1px solid #E0E5F2",
      fontSize: "0.9rem",
    },
    statsBox: {
      backgroundColor: "#F8F9FD",
      padding: "15px",
      borderRadius: "15px",
      border: "1px solid #F1F4F9",
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
          <div className="modal-header border-0" style={styles.header}>
            <div className="d-flex align-items-center">
              <div className="p-2 bg-primary rounded-3 text-white me-3">
                <MdEdit size={20} />
              </div>
              <h5 className="modal-title fw-bold" style={{ color: "#2B3674" }}>
                Update Driver Profile
              </h5>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body p-4">
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label style={styles.label}>License Number</label>
                  <input
                    name="license_no"
                    className="form-control"
                    style={styles.input}
                    value={formData.license_no}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={styles.label}>Full Name</label>
                  <input
                    name="name"
                    className="form-control"
                    style={styles.input}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label style={styles.label}>Phone</label>
                  <input
                    name="phone"
                    className="form-control"
                    style={styles.input}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={styles.label}>Email</label>
                  <input
                    name="email"
                    className="form-control"
                    style={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div style={styles.statsBox} className="mb-4 mt-2">
                <p
                  className="small fw-bold text-muted mb-3"
                  style={{ letterSpacing: "0.5px" }}
                >
                  TRIP STATISTICS
                </p>
                <div className="row">
                  <div className="col-6 mb-2">
                    <label style={styles.label}>Total Completed</label>
                    <input
                      name="trips"
                      type="number"
                      className="form-control"
                      style={styles.input}
                      value={formData.trips}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6 mb-2">
                    <label style={styles.label}>Incomplete</label>
                    <input
                      name="incomplete_trips"
                      type="number"
                      className="form-control"
                      style={styles.input}
                      value={formData.incomplete_trips}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label style={styles.label}>Current Status</label>
                <select
                  name="status"
                  className="form-select"
                  style={styles.input}
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="isAvailable">Available</option>
                  <option value="onDuty">On Duty</option>
                  <option value="onLeave">On Leave</option>
                </select>
              </div>

              <div className="row">
                <div className="col-6 mb-3">
                  <label style={styles.label}>Leave Date</label>
                  <input
                    name="leaveDate"
                    type="datetime-local"
                    className="form-control"
                    style={styles.input}
                    value={formData.leaveDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-6 mb-3">
                  <label style={styles.label}>Return Date</label>
                  <input
                    name="returnDate"
                    type="datetime-local"
                    className="form-control"
                    style={styles.input}
                    value={formData.returnDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="modal-footer border-0 px-4 pb-4">
            <button
              type="button"
              className="btn btn-light px-4"
              data-bs-dismiss="modal"
              style={{ borderRadius: "10px" }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary px-4 shadow"
              style={{
                borderRadius: "10px",
                backgroundColor: "#4318FF",
                border: "none",
              }}
              onClick={onUpdate}
              disabled={isUpdating}
            >
              {isUpdating ? "Saving Changes..." : "Update Driver"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditDriver;
