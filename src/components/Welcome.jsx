import React from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
 
export default function Welcome() {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
 
  const handleLogout = () => {
    AuthService.logout();
    navigate("/");
  };
 
  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "#f8d7da",
      textAlign: "center",
    },
    button: {
      backgroundColor: "#b30000",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "10px 25px",
      marginTop: "20px",
    },
  };
 
  return (
    <div style={styles.container}>
      <h1 style={{ color: "#b30000" }}>Welcome, {user?.username} 🎉</h1>
      <button style={styles.button} onClick={handleLogout}>
        Logout
      </button>
      <button
  className="btn btn-danger mt-3"
  onClick={() => navigate("/properties")}
>
  🔍 Explore Properties
</button>
    </div>
  );
}