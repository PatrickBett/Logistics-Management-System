import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import {
  MdSettings,
  MdLocalShipping,
  MdPerson,
  MdBuild,
  MdEvent,
} from "react-icons/md";

function EditTruck({ truck, handleEditTruck }) {
  const { drivers } = useContext(AdminContext);
  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState({
    truckNo: "",
    type: "",
    driver: "",
    lastMaintenance: "",
    nextDue: "",
    status: "",
  });

  useEffect(() => {
    if (truck) {
      setFormData({
        truckNo: truck.truck_no || "",
        type: truck.type || "",
        driver: truck.driver || "",
        lastMaintenance: truck.last_maintenance
          ? truck.last_maintenance.slice(0, 16)
          : "",
        nextDue: truck.next_due ? truck.next_due.slice(0, 16) : "",
        status: truck.status || "",
      });
    }
  }, [truck]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onUpdate = async () => {
    setIsUpdating(true);
    try {
      await handleEditTruck({
        id: truck.id,
        truck_no: formData.truckNo,
        type: formData.type,
        driver: formData.driver,
        last_maintenance: formData.lastMaintenance,
        next_due: formData.nextDue,
        status: formData.status,
      });
      // Close modal logic is usually handled by Bootstrap data-attributes or a prop
    } finally {
      setIsUpdating(false);
    }
  };

  const styles = {
    modalContent: { borderRadius: "20px", border: "none", overflow: "hidden" },
    header: {
      backgroundColor: "#F4F7FE",
      borderBottom: "none",
      padding: "24px",
    },
    label: {
      fontSize: "0.75rem",
      fontWeight: "700",
      color: "#2B3674",
      marginBottom: "8px",
      display: "block",
    },
    input: {
      borderRadius: "12px",
      border: "1px solid #E0E5F2",
      padding: "12px",
      fontSize: "0.95rem",
    },
    maintenanceBox: {
      backgroundColor: "#FFF8F1",
      borderRadius: "16px",
      padding: "20px",
      border: "1px solid #FFE5D3",
    },
  };

  return (
    <div
      className="modal fade"
      id="edit-truck-modal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={styles.modalContent}>
          <div
            className="modal-header d-flex align-items-center"
            style={styles.header}
          >
            <div className="p-2 bg-warning rounded-3 text-white me-3 d-flex align-items-center justify-content-center">
              <MdSettings size={24} />
            </div>
            <h5 className="modal-title fw-bold" style={{ color: "#2B3674" }}>
              Asset Configuration
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body p-4">
            <form>
              <div className="row mb-4">
                <div className="col-md-6">
                  <label style={styles.label}>Plate Number</label>
                  <input
                    name="truckNo"
                    className="form-control"
                    style={styles.input}
                    value={formData.truckNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label style={styles.label}>Vehicle Type</label>
                  <input
                    name="type"
                    className="form-control"
                    style={styles.input}
                    value={formData.type}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label style={styles.label}>Assigned Operator</label>
                <div className="input-group">
                  <span
                    className="input-group-text bg-white border-end-0"
                    style={{
                      borderRadius: "12px 0 0 12px",
                      border: "1px solid #E0E5F2",
                    }}
                  >
                    <MdPerson className="text-muted" />
                  </span>
                  <select
                    name="driver"
                    className="form-select border-start-0"
                    style={{ ...styles.input, borderRadius: "0 12px 12px 0" }}
                    value={formData.driver}
                    onChange={handleChange}
                  >
                    <option value="">No Driver Assigned</option>
                    {drivers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={styles.maintenanceBox} className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <MdBuild className="text-warning me-2" />
                  <span className="fw-bold text-warning-emphasis small">
                    MAINTENANCE SCHEDULE
                  </span>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label style={{ ...styles.label, color: "#8B4513" }}>
                      Last Checkup
                    </label>
                    <input
                      name="lastMaintenance"
                      type="datetime-local"
                      className="form-control"
                      style={{
                        ...styles.input,
                        backgroundColor: "rgba(255,255,255,0.6)",
                      }}
                      value={formData.lastMaintenance}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label style={{ ...styles.label, color: "#8B4513" }}>
                      Service Due
                    </label>
                    <input
                      name="nextDue"
                      type="datetime-local"
                      className="form-control"
                      style={{
                        ...styles.input,
                        backgroundColor: "rgba(255,255,255,0.6)",
                      }}
                      value={formData.nextDue}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <label style={styles.label}>Operational Status</label>
                <select
                  name="status"
                  className="form-select"
                  style={styles.input}
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="">Select status</option>
                  <option value="isGood">🟢 Good Condition</option>
                  <option value="onMaintenance">🛠️ On Maintenance</option>
                </select>
              </div>
            </form>
          </div>

          <div className="modal-footer border-0 p-4">
            <button
              type="button"
              className="btn btn-light px-4 fw-bold"
              data-bs-dismiss="modal"
              style={{ borderRadius: "12px", color: "#A3AED0" }}
            >
              Dismiss
            </button>
            <button
              type="button"
              className="btn btn-primary px-4 fw-bold shadow"
              style={{
                borderRadius: "12px",
                backgroundColor: "#4318FF",
                border: "none",
              }}
              onClick={onUpdate}
              disabled={isUpdating}
            >
              {isUpdating ? "Syncing..." : "Apply Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTruck;
