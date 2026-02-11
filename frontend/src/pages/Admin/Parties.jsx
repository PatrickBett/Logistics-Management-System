import React, { useMemo } from "react";
import { FaPlus } from "react-icons/fa";
import AddPartyModal from "../Modals/AddPartyModal";
import { useState, useEffect, useContext } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import api from "../../api";
import { AdminContext } from "../../contexts/AdminContext";
import { toast } from "react-toastify";
import EditParty from "../Modals/EditParty";

function Parties() {
  const {
    parties,
    setParties,
    handleDeleteParty,
    isEditingParty,
    setEditingParty,
    handleEditParty,
  } = useContext(AdminContext);

  const [searchQuery, setSearchQuery] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [filter, setFilter] = useState("all"); // all, isactive, isnotactive

  const filteredParties = useMemo(() => {
    return parties
      .filter((party) => {
        const name = party.name?.toLowerCase() || "";
        const contactPerson = party.contact_person?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();
        return name.includes(query) || contactPerson.includes(query);
      })
      .filter((party) => {
        if (filter === "isactive") {
          return party.status === "isActive";
        } else if (filter === "isnotactive") {
          return party.status === "isNotActive";
        }
        return true;
      });
  }, [searchQuery, parties, filter]);
  return (
    <>
      <div>
        <div className="row p-2 align-items-center">
          <div className="col">
            <h2>Parties Management</h2>
          </div>
          <div className="col text-end">
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#party-modal"
            >
              <FaPlus className="me-2" />
              Party
            </button>
          </div>
        </div>
        <div className="p-2 mb-3 input-group">
          <span className="input-group-text">🔍</span>
          <input
            type="search"
            className="form-control"
            placeholder="Search by name or contact person..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* Filter Navbar */}
        <div
          style={{
            display: "flex",

            gap: "30px",
            marginBottom: "25px",
            borderBottom: "2px solid #e0e0e0", // bottom line for navbar
            paddingBottom: "10px",
          }}
        >
          {["all", "isactive", "isnotactive"].map((type) => (
            <div
              key={type}
              onClick={() => setFilter(type)}
              style={{
                cursor: "pointer",
                fontWeight: "600",
                paddingBottom: "5px",
                color: filter === type ? "#1a839a" : "#555",
                borderBottom:
                  filter === type
                    ? "3px solid #1a839a"
                    : "3px solid transparent",
                transition: "0.3s",
              }}
            >
              {type === "all"
                ? "All"
                : type === "isactive"
                  ? "Active"
                  : "Inactive"}
            </div>
          ))}
          <div className="col text-end">
            <button
              className="btn btn-outline-primary"
              onClick={() =>
                (window.location.href = `${API_BASE_URL}/api/parties/download_csv/`)
              }
            >
              Download CSV
            </button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Name</th>
                <th>Contact Person</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Weight to be transported</th>
                <th>Transported Weight</th>
                <th>Total Price</th>
                <th>Price Paid</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredParties.length > 0 ? (
                filteredParties.map((party, index) => (
                  <tr key={party.id}>
                    <td>{index + 1}</td>
                    <td>{party.name}</td>
                    <td>{party.contact_person}</td>
                    <td>{party.phone}</td>
                    <td>{party.email}</td>
                    <td className="text-center">{party.total_vol} Kgs</td>
                    <td className="text-center">{party.voltransported} Kgs</td>
                    <td className="text-center">{party.price} KES</td>
                    <td className="text-center">{party.pricepaid} KES</td>
                    <td>
                      {party.status == "isActive" ? "Active" : "Inactive"}
                    </td>
                    <td className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-party-modal"
                        onClick={() => {
                          setEditingParty(party);
                          console.log(isEditingParty);
                        }}
                      >
                        <MdModeEdit />
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteParty(party.id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="text-center">
                    No Party Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Party Modal */}
      <AddPartyModal />
      <EditParty party={isEditingParty} handleEditParty={handleEditParty} />
    </>
  );
}

export default Parties;
