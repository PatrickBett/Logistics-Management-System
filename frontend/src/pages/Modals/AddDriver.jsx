import React from "react";
import { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
function AddDriver({ handleAddDriver }) {
  const [license_no, setLicenseNo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [trips, setTrips] = useState(0);
  const [incomplete_trips, setIncompleteTrips] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("api/drivers/", {
        license_no: license_no,
        name: name,
        phone: phone,
        email: email,
        complete_trips: trips,
        incomplete_trips: incomplete_trips,
      });
      const newDriver = response.data;
      handleAddDriver(newDriver);

      toast.success("Driver Added Successfully");
      console.log(response.data);
      setLicenseNo("");
      setName("");
      setPhone("");
      setEmail("");
      setTrips(0);
      setIncompleteTrips(0);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal fade" id="driver-modal" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Add Driver</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">License No</label>
                <input
                  type="text"
                  className="form-control"
                  value={license_no}
                  onChange={(e) => setLicenseNo(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Incomplete Trips</label>
                <input
                  type="number"
                  className="form-control"
                  value={incomplete_trips}
                  onChange={(e) => setIncompleteTrips(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Trips</label>
                <input
                  type="number"
                  className="form-control"
                  value={trips}
                  onChange={(e) => setTrips(e.target.value)}
                />
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
              onClick={handleSave}
            >
              {isLoading ? "Saving..." : "Save Driver"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDriver;
