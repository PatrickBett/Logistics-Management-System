import React from "react";
import api from "../../api";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "../../contexts/AdminContext";

function AddJourney() {
  const { drivers, trucks, parties, setJourneys } = useContext(AdminContext);
  const [driver, setDriver] = useState("");
  const [truck, setTruck] = useState("");
  const [party, setParty] = useState("");
  const [startingpoint, setStartingPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [cost, setCost] = useState(0);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const addJourney = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("api/journeys/", {
        driver,
        truck,
        party,
        startingpoint,
        destination,
        cost,
        description,
        status,
      });
      console.log(res.data);
      const newJourney = res.data;
      setJourneys((prev) => [newJourney, ...prev]); // Add new journey to the list

      toast.success("Journey Added Successfull");
      (setDriver(""),
        setTruck(""),
        setParty(""),
        setStartingPoint(""),
        setDestination(""),
        setCost(0),
        setDescription(""),
        setStatus(""));
    } catch (e) {
      toast.error("Error Adding Journey");
      console.log(e);
    }
  };
  return (
    <div id="journey-modal" className="modal fade" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Add Journey</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label>Driver</label>
                <select
                  className="form-select"
                  value={driver}
                  onChange={(e) => setDriver(e.target.value)}
                >
                  <option value="">Select Driver</option>
                  {drivers.length > 0
                    ? drivers.map((driver) => (
                        <option key={driver.id} value={driver.id}>
                          {driver.name}
                        </option>
                      ))
                    : ""}
                </select>
              </div>
              <div className="mb-3">
                <label>Truck</label>
                <select
                  className="form-select"
                  value={truck}
                  onChange={(e) => setTruck(e.target.value)}
                >
                  <option value="">Select Truck</option>
                  {trucks.length > 0
                    ? trucks.map((truck) => (
                        <option key={truck.id} value={truck.id}>
                          {truck.truck_no}
                        </option>
                      ))
                    : ""}
                </select>
              </div>
              <div className="mb-3">
                <label>Party</label>
                <select
                  className="form-select"
                  value={party}
                  onChange={(e) => setParty(e.target.value)}
                >
                  <option value="">Select Party</option>
                  {parties.length > 0
                    ? parties.map((party) => (
                        <option key={party.id} value={party.id}>
                          {party.name}
                        </option>
                      ))
                    : ""}
                </select>
              </div>
              <div className="mb-3">
                <label>Starting point</label>
                <input
                  type="text"
                  className="form-control"
                  value={startingpoint}
                  onChange={(e) => setStartingPoint(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Destination</label>
                <input
                  type="text"
                  className="form-control"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Cost</label>
                <input
                  type="number"
                  className="form-control"
                  value={cost}
                  onChange={(e) => setCost(Number(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <label>Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="inprogress">InProgress</option>
                  <option value="shipping">Shipping</option>
                  <option value="delivered">Delivered</option>
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
              onClick={addJourney}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddJourney;
