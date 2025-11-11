import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import AuthService from "../services/AuthService";
 
export default function Welcome() {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
 
  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "#fff5f5",
      textAlign: "center",
    },
    button: {
      backgroundColor: "#b30000",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "10px 25px",
      marginTop: "20px",
      fontWeight: "600",
    },
  };
 
  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h1 style={{ color: "#b30000" }}>Welcome, {user?.username} 🎉</h1>
       
 
        <button
          style={styles.button}
          onClick={() => navigate("/properties")}
        >
          🔍 Explore Properties
        </button>
      </div>
    </>
  );
}