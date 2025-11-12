import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
 
export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "CUSTOMER",
  });
  const [message, setMessage] = useState("");
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
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    },
    card: {
      width: "450px",
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
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.register(form);
      setMessage("User registered successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage("Registration failed. Please try again.");
    }
  };
 
  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <h1>Join MyBrokerly Today</h1>
        <p>
          Create your free account and start listing or searching for properties.
        </p>
      </div>
 
      <div style={styles.rightPanel}>
        <div style={styles.card}>
          <h3 className="text-center mb-3" style={{ color: "#b30000" }}>
            Register
          </h3>
          <form onSubmit={handleSubmit}>
            <input
              name="username"
              className="form-control mb-2"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              className="form-control mb-2"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <input
              name="firstName"
              className="form-control mb-2"
              placeholder="First Name"
              onChange={handleChange}
            />
            <input
              name="lastName"
              className="form-control mb-2"
              placeholder="Last Name"
              onChange={handleChange}
            />
            <select
              name="role"
              className="form-select mb-3"
              onChange={handleChange}
            >
              <option value="CUSTOMER">Customer</option>
              <option value="BROKER">Broker</option>
              <option value="OWNER">Owner</option>
            </select>
 
            {message && (
              <div className="text-center text-danger mb-2">{message}</div>
            )}
 
            <button type="submit" style={styles.button}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}