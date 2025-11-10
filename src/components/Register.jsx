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
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await AuthService.register(form);
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setMessage("Registration failed. Please try again.");
    }
  };
 
  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff5f5",
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
 
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 className="text-center mb-3" style={{ color: "#b30000" }}>
          Register
        </h3>
        <form onSubmit={handleSubmit}>
          <input name="username" className="form-control mb-2" placeholder="Username" onChange={handleChange} required />
          <input name="email" className="form-control mb-2" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" className="form-control mb-2" placeholder="Password" onChange={handleChange} required />
          <input name="firstName" className="form-control mb-2" placeholder="First Name" onChange={handleChange} />
          <input name="lastName" className="form-control mb-2" placeholder="Last Name" onChange={handleChange} />
          {message && <div className="text-center text-danger mb-2">{message}</div>}
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}