import React from 'react'
import { useState } from 'react';

function Pagination() {
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
    </>
  );
}

export default Pagination
