import React, { useState, useEffect } from "react";

export default function CloseAccount() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const [accountNumber, setAccountNumber] = useState("");

  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");

  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");

  const [message, setMessage] = useState("");

  //  Fetch available banks on load
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/banks");
        const data = await res.json();
        setBanks(data);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);

  //  When bank is selected, fetch branches
  const handleBankChange = async (e) => {
    const bank = e.target.value;
    setSelectedBank(bank);
    setSelectedBranch("");
    setBranches([]);

    if (!bank) return;

    try {
      const res = await fetch(`http://localhost:5000/api/branches/${bank}`);
      const data = await res.json();
      setBranches(data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  //  Submit close account request
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId,
      password,
      bankName: selectedBank,
      branchName: selectedBranch,
      accountNumber,
    };

    try {
      const response = await fetch("http://localhost:5000/api/closeAccount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(`❌ ${data.error || "Could not close account."}`);
        return;
      }

      setMessage("✔ Close account request submitted successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error submitting request.");
    }
  };

  return (
    <div>
      <h2>Request to Close Bank Account</h2>

      <form onSubmit={handleSubmit}>
        {/* User ID */}
        <label>
          User ID:
          <br />
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </label>
        <br /><br />

        {/* Password */}
        <label>
          Password:
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br /><br />

        {/* Account Number */}
        <label>
          Account Number:
          <br />
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </label>
        <br /><br />

        {/* Bank dropdown */}
        <label>
          Select Bank:
          <br />
          <select value={selectedBank} onChange={handleBankChange} required>
            <option value="">-- Choose a bank --</option>
            {banks.map((bank) => (
              <option key={bank} value={bank}>
                {bank}
              </option>
            ))}
          </select>
        </label>
        <br /><br />

        {/* Branch dropdown */}
        <label>
          Select Branch:
          <br />
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            disabled={!selectedBank}
            required
          >
            <option value="">-- Choose a branch --</option>
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch}
              </option>
            ))}
          </select>
        </label>

        <br /><br />

        <button type="submit">Submit Close Request</button>
      </form>

      {message && (
        <p style={{ color: message.startsWith("❌") ? "red" : "green" }}>
          {message}
        </p>
      )}
    </div>
  );
}
