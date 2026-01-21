import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import api from "../../api";

function AddTruck({ drivers }) {
  const [truckNo, setTruckNo] = useState("");
  const [type, setType] = useState("");
  const [person, setPerson] = useState("");
  const [maintenanceDate, setMaintenanceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");

  console.log("DDrivers.....", drivers);

  //add truck
  const handleAddTruck = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("api/trucks/", {
        truck_no: truckNo,
        type: type,
        driver: person,
        last_maintenance: maintenanceDate,
        next_due: dueDate,
        status: status,
      });
      console.log(truckNo, type, person, maintenanceDate, dueDate, status);
      console.log("Added truck", res.data);
      toast.success("Truck Added Successfully");
      setTruckNo("");
      setPerson("");
      setStatus("");
      setType("");
      setDueDate("");
      setMaintenanceDate("");
    } catch (e) {
      console.log(e);
      toast.error("Error adding Truck!!");
    }
  };
  return (
    <div id="truck-modal" className="modal fade" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Add Truck</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label>Vehicle No</label>
                <input
                  type="text"
                  className="form-control"
                  value={truckNo}
                  onChange={(e) => setTruckNo(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Type</label>
                <input
                  type="text"
                  className="form-control"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Driver</label>
                <select
                  className="form-select"
                  value={person}
                  onChange={(e) => setPerson(e.target.value)}
                >
                  <option value="">Select Driver</option>
                  {drivers.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label>Last Maintenance</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={maintenanceDate}
                  onChange={(e) => setMaintenanceDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Next Due</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value={""}>Select Status</option>
                  <option value={"onMaintenance"}>Maintenance</option>
                  <option value={"isGood"}>Good Condition</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddTruck}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTruck;
