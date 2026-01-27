import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import AddDriver from "../Modals/AddDriver";
import api from "../../api";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import EditDriver from "../Modals/EditDriver";
import { AdminContext } from "../../contexts/AdminContext";

function Drivers() {
  const {
    drivers,
    isLoading,
    setIsLoading,
    isEditingDriver,
    setEditingDriver,
    fetchDrivers,
    setDrivers,
    handleEdit,
    handleAddDriver,
    handleDelete,
  } = useContext(AdminContext);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Optional: scroll to top of table when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate indexes for slicing
  const driversPerPage = 7;
  const totalPages = Math.ceil(drivers.length / driversPerPage);
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;

  // Slice the array to get only the drivers for current page
  const currentDrivers = drivers.slice(indexOfFirstDriver, indexOfLastDriver);

  return (
    <>
      <div className="mx-auto">
        <div className="row p-2 align-items-center">
          <div className="col">
            <h2 className="m-0">Drivers Management</h2>
          </div>
          <div className="col text-end">
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#driver-modal"
            >
              <FaPlus className="me-2" /> Driver
            </button>
          </div>
        </div>

        <div className="table-responsive ">
          <table className="table table-bordered mx-2">
            <thead>
              <tr>
                <th>License No</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Trips</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentDrivers.length > 0 ? (
                currentDrivers.map((driver) => (
                  <tr key={driver.id}>
                    <td>{driver.license_no}</td>
                    <td>{driver.name}</td>
                    <td>{driver.phone}</td>
                    <td>{driver.email}</td>
                    <td>{driver.trips}</td>
                    <td>{driver.status}</td>
                    <td className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-driver-modal"
                        onClick={() => setEditingDriver(driver)}
                      >
                        <MdModeEdit />
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(driver.id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center" colSpan={7}>
                    No Driver
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <nav>
          <ul className="pagination ">
            {[...Array(totalPages)].map((_, idx) => (
              <li
                key={idx}
                className={`page-item ${currentPage === idx + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(idx + 1)}
                >
                  {idx + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <AddDriver handleAddDriver={handleAddDriver} />
      <EditDriver handleEdit={handleEdit} driver={isEditingDriver} />
    </>
  );
}

export default Drivers;
