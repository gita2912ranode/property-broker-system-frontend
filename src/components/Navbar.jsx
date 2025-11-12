import React from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
 
export default function Navbar() {
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
 
  const styles = {
    navbar: {
      backgroundColor: "#b30000",
      color: "#fff",
      padding: "12px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    brandContainer: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      gap: "10px",
    },
    logoCircle: {
      backgroundColor: "#fff",
      color: "#b30000",
      borderRadius: "50%",
      width: "38px",
      height: "38px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "800",
      fontSize: "1.1rem",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    },
    brandText: {
      fontSize: "1.3rem",
      fontWeight: "700",
      letterSpacing: "0.5px",
    },
    navLinks: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    link: {
      color: "#fff",
      textDecoration: "none",
      cursor: "pointer",
      fontWeight: "500",
    },
    userBox: {
      backgroundColor: "#fff",
      color: "#b30000",
      padding: "5px 10px",
      borderRadius: "5px",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    logoutBtn: {
      border: "1px solid #fff",
      backgroundColor: "transparent",
      color: "#fff",
      padding: "6px 12px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "500",
    },
  };
 
  const handleLogout = () => {
    AuthService.logout();
    navigate("/");
  };
 
  return (
    <nav style={styles.navbar}>
      {/* ✅ Left: Brand + Logo */}
      <div style={styles.brandContainer} onClick={() => navigate("/welcome")}>
        <div style={styles.logoCircle}>B</div>
        <div style={styles.brandText}>Brokerly<span style={{ fontWeight: "400" }}>.com</span></div>
      </div>
 
      {/* ✅ Right: Navigation Links + User Info */}
      <div style={styles.navLinks}>
        <span style={styles.link} onClick={() => navigate("/welcome")}>
          Home
        </span>
        <span style={styles.link} onClick={() => navigate("/properties")}>
          Properties
        </span>
 
        {user && (
          <>
         <span style={styles.link} onClick={() => navigate("/my-properties")}>
      🏡 My Properties
    </span>
    <span style={styles.link} onClick={() => navigate("/add-property")}>
      ➕ Add Property
    </span>
            <span style={styles.userBox}>
              👤 {user.username} 
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