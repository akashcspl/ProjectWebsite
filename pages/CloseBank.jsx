import React, { useEffect, useState } from "react";
import "../App.css";

export default function CloseBank() {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmation, setConfirmation] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch all banks on mount
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

  // Fetch branches when a bank is selected
  useEffect(() => {
    if (!selectedBank) {
      setBranches([]);
      return;
    }

    async function fetchBranches() {
      try {
        const res = await fetch(`http://localhost:5000/api/banks/${selectedBank}/branches`);
        const data = await res.json();
        setBranches(data);
      } catch (err) {
        console.error("Error fetching branches:", err);
      }
    }

    fetchBranches();
  }, [selectedBank]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBank) {
      setMessage("Please select a bank to close.");
      return;
    }

    const userConfirmed = window.confirm(
      `Are you sure you want to close the bank "${selectedBank}" and remove all its branches?`
    );

    if (!userConfirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/api/banks/${selectedBank}/close`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Failed to close bank.");

      setMessage(`Bank "${selectedBank}" has been successfully closed.`);
      setSelectedBank("");
      setBranches([]);
    } catch (err) {
      console.error(err);
      setMessage("An error occurred while closing the bank.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Close a Bank</h2>

      {loading ? (
        <p className="text-center">Loading banks...</p>
      ) : banks.length === 0 ? (
        <p className="text-center">No banks available to close.</p>
      ) : (
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="bankSelect" className="form-label fw-bold">
              Select Bank
            </label>
            <select
              id="bankSelect"
              className="form-select"
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              required
            >
              <option value="">-- Select a Bank --</option>
              {banks.map((bank, idx) => (
                <option key={idx} value={bank.name}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>

          {branches.length > 0 && (
            <div className="mb-3">
              <label className="form-label fw-bold">Branches to be removed:</label>
              <ul>
                {branches.map((branch, idx) => (
                  <li key={idx}>{branch.name}</li>
                ))}
              </ul>
            </div>
          )}

          <button type="submit" className="btn btn-danger">
            Close Bank
          </button>

          {message && <p className="mt-3 fw-bold text-center">{message}</p>}
        </form>
      )}
    </div>
  );
}
