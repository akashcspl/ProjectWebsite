import React, { useState } from "react";

export default function Withdrawal() {
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
      const response = await fetch("http://localhost:5000/api/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // API returned an error (e.g., no account, insufficient funds)
        setMessage(`❌ ${data.error || "Withdrawal failed."}`);
        return;
      }

      // Successful withdrawal
      setMessage("✔ Withdrawal successful!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error processing withdrawal.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-center mb-4">Withdraw Funds</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Enter the amount to withdraw:
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
