import React from "react";
import { FaPlus } from "react-icons/fa";
import AddPartyModal from "../Modals/AddPartyModal";

function Parties() {
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
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact Person</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Total Volume</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Chandaria Limited Company</td>
                <td>Shadrack Malel</td>
                <td>0791474734</td>
                <td>chandarialimited@gmail.com</td>
                <td>24000 tonnes</td>
                <td>Active</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Party Modal */}
      <AddPartyModal />
    </>
  );
}

export default Parties;
