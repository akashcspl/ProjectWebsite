import React, { useState } from "react";
import "../App.css";

export default function CreateNewBank() {
  const [bankName, setBankName] = useState("");
  const [branchNames, setBranchNames] = useState(""); // comma-separated branches
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bankName || !branchNames) {
      setMessage("Please provide both bank name and at least one branch.");
      return;
    }

    const branchesArray = branchNames.split(",").map((b) => b.trim()).filter(Boolean);

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/banks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: bankName,
          branches: branchesArray,
        }),
      });

      if (!res.ok) throw new Error("Failed to create bank.");

      setMessage(`Bank "${bankName}" with ${branchesArray.length} branch(es) created successfully!`);
      setBankName("");
      setBranchNames("");
    } catch (err) {
      console.error(err);
      setMessage("An error occurred while creating the bank.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4 text-center">Create a New Bank</h2>
      <form className="create-bank-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="bankName" className="form-label fw-bold">
            Bank Name
          </label>
          <input
            type="text"
            id="bankName"
            className="form-control"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            placeholder="Enter bank name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="branchNames" className="form-label fw-bold">
            Branches (comma-separated)
          </label>
          <input
            type="text"
            id="branchNames"
            className="form-control"
            value={branchNames}
            onChange={(e) => setBranchNames(e.target.value)}
            placeholder="e.g., Downtown, Uptown, East Side"
            required
          />
        </div>

        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Creating..." : "Create Bank"}
        </button>

        {message && <p className="mt-3 fw-bold text-center">{message}</p>}
      </form>
    </div>
  );
}
