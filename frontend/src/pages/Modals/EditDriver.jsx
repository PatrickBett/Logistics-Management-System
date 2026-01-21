import React from "react";
import { useState, useEffect } from "react";

function EditDriver({ driver, handleEdit, toDateTimeLocal }) {
  console.log("Driver Id:", driver);
  const [license_no, setLicenseNo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [trips, setTrips] = useState(0);
  const [status, setStatus] = useState("");
  const [leaveDate, setLeaveDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdateClick = () => {
    handleEdit({
      id: driver.id,
      license_no,
      name,
      phone,
      email,
      trips,
      status,
      leave_date: leaveDate,
      return_date: returnDate,
    });
  };

  useEffect(() => {
    if (driver) {
      setLicenseNo(driver.license_no);
      setName(driver.name);
      setPhone(driver.phone);
      setEmail(driver.email);
      setTrips(driver.trips);
      setStatus(driver.status);
      setLeaveDate(toDateTimeLocal(driver.leave_date));
      setReturnDate(toDateTimeLocal(driver.return_date));
    }
  }, [driver]);
  return (
    <div className="modal fade" id="edit-driver-modal" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Update Driver</h5>
            <button
              type="button"
              data-bs-dismiss="modal"
              className="btn-close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-2">
                <label className="form-label">License No</label>
                <input
                  type="text"
                  className="form-control"
                  value={license_no}
                  onChange={(e) => setLicenseNo(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Trips</label>
                <input
                  type="number"
                  className="form-control"
                  value={trips}
                  onChange={(e) => setTrips(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="isAvailable">Available</option>
                  <option value="onDuty">On Duty</option>
                  <option value="onLeave">On Leave</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="form-label">Leave Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={leaveDate}
                  onChange={(e) => setLeaveDate(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Return Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={returnDate}
                  readOnly
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
              onClick={handleUpdateClick}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditDriver;
