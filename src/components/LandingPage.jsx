import React from "react";
import { useNavigate } from "react-router-dom";
 
export default function LandingPage() {
  const navigate = useNavigate();
 
  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      backgroundColor: "#fff",
      fontFamily: "Poppins, sans-serif",
    },
    leftPanel: {
      flex: 1,
      backgroundColor: "#b30000",
      color: "#fff",
      padding: "60px 40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    rightPanel: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      textAlign: "center",
    },
    heading: {
      fontSize: "2.8rem",
      fontWeight: "bold",
      marginBottom: "15px",
    },
    subtext: {
      fontSize: "1.1rem",
      lineHeight: "1.8",
    },
    button: {
      backgroundColor: "#b30000",
      color: "#fff",
      border: "none",
      padding: "10px 25px",
      borderRadius: "6px",
      fontWeight: "600",
      margin: "10px",
      cursor: "pointer",
      fontSize: "1.1rem",
    },
    logo: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#b30000",
      marginBottom: "20px",
    },
  };
 
  return (
    <div style={styles.container}>
      {/* Left Info Section */}
      <div style={styles.leftPanel}>
        <h1>Things You Can Do with MyBrokerly</h1>
        <ul style={{ fontSize: "1rem", marginTop: "20px" }}>
          <li>🏠 Post your Property for FREE</li>
          <li>🔔 Set property alerts based on requirements</li>
          <li>👥 Get accessed by thousands of verified buyers</li>
          <li>📞 Receive instant property queries</li>
          <li>📈 Track your property performance</li>
          <li>🖼️ Upload multiple photos and detailed information</li>
        </ul>
      </div>
 
      {/* Right Auth Section */}
      <div style={styles.rightPanel}>
        <div style={styles.logo}>MyBrokerly.com</div>
        <h3 style={{ color: "#b30000" }}>Welcome to MyBrokerly</h3>
        <p>Manage properties, connect with buyers, and grow your business!</p>
        <div>
          <button style={styles.button} onClick={() => navigate("/login")}>
            Login
          </button>
          <button style={styles.button} onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}