import React, { useEffect, useState } from "react";
import "../App.css";

export default function CloseBranch() {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all banks on mount
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/banks");
        const data = await res.json();
        setBanks(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBanks();
  }, []);

  // Fetch branches when a bank is selected
  useEffect(() => {
    if (selectedBank) {
      const bank = banks.find((b) => b.name === selectedBank);
      setBranches(bank ? bank.branches : []);
      setSelectedBranch("");
    }
  }, [selectedBank, banks]);

  const handleCloseBranch = async () => {
    if (!selectedBank || !selectedBranch) {
      setMessage("Please select both a bank and a branch.");
      return;
    }

    const confirmClose = window.confirm(
      `Are you sure you want to close the branch "${selectedBranch}" of "${selectedBank}"?`
    );
    if (!confirmClose) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `http://localhost:5000/api/banks/${selectedBank}/branches/${selectedBranch}/close`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) throw new Error("Failed to close branch.");

      setMessage(`Branch "${selectedBranch}" of "${selectedBank}" closed successfully!`);
      setSelectedBranch("");
    } catch (err) {
      console.error(err);
      setMessage("An error occurred while closing the branch.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Close a Bank Branch</h2>
      <div className="close-branch-form mx-auto p-4">
        <div className="mb-3">
          <label htmlFor="bankSelect" className="form-label fw-bold">
            Select Bank
          </label>
          <select
            id="bankSelect"
            className="form-select"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
          >
            <option value="">--Select Bank--</option>
            {banks.map((bank) => (
              <option key={bank.name} value={bank.name}>
                {bank.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="branchSelect" className="form-label fw-bold">
            Select Branch
          </label>
          <select
            id="branchSelect"
            className="form-select"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            disabled={!selectedBank}
          >
            <option value="">--Select Branch--</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn btn-danger w-100"
          onClick={handleCloseBranch}
          disabled={loading}
        >
          {loading ? "Closing..." : "Close Branch"}
        </button>

        {message && <p className="mt-3 fw-bold text-center">{message}</p>}
      </div>
    </div>
  );
}
