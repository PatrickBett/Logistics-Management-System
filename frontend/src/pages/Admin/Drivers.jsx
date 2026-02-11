import React, { useContext, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdModeEdit, MdDelete } from "react-icons/md";

import AddDriver from "../Modals/AddDriver";
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
  console.log("Drivers", drivers);

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [searchQuery, setSearchQuery] = useState(""); // <-- Search state

  // Filter drivers based on search query
  const filteredDrivers = useMemo(() => {
    return drivers
      .filter((driver) => {
        const license = driver.license_no?.toLowerCase() || "";
        const name = driver.name?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();
        return license.includes(query) || name.includes(query);
      })
      .filter((driver) => {
        if (filter === "onLeave") {
          return driver.status === "onLeave";
        } else if (filter === "available") {
          return driver.status === "isAvailable";
        } else if (filter === "onduty") {
          return driver.status === "onDuty";
        }
        return true;
      });
  }, [searchQuery, drivers, filter]);

  // Pagination logic
  const driversPerPage = 6;
  const totalPages = Math.ceil(filteredDrivers.length / driversPerPage);
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = filteredDrivers.slice(
    indexOfFirstDriver,
    indexOfLastDriver,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Optional scroll
  };

  return (
    <>
      <div className="mx-auto">
        {/* Header */}
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

        {/* Search input */}
        <div className="p-2 mb-3 input-group">
          <span className="input-group-text">🔍</span>
          <input
            type="search"
            className="form-control"
            placeholder="Search by license or name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // reset to first page on search
            }}
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
          {["all", "onLeave", "available", "onduty"].map((type) => (
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
                : type === "onLeave"
                  ? "On Leave"
                  : type === "onduty"
                    ? "On Duty"
                    : "Available"}
            </div>
          ))}
          <div className="col text-end">
            <button
              className="btn btn-outline-primary"
              onClick={() =>
                (window.location.href = `${API_BASE_URL}/api/drivers/download_csv/`)
              }
            >
              Download CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered mx-2">
            <thead>
              <tr>
                <th>ID</th>
                <th>License No</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Incomplete Trips</th>
                <th>Completed Trips</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentDrivers.length > 0 ? (
                currentDrivers.map((driver, index) => (
                  <tr key={driver.id}>
                    <td>{index + 1}</td>
                    <td>{driver.license_no}</td>
                    <td>{driver.name}</td>
                    <td>{driver.phone}</td>
                    <td>{driver.email}</td>
                    <td className="text-center">{driver.incomplete_trips}</td>
                    <td className="text-center">{driver.complete_trips}</td>

                    <td className="text-center">
                      {driver.status === "onLeave"
                        ? "Leave"
                        : driver.status === "onDuty"
                          ? "On Duty"
                          : "Available"}
                    </td>

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
                  <td className="text-center" colSpan={9}>
                    No matching drivers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav>
          <ul className="pagination">
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

      {/* Modals */}
      <AddDriver handleAddDriver={handleAddDriver} />
      <EditDriver handleEdit={handleEdit} driver={isEditingDriver} />
    </>
  );
}

export default Drivers;
