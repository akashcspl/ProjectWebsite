import React, { useEffect, useState } from "react";
import "../App.css";

export default function CreateNewBranch() {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [branchName, setBranchName] = useState("");
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

  const handleCreateBranch = async (e) => {
    e.preventDefault();

    if (!selectedBank || !branchName) {
      setMessage("Please select a bank and enter a branch name.");
      return;
    }

    const confirmCreate = window.confirm(
      `Are you sure you want to create branch "${branchName}" for bank "${selectedBank}"?`
    );
    if (!confirmCreate) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `http://localhost:5000/api/banks/${selectedBank}/branches/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ branchName }),
        }
      );

      if (!res.ok) throw new Error("Failed to create branch.");

      setMessage(`Branch "${branchName}" for "${selectedBank}" created successfully!`);
      setBranchName("");
      setSelectedBank("");
    } catch (err) {
      console.error(err);
      setMessage("An error occurred while creating the branch.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Create a New Branch</h2>
      <form
        className="form-container"
        onSubmit={handleCreateBranch}
      >
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
          <label htmlFor="branchName" className="form-label fw-bold">
            Branch Name
          </label>
          <input
            type="text"
            id="branchName"
            className="form-control"
            placeholder="Enter branch name"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Branch"}
        </button>

        {message && <p className="mt-3 fw-bold text-center">{message}</p>}
      </form>
    </div>
  );
}
