import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
 
export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
 
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
 
    try {
      // fetch users.json
      const response = await fetch("http://localhost:4000/users");
      const users = await response.json();
 
      console.log("USERS:", users);
      console.log("Typed Identifier:", identifier);
      console.log("Typed Password:", password);
 
      // find user by Email or UserName
      const user = users.find(
        (u) =>
          (u.Email.trim() === identifier.trim() ||
            u.UserName.trim() === identifier.trim()) &&
          u.Password.trim() === password.trim()
      );
 
      if (!user) {
        setMessage("Invalid email/username or password.");
        return;
      }
 
      // create token
      const token = btoa(`${user.Email}:${user.Password}`);
 
      // save token
      login(token);
      localStorage.setItem("token", token);
 
      // save userId
      localStorage.setItem("userId", user.UserId);
 
      // save username
      localStorage.setItem("username", user.UserName);
 
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage("Login error.");
    }
  };
 
  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h2>Login</h2>
 
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email or Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <br /><br />
 
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />
 
        <button type="submit">Login</button>
      </form>
 
      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}
 
 