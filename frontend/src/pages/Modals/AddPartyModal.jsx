import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api";
import { AdminContext } from "../../contexts/AdminContext";
import {
  MdBusiness,
  MdPerson,
  MdPhone,
  MdEmail,
  MdBarChart,
  MdAttachMoney,
} from "react-icons/md";
import { withFilter } from "vite";

function AddPartyModal() {
  const { setParties } = useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    partyName: "",
    contact: "",
    phone: "",
    email: "",
    totalvol: "",
    voltransported: 0,
    price: "",
    pricepaid: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("api/parties/", {
        name: formData.partyName,
        contact_person: formData.contact,
        phone: formData.phone,
        email: formData.email,
        status: formData.status,
        total_vol: formData.totalvol,
        voltransported: formData.voltransported,
        price: formData.price,
        pricepaid: formData.pricepaid,
      });

      setParties((prev) => [res.data, ...prev]);
      toast.success("New Client Added Successfully");

      // Reset form
      setFormData({
        partyName: "",
        contact: "",
        phone: "",
        email: "",
        totalvol: "",
        voltransported: 0,
        price: "",
        pricepaid: "",
        status: "",
      });
    } catch (e) {
      toast.error("Error adding party.");
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
    label: {
      fontSize: "0.8rem",
      fontWeight: "700",
      color: "#2B3674",
      marginBottom: "8px",
      display: "block",
    },
    sectionDivider: {
      fontSize: "0.7rem",
      fontWeight: "800",
      color: "#A3AED0",
      textTransform: "uppercase",
      letterSpacing: "1px",
      margin: "20px 0 15px 0",
      borderBottom: "1px solid #F4F7FE",
      paddingBottom: "5px",
    },
    input: {
      borderRadius: "12px",
      backgroundColor: "#F4F7FE",
      border: "1px solid #E0E5F2",
      padding: "10px 15px",
      fontSize: "0.9rem",
    },
    saveBtn: {
      backgroundColor: "#1a839a",
      borderRadius: "12px",
      padding: "10px 25px",
      fontWeight: "600",
      border: "none",
    },
  };

  return (
    <div
      className="modal fade"
      id="party-modal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content" style={styles.modalContent}>
          <div className="modal-header border-0 p-4">
            <h5 className="fw-bold mb-0" style={{ color: "#2B3674" }}>
              Register New Client (Party)
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div className="modal-body px-4 pt-0">
            <form onSubmit={handleSave}>
              {/* CONTACT SECTION */}
              <div style={styles.sectionDivider}>Contact Details</div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label style={styles.label}>Company/Party Name</label>
                  <input
                    name="partyName"
                    type="text"
                    className="form-control"
                    style={styles.input}
                    value={formData.partyName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={styles.label}>Contact Person</label>
                  <input
                    name="contact"
                    type="text"
                    className="form-control"
                    style={styles.input}
                    value={formData.contact}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label style={styles.label}>Phone Number</label>
                  <input
                    name="phone"
                    type="text"
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

              {/* LOGISTICS SECTION */}
              <div style={styles.sectionDivider}>Logistics & Volume</div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label style={styles.label}>Total Contract Vol</label>
                  <input
                    name="totalvol"
                    type="number"
                    className="form-control"
                    style={styles.input}
                    value={formData.totalvol}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-4 mb-3">
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
                <div className="col-md-4 mb-3">
                  <label style={styles.label}>Relationship Status</label>
                  <select
                    name="status"
                    className="form-select"
                    style={styles.input}
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="">Select Status</option>
                    <option value="isActive">Active Client</option>
                    <option value="isNotActive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* BILLING SECTION */}
              <div style={styles.sectionDivider}>Financials</div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label style={styles.label}>Total Contract Price</label>
                  <div className="input-group">
                    <span
                      className="input-group-text bg-transparent border-end-0"
                      style={{ borderRadius: "12px 0 0 12px" }}
                    >
                      $
                    </span>
                    <input
                      name="price"
                      type="number"
                      className="form-control border-start-0"
                      style={{ ...styles.input, borderRadius: "0 12px 12px 0" }}
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label style={styles.label}>Total Amount Paid</label>
                  <div className="input-group">
                    <span
                      className="input-group-text bg-transparent border-end-0"
                      style={{ borderRadius: "12px 0 0 12px" }}
                    >
                      $
                    </span>
                    <input
                      name="pricepaid"
                      type="number"
                      className="form-control border-start-0"
                      style={{ ...styles.input, borderRadius: "0 12px 12px 0" }}
                      value={formData.pricepaid}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer border-0 px-0 mt-3">
                <button
                  type="button"
                  className="btn btn-light px-4"
                  data-bs-dismiss="modal"
                  style={{ borderRadius: "10px" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  
                  style={styles.saveBtn}
                  disabled={isLoading}
                >
                  {isLoading ? "Adding..." : "Save Party"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPartyModal;
