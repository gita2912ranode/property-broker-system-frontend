import React from "react";
import { useNavigate } from "react-router-dom";
 
export default function LandingPage() {
  const navigate = useNavigate();
 
  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f8d7da",
      flexDirection: "column",
      textAlign: "center",
    },
    heading: {
      color: "#b30000",
      fontWeight: "bold",
      fontSize: "2.5rem",
    },
    button: {
      backgroundColor: "#b30000",
      border: "none",
      color: "#fff",
      padding: "10px 30px",
      borderRadius: "8px",
      margin: "10px",
      fontSize: "1.1rem",
      cursor: "pointer",
    },
  };
 
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🏠 Property Broker System</h1>
      <p>Welcome to the Property Broker System — manage listings & bookings securely.</p>
      <div>
        <button style={styles.button} onClick={() => navigate("/login")}>
          Login
        </button>
        <button style={styles.button} onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
}