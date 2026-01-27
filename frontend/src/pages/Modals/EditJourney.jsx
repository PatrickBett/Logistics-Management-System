import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../contexts/AdminContext";

function EditJourney({ handleEditJourney, journey }) {
  const { trucks, parties, drivers } = useContext(AdminContext);
  const [driver, setDriver] = useState("");
  const [truck, setTruck] = useState("");
  const [party, setParty] = useState("");
  const [startingPoint, setStartingPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleClickEditJourney = () => {
    handleEditJourney({
      id: journey.id,
      driver,
      truck,
      party,
      startingpoint: startingPoint,
      destination,
      cost,
      description,
      status,
    });
  };
  useEffect(() => {
    if (journey) {
      setDriver(journey.driver);
      setTruck(journey.truck);
      setParty(journey.party);
      setStartingPoint(journey.startingpoint);
      setDestination(journey.destination);
      setCost(journey.cost);
      setDescription(journey.description);
      setStatus(journey.status);
    }
  }, [journey]);
  return (
    <div className="modal fade" role="dialog" id="edit-journey-modal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Edit Journey</h5>
            <button
              type="button"
              className="btn btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label>Driver</label>
                <select
                  className="form-control"
                  value={driver}
                  onChange={(e) => setDriver(e.target.value)}
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
                <label>Truck</label>
                <select
                  className="form-control"
                  value={truck}
                  onChange={(e) => setTruck(e.target.value)}
                >
                  <option value="">Select Truck</option>
                  {trucks.map((truck) => (
                    <option key={truck.id} value={truck.id}>
                      {truck.truck_no}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label>Party</label>
                <select
                  className="form-control"
                  value={party}
                  onChange={(e) => setParty(e.target.value)}
                >
                  <option value="">Select Party</option>
                  {parties.map((party) => (
                    <option key={party.id} value={party.id}>
                      {party.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label>Starting Point</label>
                <input
                  type="text"
                  className="form-control"
                  value={startingPoint}
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
                  value={cost}
                  className="form-control"
                  onChange={(e) => setCost(e.target.value)}
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
                  className="form-control"
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                >
                  <option value="">Select Status</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="inprogress">In Progress</option>
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
              onClick={handleClickEditJourney}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditJourney;
