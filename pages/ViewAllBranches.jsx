import React, { useEffect, useState } from "react";
import "../App.css";

export default function ViewAllBranches() {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [branches, setBranches] = useState([]);
  const [loadingBanks, setLoadingBanks] = useState(true);
  const [loadingBranches, setLoadingBranches] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  // STEP 1 — Fetch banks on mount
  useEffect(() => {
    async function fetchBanks() {
      try {
        const res = await fetch("http://localhost:5000/api/banks");
        const data = await res.json();
        setBanks(data);
      } catch (err) {
        console.error("Error fetching banks:", err);
      } finally {
        setLoadingBanks(false);
      }
    }

    fetchBanks();
  }, []);

  // STEP 2 — When bank selected, fetch its branches
  const handleBankSelect = async (bankName) => {
    setSelectedBank(bankName);
    setBranches([]);
    setLoadingBranches(true);
    setCurrentPage(1);

    try {
      const res = await fetch(`http://localhost:5000/api/banks/${bankName}/branches`);
      const data = await res.json();
      setBranches(data);
    } catch (err) {
      console.error("Error fetching branches:", err);
    } finally {
      setLoadingBranches(false);
    }
  };

  // Pagination Logic
  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentBranches = branches.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(branches.length / ITEMS_PER_PAGE);

  return (
    <div className="container my-5">

      <h2 className="fw-bold mb-4 text-center">View Bank Branches</h2>

      {/* Bank Selection */}
      <div className="mb-4 text-center">
        {loadingBanks ? (
          <p>Loading banks...</p>
        ) : (
          <select
            className="form-select w-50 mx-auto"
            value={selectedBank}
            onChange={(e) => handleBankSelect(e.target.value)}
          >
            <option value="">Select a bank</option>
            {banks.map((bank, index) => (
              <option key={index} value={bank.bankName}>
                {bank.bankName}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Branch Table */}
      <div>
        {loadingBranches && <p className="text-center">Loading branches...</p>}

        {!loadingBranches && selectedBank && branches.length === 0 && (
          <p className="text-center">No branches available for this bank.</p>
        )}

        {!loadingBranches && currentBranches.length > 0 && (
          <div className="table-responsive">
            <table className="table table-hover shadow-sm branches-table">
              <thead className="table-dark">
                <tr>
                  {Object.keys(currentBranches[0]).map((key, idx) => (
                    <th key={idx} className="text-capitalize">
                      {key.replace(/_/g, " ")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentBranches.map((branch, idx) => (
                  <tr key={idx}>
                    {Object.keys(branch).map((field, fIdx) => (
                      <td key={fIdx}>{branch[field]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Buttons */}
      {branches.length > ITEMS_PER_PAGE && (
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
    </div>
  );
}
