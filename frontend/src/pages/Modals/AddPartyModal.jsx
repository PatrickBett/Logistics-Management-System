import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import { AdminContext } from "../../contexts/AdminContext";
function AddPartyModal() {
  const { setParties } = useContext(AdminContext);

  const [partyName, setPartyName] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [totalvol, setTotalVol] = useState("");
  const [voltransported, setVolTransported] = useState(0);
  const [price, setPrice] = useState("");
  const [pricepaid, setPricePaid] = useState("");
  const [status, setStatus] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    console.log({ partyName, contact, phone, email });
    try {
      const res = await api.post("api/parties/", {
        name: partyName,
        contact_person: contact,
        phone,
        email,
        status,
        total_vol: totalvol,
        voltransported,
        price,
        pricepaid,
      });

      const newParty = res.data;
      setParties((prev) => [newParty, ...prev]);

      toast.success("Party Added Successfully");
      setPartyName("");
      setContact("");
      setPhone("");
      setEmail("");
      setTotalVol("");
      setVolTransported("");
      setPrice("");
      setPricePaid("");
      setStatus("");
    } catch (e) {
      toast.error("Error Adding Party");
    }
  };

  return (
    <div
      className="modal fade"
      id="party-modal"
      tabIndex="-1"
      aria-labelledby="partyModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Party</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Party Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={partyName}
                  onChange={(e) => setPartyName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contact Person</label>
                <input
                  type="text"
                  className="form-control"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
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
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Total Volume</label>
                <input
                  type="number"
                  className="form-control"
                  value={totalvol}
                  onChange={(e) => setTotalVol(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Weight Transported</label>
                <input
                  type="number"
                  className="form-control"
                  value={voltransported}
                  onChange={(e) => setVolTransported(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Price Paid</label>
                <input
                  type="number"
                  className="form-control"
                  value={pricepaid}
                  onChange={(e) => setPricePaid(e.target.value)}
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
                  <option value="isActive">Active</option>
                  <option value="isNotActive">Not Active</option>
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
              onClick={handleSave}
            >
              Save Party
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPartyModal;
