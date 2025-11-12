import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
 
export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = AuthService.getCurrentUser();
  const navigate = useNavigate();
 
  const styles = {
    container: {
      marginTop: "30px",
      marginBottom: "50px",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "10px",
      marginBottom: "20px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    },
    redButton: {
      backgroundColor: "#b30000",
      border: "none",
      color: "#fff",
      padding: "8px 15px",
      borderRadius: "6px",
      fontWeight: "700",
      marginRight: "8px",
    },
    outlineButton: {
      border: "1px solid #b30000",
      color: "#b30000",
      padding: "8px 15px",
      borderRadius: "6px",
      fontWeight: "700",
      backgroundColor: "transparent",
    },
    title: {
      color: "#b30000",
      fontWeight: "bold",
    },
    heading: {
      color: "#b30000",
      fontWeight: "bold",
      marginBottom: "25px",
    },
    addButton: {
      backgroundColor: "#b30000",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      padding: "10px 18px",
      fontWeight: "600",
    },
  };
 
  // ✅ Fetch only properties owned by logged-in user
  useEffect(() => {
    fetchOwnerProperties();
  }, []);
 
  const fetchOwnerProperties = async () => {
    setLoading(true);
    try {
      const token = user?.token;
      const response = await axios.get("http://localhost:9091/api/properties/owner", {
        headers: { Authorization: `Bearer ${token}` },
      });
 
      // ✅ If response is empty array, still fine
      setProperties(response.data || []);
    } catch (err) {
      console.error("Error fetching owner properties:", err);
 
      // ✅ Handle specific status codes cleanly
      if (err.response && err.response.status === 404) {
        setProperties([]); // No properties found, not an error
      } else if (err.response && err.response.status === 401) {
        alert("⚠️ Session expired. Please log in again.");
        AuthService.logout();
        navigate("/login");
      } else {
        alert("❌ Failed to load your properties. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
 
  // ✅ Delete property instantly from UI without refetch
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
 
    try {
      const token = user?.token;
 
      await axios.delete(`http://localhost:9091/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
 
      alert("✅ Property deleted successfully!");
 
      // ✅ Instantly update UI
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting property:", err);
 
      if (err.response && err.response.status === 401) {
        alert("⚠️ Session expired. Please log in again.");
        AuthService.logout();
        navigate("/login");
      } else {
        alert("❌ Failed to delete property. Try again.");
      }
    }
  };
 
  return (
    <>
      <Navbar />
      <div className="container" style={styles.container}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 style={styles.heading}>🏡 My Listed Properties</h3>
          <button
            style={styles.addButton}
            onClick={() => navigate("/add-property")}
          >
            ➕ Add New Property
          </button>
        </div>
 
        {loading ? (
          <div className="text-center text-muted mt-4">Loading properties...</div>
        ) : properties.length > 0 ? (
          properties.map((p) => (
            <div className="card" style={styles.card} key={p.id}>
              <div className="row g-0 p-2 align-items-center">
                <div className="col-md-3">
                  <img
                    src={p.imageUrl || "https://via.placeholder.com/200x150?text=Property"}
                    alt={p.title}
                    className="img-fluid rounded"
                    style={{ objectFit: "cover", height: "150px", width: "100%" }}
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h5 className="card-title mb-1" style={styles.title}>
                      {p.title}
                    </h5>
                    <p className="card-text mb-1 text-muted">
                      {p.city}, {p.state} — {p.propertyType}
                    </p>
                    <p className="card-text mb-0">
                      🛏 {p.bedrooms} Beds | 🛁 {p.bathrooms} Baths <br />
                      💰 ₹{p.price?.toLocaleString()} | 📐 {p.areaSqft} sqft
                    </p>
                  </div>
                </div>
                <div className="col-md-3 text-end pe-4">
                  <button
                    style={styles.redButton}
                    onClick={() => navigate(`/update-property/${p.id}`)}
                  >
                    ✏️ Update
                  </button>
                  <button
                    style={styles.outlineButton}
                    onClick={() => handleDelete(p.id)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted mt-5">
            You haven’t listed any properties yet.
            <br />
            <button
              className="btn btn-danger mt-3"
              onClick={() => navigate("/add-property")}
            >
              ➕ Add Property
            </button>
          </div>
        )}
      </div>
    </>
  );
}