import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import {
  MdEditLocation,
  MdLocalShipping,
  MdPerson,
  MdCalendarToday,
  MdScale,
} from "react-icons/md";

function EditJourney({ handleEditJourney, journey }) {
  const { trucks, parties, drivers } = useContext(AdminContext);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    driver: "",
    truck: "",
    party: "",
    startingpoint: "",
    destination: "",
    weight: 0,
    description: "",
    status: "",
    date: "",
  });

  useEffect(() => {
    if (journey) {
      setFormData({
        driver: journey.driver || "",
        truck: journey.truck || "",
        party: journey.party || "",
        startingpoint: journey.startingpoint || "",
        destination: journey.destination || "",
        weight: journey.weight || 0,
        description: journey.description || "",
        status: journey.status || "",
        date: journey.date || "",
      });
    }
  }, [journey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Auto-update truck if driver changes
    if (name === "driver") {
      const selectedTruck = trucks.find(
        (t) => String(t.driver) === String(value),
      );
      if (selectedTruck) {
        setFormData((prev) => ({
          ...prev,
          driver: value,
          truck: selectedTruck.id,
        }));
      }
    }
  };

  const onUpdate = async () => {
    setIsSaving(true);
    try {
      await handleEditJourney({
        id: journey.id,
        ...formData,
      });
    } catch (err) {
      console.error("Update failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const styles = {
    modalContent: {
      borderRadius: "24px",
      border: "none",
      boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
    },
    header: {
      backgroundColor: "#F4F7FE",
      borderBottom: "none",
      padding: "25px 30px",
    },
    label: {
      fontSize: "0.7rem",
      fontWeight: "800",
      color: "#2B3674",
      textTransform: "uppercase",
      marginBottom: "8px",
      display: "block",
    },
    input: {
      borderRadius: "12px",
      border: "1px solid #E0E5F2",
      padding: "12px",
      fontSize: "0.95rem",
    },
    routeSection: {
      borderLeft: "2px dashed #4318FF",
      marginLeft: "12px",
      paddingLeft: "25px",
      position: "relative",
    },
  };

  return (
    <div
      className="modal fade"
      id="edit-journey-modal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content" style={styles.modalContent}>
          <div className="modal-header" style={styles.header}>
            <div className="d-flex align-items-center">
              <div className="p-2 bg-primary rounded-3 text-white me-3">
                <MdEditLocation size={22} />
              </div>
              <h5 className="fw-bold mb-0" style={{ color: "#2B3674" }}>
                Modify Journey Details
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
              {/* ASSIGNMENT SECTION */}
              <div className="row mb-4">
                <div className="col-md-4">
                  <label style={styles.label}>Driver</label>
                  <select
                    name="driver"
                    className="form-select"
                    style={styles.input}
                    value={formData.driver}
                    onChange={handleChange}
                  >
                    <option value="">Select Driver</option>
                    {drivers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label style={styles.label}>Vehicle</label>
                  <select
                    name="truck"
                    className="form-select"
                    style={styles.input}
                    value={formData.truck}
                    onChange={handleChange}
                  >
                    <option value="">Select Truck</option>
                    {trucks.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.truck_no}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label style={styles.label}>Partner Party</label>
                  <select
                    name="party"
                    className="form-select"
                    style={styles.input}
                    value={formData.party}
                    onChange={handleChange}
                  >
                    <option value="">Select Party</option>
                    {parties.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* ROUTE SECTION */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <div style={styles.routeSection}>
                    <div className="mb-3">
                      <label style={styles.label}>Dispatch From</label>
                      <input
                        name="startingpoint"
                        className="form-control"
                        style={styles.input}
                        value={formData.startingpoint}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label style={styles.label}>Destination</label>
                      <input
                        name="destination"
                        className="form-control"
                        style={styles.input}
                        value={formData.destination}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <label style={styles.label}>Cargo Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    style={{ ...styles.input, height: "108px", resize: "none" }}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* LOGISTICS SECTION */}
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label style={styles.label}>Date of Journey</label>
                  <input
                    name="date"
                    type="date"
                    className="form-control"
                    style={styles.input}
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label style={styles.label}>Load Weight (Tons)</label>
                  <input
                    name="weight"
                    type="number"
                    className="form-control"
                    style={styles.input}
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label style={styles.label}>Journey Status</label>
                  <select
                    name="status"
                    className="form-select"
                    style={styles.input}
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="inprogress">In Progress</option>
                    <option value="shipping">Shipping</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          <div className="modal-footer border-0 p-4">
            <button
              type="button"
              className="btn btn-light px-4"
              data-bs-dismiss="modal"
              style={{
                borderRadius: "12px",
                fontWeight: "600",
                color: "#A3AED0",
              }}
            >
              Discard
            </button>
            <button
              type="button"
              className="btn btn-primary px-5 shadow"
              style={{
                borderRadius: "12px",
                backgroundColor: "#4318FF",
                border: "none",
                fontWeight: "600",
              }}
              onClick={onUpdate}
              disabled={isSaving}
            >
              {isSaving ? "Updating Dispatch..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditJourney;
