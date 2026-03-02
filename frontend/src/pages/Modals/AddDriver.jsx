import React, { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import {
  MdBadge,
  MdPerson,
  MdPhone,
  MdEmail,
  MdDirectionsBus,
} from "react-icons/md";

function AddDriver({ handleAddDriver }) {
  const [formData, setFormData] = useState({
    license_no: "",
    name: "",
    phone: "",
    email: "",
    trips: 0,
    incomplete_trips: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Simplified change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Added this to trigger the loading state
    try {
      const response = await api.post("api/drivers/", {
        license_no: formData.license_no,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        complete_trips: formData.trips,
        incomplete_trips: formData.incomplete_trips,
      });

      handleAddDriver(response.data);
      toast.success("Driver added to fleet successfully");

      // Reset form
      setFormData({
        license_no: "",
        name: "",
        phone: "",
        email: "",
        trips: 0,
        incomplete_trips: 0,
      });

      // Close modal using Bootstrap's native way or just let data-bs-dismiss handle it
    } catch (err) {
      console.error(err);
      toast.error("Failed to add driver. Please check details.");
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
    modalHeader: {
      borderBottom: "1px solid #F4F7FE",
      padding: "1.5rem",
    },
    inputIcon: {
      position: "absolute",
      left: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#A3AED0",
    },
    inputField: {
      borderRadius: "12px",
      paddingLeft: "45px",
      height: "50px",
      border: "1px solid #E0E5F2",
      fontSize: "0.95rem",
    },
    saveBtn: {
      backgroundColor: "#4318FF",
      border: "none",
      borderRadius: "12px",
      padding: "10px 25px",
      fontWeight: "600",
    },
  };

  return (
    <div
      className="modal fade"
      id="driver-modal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={styles.modalContent}>
          <div className="modal-header" style={styles.modalHeader}>
            <h5 className="fw-bold mb-0" style={{ color: "#2B3674" }}>
              Register New Driver
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body p-4">
            <form onSubmit={handleSave}>
              <div className="row">
                {/* Name Field */}
                <div className="col-12 mb-3">
                  <label
                    className="small fw-bold mb-2"
                    style={{ color: "#2B3674" }}
                  >
                    Full Name
                  </label>
                  <div className="position-relative">
                    <MdPerson style={styles.inputIcon} size={20} />
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      style={styles.inputField}
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* License Field */}
                <div className="col-12 mb-3">
                  <label
                    className="small fw-bold mb-2"
                    style={{ color: "#2B3674" }}
                  >
                    License Number
                  </label>
                  <div className="position-relative">
                    <MdBadge style={styles.inputIcon} size={20} />
                    <input
                      name="license_no"
                      type="text"
                      className="form-control"
                      style={styles.inputField}
                      placeholder="DL-000000"
                      value={formData.license_no}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Contact Row */}
                <div className="col-md-6 mb-3">
                  <label
                    className="small fw-bold mb-2"
                    style={{ color: "#2B3674" }}
                  >
                    Phone Number
                  </label>
                  <div className="position-relative">
                    <MdPhone style={styles.inputIcon} size={20} />
                    <input
                      name="phone"
                      type="text"
                      className="form-control"
                      style={styles.inputField}
                      placeholder="+254..."
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label
                    className="small fw-bold mb-2"
                    style={{ color: "#2B3674" }}
                  >
                    Email Address
                  </label>
                  <div className="position-relative">
                    <MdEmail style={styles.inputIcon} size={20} />
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      style={styles.inputField}
                      placeholder="john@logistics.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Trip Stats Row */}
                <div className="col-6 mb-3">
                  <label
                    className="small fw-bold mb-2"
                    style={{ color: "#2B3674" }}
                  >
                    Historical Trips
                  </label>
                  <input
                    name="trips"
                    type="number"
                    className="form-control"
                    style={{ ...styles.inputField, paddingLeft: "15px" }}
                    value={formData.trips}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-6 mb-3">
                  <label
                    className="small fw-bold mb-2"
                    style={{ color: "#2B3674" }}
                  >
                    Incomplete
                  </label>
                  <input
                    name="incomplete_trips"
                    type="number"
                    className="form-control"
                    style={{ ...styles.inputField, paddingLeft: "15px" }}
                    value={formData.incomplete_trips}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="modal-footer border-0 px-0 pb-0 mt-3">
                <button
                  type="button"
                  className="btn btn-light px-4"
                  data-bs-dismiss="modal"
                  style={{ borderRadius: "12px" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary shadow-sm"
                  style={styles.saveBtn}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Saving...
                    </>
                  ) : (
                    "Register Driver"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDriver;
