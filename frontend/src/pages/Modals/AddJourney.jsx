import React, { useContext, useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { AdminContext } from "../../contexts/AdminContext";
import {
  MdRoute,
  MdLocalShipping,
  MdPerson,
  MdDateRange,
  MdScale,
} from "react-icons/md";

function AddJourney() {
  const { drivers, trucks, parties, setJourneys, fetchDrivers, fetchParties } =
    useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    driver: "",
    truck: null, // Stores the whole truck object for display
    party: "",
    startingpoint: "",
    destination: "",
    weight: 0,
    description: "",
    status: "",
    date: "",
  });

  // Automatically find the truck when a driver is selected
  const handleDriverChange = (driverId) => {
    const selectedTruck = trucks.find(
      (t) => String(t.driver) === String(driverId),
    );
    setFormData((prev) => ({
      ...prev,
      driver: driverId,
      truck: selectedTruck || null,
    }));
  };

  const handleSaveJourney = async (e) => {
    e.preventDefault();
    if (!formData.truck) {
      toast.error("The selected driver has no truck assigned!");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        ...formData,
        truck: formData.truck.id, // Send only ID to backend
      };

      const res = await api.post("api/journeys/", payload);

      setJourneys((prev) => [res.data, ...prev]);
      fetchParties();
      fetchDrivers();

      toast.success("Journey dispatched successfully!");

      // Reset form
      setFormData({
        driver: "",
        truck: null,
        party: "",
        startingpoint: "",
        destination: "",
        weight: 0,
        description: "",
        status: "",
        date: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add journey.");
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    modalContent: {
      borderRadius: "20px",
      border: "none",
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    },
    sectionLabel: {
      fontSize: "0.7rem",
      fontWeight: "800",
      color: "#A3AED0",
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginBottom: "15px",
    },
    inputGroup: {
      borderRadius: "12px",
      backgroundColor: "#F4F7FE",
      border: "1px solid #E0E5F2",
      padding: "10px",
    },
    routeLine: {
      borderLeft: "2px dashed #4318FF",
      marginLeft: "20px",
      paddingLeft: "20px",
      marginY: "10px",
    },
  };

  return (
    <div
      id="journey-modal"
      className="modal fade"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content" style={styles.modalContent}>
          <div className="modal-header border-0 p-4">
            <h5 className="fw-bold mb-0" style={{ color: "#2B3674" }}>
              Dispatch New Journey
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body px-4 pt-0">
            <form onSubmit={handleSaveJourney}>
              {/* PERSONNEL & ASSETS */}
              <div style={styles.sectionLabel}>Assignment</div>
              <div className="row mb-4">
                <div className="col-md-6 mb-3">
                  <label className="small fw-bold mb-2">Driver</label>
                  <select
                    className="form-select"
                    style={styles.inputGroup}
                    value={formData.driver}
                    onChange={(e) => handleDriverChange(e.target.value)}
                    required
                  >
                    <option value="">Select Driver</option>
                    {drivers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="small fw-bold mb-2">
                    Vehicle (Auto-detected)
                  </label>
                  <input
                    readOnly
                    className="form-control"
                    style={{
                      ...styles.inputGroup,
                      backgroundColor: "#E9EDF7",
                      color: "#2B3674",
                      fontWeight: "600",
                    }}
                    value={
                      formData.truck
                        ? formData.truck.truck_no
                        : "No Truck Assigned"
                    }
                  />
                </div>
              </div>

              {/* ROUTE & CLIENT */}
              <div style={styles.sectionLabel}>Logistics & Route</div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="small fw-bold mb-2">Client (Party)</label>
                  <select
                    className="form-select"
                    style={styles.inputGroup}
                    value={formData.party}
                    onChange={(e) =>
                      setFormData({ ...formData, party: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Party</option>
                    {parties.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="small fw-bold mb-2">Dispatch Date</label>
                  <input
                    type="date"
                    className="form-control"
                    style={styles.inputGroup}
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="small fw-bold mb-1">Starting Point</label>
                    <input
                      className="form-control"
                      style={styles.inputGroup}
                      placeholder="Origin"
                      value={formData.startingpoint}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          startingpoint: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="small fw-bold mb-1">Destination</label>
                    <input
                      className="form-control"
                      style={styles.inputGroup}
                      placeholder="Endpoint"
                      value={formData.destination}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          destination: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="small fw-bold mb-2">
                      Cargo Description
                    </label>
                    <textarea
                      className="form-control"
                      style={{ ...styles.inputGroup, height: "105px" }}
                      placeholder="Specify goods..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* METRICS & STATUS */}
              <div style={styles.sectionLabel}>Execution</div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="small fw-bold mb-2">
                    Cargo Weight (Tons/KGs)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    style={styles.inputGroup}
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        weight: Number(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="small fw-bold mb-2">Status</label>
                  <select
                    className="form-select"
                    style={styles.inputGroup}
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="">Set Status</option>
                    <option value="inprogress">In Progress</option>
                    <option value="shipping">Shipping</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer border-0 px-0 mt-4">
                <button
                  type="button"
                  className="btn btn-link text-muted text-decoration-none"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary shadow-sm"
                  style={{
                    backgroundColor: "#4318FF",
                    border: "none",
                    borderRadius: "12px",
                    padding: "12px 40px",
                    fontWeight: "600",
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Dispatching..." : "Launch Journey"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddJourney;
