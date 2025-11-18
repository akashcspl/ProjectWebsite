import React, { useEffect, useState } from "react";
import "../App.css";

export default function ViewAllAccounts() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch data from your API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5000/api/your-endpoint");
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData();
  }, []);

  // Pagination logic
  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentRows = data.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Dynamically generate table headers
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center fw-bold">API Data Overview</h2>

      <div className="table-responsive">
        <table className="table table-striped table-hover shadow-sm custom-table">
          <thead className="table-dark">
            <tr>
              {headers.map((header, idx) => (
                <th key={idx} className="text-capitalize">
                  {header.replace(/_/g, " ")}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentRows.map((row, idx) => (
              <tr key={idx}>
                {headers.map((header, j) => (
                  <td key={j}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-outline-dark"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="fw-bold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-outline-dark"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
