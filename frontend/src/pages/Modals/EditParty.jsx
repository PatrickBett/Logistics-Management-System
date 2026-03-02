import React, { useEffect, useState } from "react";
import {
  MdBusiness,
  MdContactPhone,
  MdBarChart,
  MdAttachMoney,
} from "react-icons/md";

function EditParty({ party, handleEditParty }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    status: "",
    totalVol: "",
    voltransported: 0,
    price: "",
    pricepaid: "",
  });

  useEffect(() => {
    if (party) {
      setFormData({
        name: party.name || "",
        contactPerson: party.contact_person || "",
        phone: party.phone || "",
        email: party.email || "",
        status: party.status || "",
        totalVol: party.total_vol || "",
        voltransported: party.voltransported || 0,
        price: party.price || "",
        pricepaid: party.pricepaid || "",
      });
    }
  }, [party]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onUpdate = async () => {
    setIsUpdating(true);
    try {
      await handleEditParty({
        id: party.id,
        name: formData.name,
        contact_person: formData.contactPerson,
        phone: formData.phone,
        email: formData.email,
        status: formData.status,
        total_vol: formData.totalVol,
        voltransported: formData.voltransported,
        price: formData.price,
        pricepaid: formData.pricepaid,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const styles = {
    modalContent: {
      borderRadius: "20px",
      border: "none",
      boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
    },
    header: {
      backgroundColor: "#F4F7FE",
      borderBottom: "none",
      padding: "24px",
    },
    label: {
      fontSize: "0.75rem",
      fontWeight: "700",
      color: "#2B3674",
      marginBottom: "5px",
      display: "block",
    },
    input: {
      borderRadius: "10px",
      border: "1px solid #E0E5F2",
      padding: "10px",
      fontSize: "0.9rem",
    },
    metricCard: {
      backgroundColor: "#F8F9FD",
      borderRadius: "12px",
      padding: "15px",
      border: "1px solid #F1F4F9",
    },
  };

  return (
    <div
      className="modal fade"
      id="edit-party-modal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content" style={styles.modalContent}>
          <div
            className="modal-header d-flex align-items-center"
            style={styles.header}
          >
            <div className="p-2 bg-success rounded-3 text-white me-3 d-flex align-items-center">
              <MdBusiness size={24} />
            </div>
            <h5 className="modal-title fw-bold" style={{ color: "#2B3674" }}>
              Client Relations Profile
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body p-4">
            <form>
              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: "800",
                  color: "#A3AED0",
                  letterSpacing: "1px",
                  marginBottom: "15px",
                }}
              >
                CORE IDENTITY & CONTACT
              </div>
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <label style={styles.label}>Company Name</label>
                  <input
                    name="name"
                    className="form-control"
                    style={styles.input}
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={styles.label}>Primary Liaison</label>
                  <input
                    name="contactPerson"
                    className="form-control"
                    style={styles.input}
                    value={formData.contactPerson}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={styles.label}>Phone Number</label>
                  <input
                    name="phone"
                    className="form-control"
                    style={styles.input}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={styles.label}>Email Address</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    style={styles.input}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div
                style={{
                  fontSize: "0.65rem",
                  fontWeight: "800",
                  color: "#A3AED0",
                  letterSpacing: "1px",
                  marginBottom: "15px",
                }}
              >
                CONTRACTUALS & VOLUME
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div style={styles.metricCard} className="mb-3">
                    <div className="d-flex align-items-center mb-2 text-primary">
                      <MdBarChart className="me-1" />{" "}
                      <span className="small fw-bold">Load Metrics</span>
                    </div>
                    <div className="mb-2">
                      <label style={styles.label}>Total Contracted Vol</label>
                      <input
                        name="totalVol"
                        type="number"
                        className="form-control"
                        style={styles.input}
                        value={formData.totalVol}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label style={styles.label}>Already Transported</label>
                      <input
                        name="voltransported"
                        type="number"
                        className="form-control"
                        style={styles.input}
                        value={formData.voltransported}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div style={styles.metricCard} className="mb-3">
                    <div className="d-flex align-items-center mb-2 text-success">
                      <MdAttachMoney className="me-1" />{" "}
                      <span className="small fw-bold">Billing Status</span>
                    </div>
                    <div className="mb-2">
                      <label style={styles.label}>Agreed Price</label>
                      <input
                        name="price"
                        type="number"
                        className="form-control"
                        style={styles.input}
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label style={styles.label}>Amount Paid to Date</label>
                      <input
                        name="pricepaid"
                        type="number"
                        className="form-control"
                        style={styles.input}
                        value={formData.pricepaid}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <label style={styles.label}>Partnership Status</label>
                <select
                  name="status"
                  className="form-select"
                  style={styles.input}
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="">Choose Status</option>
                  <option value="isActive">Active Partner</option>
                  <option value="isNotActive">Inactive / Lead</option>
                </select>
              </div>
            </form>
          </div>

          <div className="modal-footer border-0 p-4">
            <button
              type="button"
              className="btn btn-light px-4"
              data-bs-dismiss="modal"
              style={{ borderRadius: "12px" }}
            >
              Discard
            </button>
            <button
              type="button"
              className="btn btn-primary px-4 shadow"
              style={{
                borderRadius: "12px",
                backgroundColor: "#05CD99",
                border: "none",
              }}
              onClick={onUpdate}
              disabled={isUpdating}
            >
              {isUpdating ? "Processing..." : "Sync Profile"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditParty;
