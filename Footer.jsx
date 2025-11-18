import React from "react";
import './App.css'; // optional, for styling

export default function Footer() {
  return (
    <footer style={{
      background: "linear-gradient(90deg, #F76218, #C94B00)", // match your theme
      color: "white",
      padding: "1rem 2rem",
      textAlign: "center",
      marginTop: "auto" // ensures footer sticks at bottom if page content is short
    }}>
      <p>&copy; 2025 Mesa Verde Bank. All rights reserved.</p>
      <p>
        Follow us on 
        <a href="www.google.com" style={{color: "white", marginLeft: "0.5rem"}}>Twitter</a> | 
        <a href="www.google.com" style={{color: "white", marginLeft: "0.5rem"}}>LinkedIn</a>
      </p>
    </footer>
  );
}
