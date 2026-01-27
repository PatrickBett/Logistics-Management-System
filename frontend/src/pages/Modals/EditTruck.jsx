import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../contexts/AdminContext";

function EditTruck({ truck, handleEditTruck }) {
  const [truckNo, setTruckNo] = useState("");
  const [type, setType] = useState("");
  const [driver, setDriver] = useState("");
  const [lastMaintenance, setLastMaintenance] = useState("");
  const [nextDue, setNextDue] = useState("");
  const [status, setStatus] = useState("");

  const { drivers } = useContext(AdminContext);

  const handleUpdateTruck = () => {
    handleEditTruck({
      id: truck.id,
      truck_no: truckNo,
      type,
      driver,
      last_maintenance: lastMaintenance,
      next_due: nextDue,
      status,
    });
  };
  useEffect(() => {
    if (truck) {
      setTruckNo(truck.truck_no);
      setType(truck.type);
      setDriver(truck.driver);
      setLastMaintenance(
        truck.last_maintenance ? truck.last_maintenance.slice(0, 16) : "",
      );
      setNextDue(truck.next_due ? truck.next_due.slice(0, 16) : "");
      setStatus(truck.status);
    }
  }, [truck]);

  return (
    <div className="modal fade" id="edit-truck-modal" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Edit Truck</h5>
            <button
              type="button"
              data-bs-dismiss="modal"
              className="btn-close"
            />
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label>Truck No</label>
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
                  className="form-control"
                  value={driver}
                  onChange={(e) => setDriver(e.target.value)}
                >
                  <option value={""}>Select driver</option>
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
                  value={lastMaintenance}
                  onChange={(e) => setLastMaintenance(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Next Due</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={nextDue}
                  onChange={(e) => setNextDue(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Status</label>
                <select
                  className="form-control"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value={""}>Select status</option>
                  <option value="isGood">Good Condition</option>
                  <option value="onMaintenance">On Maintenance</option>
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
              onClick={handleUpdateTruck}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTruck;
