import React, { useState } from "react";

export default function TransferForm() {
  const [amount, setAmount] = useState("");
  const [sourceBank, setSourceBank] = useState("");
  const [sourceBranch, setSourceBranch] = useState("");
  const [destinationBank, setDestinationBank] = useState("");
  const [destinationBranch, setDestinationBranch] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const payload = {
      amount,
      sourceBank,
      sourceBranch,
      destinationBank,
      destinationBranch,
    };

    try {
      const response = await fetch("http://localhost:5000/api/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // API returned an error (no source account, insufficient funds, destination doesn't exist)
        setMessage(`❌ ${data.error || "Transfer failed."}`);
        return;
      }

      setMessage("✔ Transfer completed successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error processing transfer.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="text-center mb-4">Transfer Funds</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Amount to transfer:
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
          Source Bank:
          <br />
          <input
            type="text"
            value={sourceBank}
            onChange={(e) => setSourceBank(e.target.value)}
            required
          />
        </label>

        <br /><br />

        <label>
          Source Branch:
          <br />
          <input
            type="text"
            value={sourceBranch}
            onChange={(e) => setSourceBranch(e.target.value)}
            required
          />
        </label>

        <br /><br />

        <label>
          Destination Bank:
          <br />
          <input
            type="text"
            value={destinationBank}
            onChange={(e) => setDestinationBank(e.target.value)}
            required
          />
        </label>

        <br /><br />

        <label>
          Destination Branch:
          <br />
          <input
            type="text"
            value={destinationBranch}
            onChange={(e) => setDestinationBranch(e.target.value)}
            required
          />
        </label>

        <br /><br />

        <button type="submit">Submit Transfer</button>
      </form>

      {message && (
        <p style={{ color: message.startsWith("❌") ? "red" : "green" }}>
          {message}
        </p>
      )}
    </div>
  );
}
