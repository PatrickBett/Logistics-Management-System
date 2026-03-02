import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "../../contexts/AdminContext";
import api from "../../api";
import {
  MdDirectionsBus,
  MdSettings,
  MdPerson,
  MdEventNote,
  MdAssignment,
} from "react-icons/md";

function AddTruck({ drivers }) {
  const { setTrucks } = useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(false);

  // State grouping for cleaner management
  const [formData, setFormData] = useState({
    truckNo: "",
    type: "",
    person: "",
    maintenanceDate: "",
    dueDate: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTruck = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("api/trucks/", {
        truck_no: formData.truckNo,
        type: formData.type,
        driver: formData.person,
        last_maintenance: formData.maintenanceDate || null,
        next_due: formData.dueDate || null,
        status: formData.status,
      });

      setTrucks((prev) => [...prev, res.data]);
      toast.success("Vehicle added to fleet successfully");

      // Reset form
      setFormData({
        truckNo: "",
        type: "",
        person: "",
        maintenanceDate: "",
        dueDate: "",
        status: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to register vehicle. Please check inputs.");
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    modalContent: {
      borderRadius: "20px",
      border: "none",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    },
    sectionTitle: {
      fontSize: "0.75rem",
      textTransform: "uppercase",
      letterSpacing: "1px",
      color: "#A3AED0",
      fontWeight: "700",
      marginBottom: "15px",
      marginTop: "10px",
    },
    inputField: {
      borderRadius: "12px",
      padding: "12px 15px",
      border: "1px solid #E0E5F2",
      fontSize: "0.9rem",
      backgroundColor: "#F4F7FE",
    },
    saveBtn: {
      backgroundColor: "#4318FF",
      border: "none",
      borderRadius: "12px",
      padding: "12px 30px",
      fontWeight: "600",
    },
  };

  return (
    <div
      id="truck-modal"
      className="modal fade"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content" style={styles.modalContent}>
          <div className="modal-header border-0 p-4 pb-0">
            <h5 className="fw-bold" style={{ color: "#2B3674" }}>
              Register New Vehicle
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body p-4">
            <form onSubmit={handleAddTruck}>
              <div className="row">
                {/* Section 1: Vehicle Details */}
                <div className="col-12">
                  <p style={styles.sectionTitle}>Basic Information</p>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="small fw-bold mb-2">Vehicle Number</label>
                  <input
                    name="truckNo"
                    type="text"
                    className="form-control"
                    style={styles.inputField}
                    placeholder="KAA 123X"
                    value={formData.truckNo}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="small fw-bold mb-2">Truck Type</label>
                  <input
                    name="type"
                    type="text"
                    className="form-control"
                    style={styles.inputField}
                    placeholder="Semi-Trailer / Flatbed"
                    value={formData.type}
                    onChange={handleChange}
                  />
                </div>

                {/* Section 2: Assignment & Status */}
                <div className="col-12">
                  <p style={styles.sectionTitle}>Assignment & Status</p>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="small fw-bold mb-2">Assigned Driver</label>
                  <select
                    name="person"
                    className="form-select"
                    style={styles.inputField}
                    value={formData.person}
                    onChange={handleChange}
                  >
                    <option value="">Unassigned</option>
                    {drivers.map((driver) => (
                      <option key={driver.id} value={driver.id}>
                        {driver.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="small fw-bold mb-2">
                    Operational Status
                  </label>
                  <select
                    name="status"
                    className="form-select"
                    style={styles.inputField}
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="">Select Status</option>
                    <option value="isGood">Good Condition</option>
                    <option value="onMaintenance">In Maintenance</option>
                  </select>
                </div>

                {/* Section 3: Maintenance */}
                <div className="col-12">
                  <p style={styles.sectionTitle}>Maintenance Schedule</p>
                </div>

                <div className="col-md-6 mb-3">
                  <label className="small fw-bold mb-2">
                    Last Service Date
                  </label>
                  <input
                    name="maintenanceDate"
                    type="datetime-local"
                    className="form-control"
                    style={styles.inputField}
                    value={formData.maintenanceDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="small fw-bold mb-2">Next Due Date</label>
                  <input
                    name="dueDate"
                    type="datetime-local"
                    className="form-control"
                    style={styles.inputField}
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="modal-footer border-0 px-0 pb-0 mt-4">
                <button
                  type="button"
                  className="btn btn-link text-muted text-decoration-none"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary shadow"
                  style={styles.saveBtn}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Register Vehicle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTruck;
