import React, { useEffect, useState } from "react";
import "../App.css";

export default function ViewAllBanks() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  // Fetch all banks
  useEffect(() => {
    async function fetchBanks() {
      try {
        const res = await fetch("http://localhost:5000/api/banks");
        const data = await res.json();
        setBanks(data);
      } catch (err) {
        console.error("Error fetching banks:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBanks();
  }, []);

  // Pagination
  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentBanks = banks.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(banks.length / ITEMS_PER_PAGE);

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4 text-center">All Banks in Database</h2>

      {loading ? (
        <p className="text-center">Loading banks...</p>
      ) : banks.length === 0 ? (
        <p className="text-center">No banks available in the database.</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-hover shadow-sm banks-table">
              <thead className="table-dark">
                <tr>
                  {Object.keys(currentBanks[0]).map((key, idx) => (
                    <th key={idx} className="text-capitalize">
                      {key.replace(/_/g, " ")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentBanks.map((bank, idx) => (
                  <tr key={idx}>
                    {Object.keys(bank).map((field, fIdx) => (
                      <td key={fIdx}>{bank[field]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Buttons */}
          {banks.length > ITEMS_PER_PAGE && (
            <div className="pagination-controls text-center mt-3">
              <button
                className="btn btn-secondary mx-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Previous
              </button>

              <span className="mx-3 fw-bold">
                Page {currentPage} of {totalPages}
              </span>

              <button
                className="btn btn-secondary mx-2"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
