import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
 
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
    },
    card: {
      width: "400px",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      backgroundColor: "#ffffff",
    },
    button: {
      backgroundColor: "#b30000",
      border: "none",
      color: "#fff",
      padding: "10px",
      width: "100%",
      borderRadius: "5px",
      fontSize: "1rem",
    },
  };
 
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login({ username, password });
      navigate("/properties");
    } catch {
      setError("Invalid username or password");
    }
  };
 
  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <h1>Login to MyBrokerly</h1>
        <p>Access your dashboard and manage your property listings efficiently.</p>
      </div>
      <div style={styles.rightPanel}>
        <div style={styles.card}>
          <h3 className="text-center mb-3" style={{ color: "#b30000" }}>
            Login
          </h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-danger mb-2">{error}</div>}
            <button type="submit" style={styles.button}>
              Login
            </button>
          </form>
          <div className="text-center mt-3">
            <span>
              New user?{" "}
              <span
                style={{ color: "#b30000", cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                Register here
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}