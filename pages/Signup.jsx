import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pan, setPan] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [dob, setDob] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("https://localhost:44353/api/Signup/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, pan, aadhaar, dob }),
      });

      if (!response.ok) throw new Error("Signup failed");

      const data = await response.json();
      console.log("Response data:", data);

      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);

    } catch (error) {
      console.error("Error:", error);
      setMessage("Signup failed. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h2 className="mb-4">Sign Up</h2>
      <form className="form-container" onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        /><br />

        <input
          type="text"
          placeholder="PAN Number"
          value={pan}
          onChange={(e) => setPan(e.target.value)}
          required
        /><br />

        <input
          type="text"
          placeholder="Aadhaar Number"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value)}
          required
        /><br />

        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        /><br />

        <button type="submit" className="btn btn-primary mt-3">
          Sign Up
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default Signup;
