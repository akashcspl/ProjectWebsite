import React, { useState } from "react";

export default function Deposit() {
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const payload = {
      amount,
      bankName,
      branchName,
    };

    try {
      const response = await fetch("http://localhost:5000/api/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // Server returned an error – could be "no account in bank/branch"
        setMessage(`❌ ${data.error || "Deposit failed."}`);
        return;
      }

      // Successful deposit
      setMessage("✔ Deposit submitted successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error submitting deposit.");
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">Deposit Amount</h2>

      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Enter the amount to be deposited:
          <br />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>

        <br /><br />

        <label>
          Enter the bank name:
          <br />
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            required
          />
        </label>

        <br /><br />

        <label>
          Enter the branch name:
          <br />
          <input
            type="text"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            required
          />
        </label>

        <br /><br />

        <button type="submit">Submit</button>
      </form>

      {message && (
        <p style={{ color: message.startsWith("❌") ? "red" : "green" }}>
          {message}
        </p>
      )}
    </div>
  );
}
