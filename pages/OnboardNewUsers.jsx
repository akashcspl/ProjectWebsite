import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function OnboardingRequests() {
  const [requests, setRequests] = useState(null);     // null = not loaded yet
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // STEP 1 — Fetch onboarding requests BEFORE rendering
  useEffect(() => {
    async function loadRequests() {
      try {
        const res = await fetch("http://localhost:5000/api/onboarding-requests");

        if (!res.ok) {
          throw new Error("Failed to fetch onboarding requests");
        }

        const data = await res.json();

        // Validate response
        if (!Array.isArray(data) || data.length === 0) {
          navigate("/norequests");
          return;
        }

        setRequests(data);
      } catch (err) {
        console.error("Error fetching onboarding requests:", err);
        navigate("/norequests");
      } finally {
        setLoading(false);
      }
    }

    loadRequests();
  }, [navigate]);

  // STEP 3 — Authorize handler
  const handleAuthorize = async (request) => {
    try {
      const res = await fetch("http://localhost:5000/api/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });

      if (!res.ok) {
        throw new Error("Failed to authorize request");
      }

      alert("Account created successfully!");

      // Remove the processed request
      setRequests((prev) => prev.filter((r) => r.id !== request.id));

      // Optional: redirect if table empty
      if (requests.length === 1) {
        navigate("/norequests");
      }

    } catch (error) {
      console.error("Authorization error:", error);
      alert("Failed to create account.");
    }
  };

  // UI — Loading State
  if (loading) {
    return <h2 className="text-center mt-5">Loading onboarding requests...</h2>;
  }

  // UI — Guard to prevent null access
  if (!requests || requests.length === 0) {
    return null; // redirect already happened
  }

  const columns = Object.keys(requests[0] || {});

  return (
    <div className="container my-5">
      <h2 className="fw-bold text-center mb-4">Pending Onboarding Requests</h2>

      <div className="table-responsive">
        <table className="table table-hover shadow-sm onboarding-table">
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
                    className="btn btn-success btn-sm"
                    onClick={() => handleAuthorize(req)}
                  >
                    Authorize & Create Account
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
