import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../contexts/AdminContext";

function EditParty({ party, handleEditParty }) {
  const { parties } = useContext(AdminContext);

  const [name, setName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [totalVol, setTotalVol] = useState("");
  const [voltransported, setVolTransported] = useState(0);
  const [price, setPrice] = useState("");
  const [pricepaid, setPricePaid] = useState("");

  const handleClickEditParty = () => {
    handleEditParty({
      id: party.id,
      name,
      contact_person: contactPerson,
      phone,
      email,
      status,
      total_vol: totalVol,
      voltransported,
      price,
      pricepaid,
    });
    console.log(
      "Edited info",

      name,
      contactPerson,
      phone,
      email,
      status,
      price,
      totalVol,
    );
  };
  useEffect(() => {
    if (party) {
      setName(party.name);
      setContactPerson(party.contact_person);
      setPhone(party.phone);
      setEmail(party.email);
      setStatus(party.status);
      setTotalVol(party.total_vol);
      setVolTransported(party.voltransported);
      setPricePaid(party.pricepaid);
      setPrice(party.price);
    }
  }, [party]);

  return (
    <div className="modal fade" id="edit-party-modal" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Edit Party</h5>
            <button
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label>Name</label>
                <input
                  className="form-control"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label>Contact Person</label>
                <input
                  className="form-control"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Phone</label>
                <input
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Total Volume</label>
                <input
                  className="form-control"
                  value={totalVol}
                  onChange={(e) => setTotalVol(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Volume Transported</label>
                <input
                  className="form-control"
                  value={voltransported}
                  onChange={(e) => setVolTransported(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Price</label>
                <input
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Price Paid</label>
                <input
                  className="form-control"
                  value={pricepaid}
                  onChange={(e) => setPricePaid(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Status</label>
                <select
                  value={status}
                  className="form-control"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="" className="form-select">
                    Select Status
                  </option>
                  <option value="isActive" className="form-select">
                    Active
                  </option>
                  <option value="isNotActive" className="form-select">
                    InActive
                  </option>
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
              onClick={handleClickEditParty}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditParty;
