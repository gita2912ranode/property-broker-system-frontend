import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
 
export default function Navbar() {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
 
  const styles = {
    navbar: {
      backgroundColor: "#b30000",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#fff",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    },
    logo: {
      fontWeight: "bold",
      fontSize: "1.2rem",
      cursor: "pointer",
    },
    userSection: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    username: {
      backgroundColor: "#fff",
      color: "#b30000",
      padding: "5px 10px",
      borderRadius: "5px",
      fontWeight: "500",
    },
    logoutBtn: {
      border: "1px solid #fff",
      backgroundColor: "transparent",
      color: "#fff",
      padding: "6px 12px",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };
 
  const handleLogout = () => {
    AuthService.logout();
    navigate("/");
  };
 
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo} onClick={() => navigate("/welcome")}>
        🏠 Property Broker
      </div>
      <div style={styles.userSection}>
        {user && (
          <>
            <span style={styles.username}>
              {user.username} ({user.roles?.join(", ")})
            </span>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}