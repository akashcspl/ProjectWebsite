import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function CloseUserAccounts() {
  const [requests, setRequests] = useState(null); // null until loaded
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // STEP 1 — Fetch closure requests before rendering
  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await fetch("http://localhost:5000/api/close-account-requests");

        if (!res.ok) {
          throw new Error("Failed to fetch closure requests");
        }

        const data = await res.json();

        // Validate to ensure it's an array with entries
        if (!Array.isArray(data) || data.length === 0) {
          navigate("/norequests");
          return;
        }

        setRequests(data);
      } catch (err) {
        console.error("Error loading closure requests:", err);
        navigate("/norequests");
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, [navigate]);

  // STEP 3 — Close account handler
  const handleCloseRequest = async (reqObj) => {
    try {
      const res = await fetch("http://localhost:5000/api/close-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqObj),
      });

      if (!res.ok) {
        throw new Error("Failed to close account");
      }

      alert("Account closed successfully!");

      // Remove processed row
      setRequests((prev) => prev.filter((r) => r.id !== reqObj.id));

      // Redirect if no more requests
      if (requests.length === 1) {
        navigate("/norequests");
      }
    } catch (error) {
      console.error("Closure error:", error);
      alert("Error closing account.");
    }
  };

  // Loading state
  if (loading) {
    return <h2 className="text-center mt-5">Loading account closure requests...</h2>;
  }

  // Prevent rendering errors (redirect already triggered)
  if (!requests || requests.length === 0) return null;

  const columns = Object.keys(requests[0] || {});

  return (
    <div className="container my-5">
      <h2 className="fw-bold text-center mb-4">Pending Account Closure Requests</h2>

      <div className="table-responsive">
        <table className="table table-hover shadow-sm close-account-table">
          <thead className="table-dark">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="text-capitalize">
                  {col.replace(/_/g, " ")}
                </th>
              ))}
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                {columns.map((field, idx) => (
                  <td key={idx}>{req[field]}</td>
                ))}

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleCloseRequest(req)}
                  >
                    Close Account
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
