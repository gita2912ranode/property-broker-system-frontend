import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
 
export default function UpdateProperty() {
  const { id } = useParams(); 
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
 
  const styles = {
    container: {
      maxWidth: "800px",
      marginTop: "30px",
      background: "#fff",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    redButton: {
      backgroundColor: "#b30000",
      border: "none",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "6px",
      fontWeight: "700",
      width: "150px",
    },
  };
 
  // ✅ Fetch property by ID for pre-filled form
  useEffect(() => {
    fetchPropertyById();
  }, []);
 
  const fetchPropertyById = async () => {
    setLoading(true);
    try {
      const token = user?.token;
      const response = await axios.get(`http://localhost:9091/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperty(response.data);
    } catch (err) {
      console.error("Error fetching property:", err);
      alert("❌ Failed to load property details.");
    } finally {
      setLoading(false);
    }
  };
 
  // ✅ Handle input field change
  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };
 
  // ✅ Submit updated property
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
 
    try {
      const token = user?.token;
      const response = await axios.put(
        `http://localhost:9091/api/properties/${id}`,
        property,
        { headers: { Authorization: `Bearer ${token}` } }
      );
 
      if (response.status === 200) {
        alert("✅ Property updated successfully!");
        navigate("/my-properties");
      }
    } catch (err) {
      console.error("Error updating property:", err);
 
      if (err.response && err.response.status === 401) {
        alert("⚠️ Session expired. Please log in again.");
        AuthService.logout();
        navigate("/login");
      } else if (err.response && err.response.status === 403) {
        alert("🚫 You are not authorized to update this property.");
      } else {
        alert("❌ Failed to update property. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };
 
  if (!property) return <div className="text-center mt-5">Loading property...</div>;
 
  return (
    <>
      <Navbar />
      <div className="container" style={styles.container}>
        <h3 style={{ color: "#b30000", fontWeight: "bold" }}>✏️ Update Property</h3>
        <hr />
 
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input
                name="title"
                className="form-control"
                value={property.title || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Property Type</label>
              <input
                name="propertyType"
                className="form-control"
                value={property.propertyType || ""}
                onChange={handleChange}
              />
            </div>
 
            <div className="col-md-12">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                value={property.description || ""}
                onChange={handleChange}
              />
            </div>
 
            <div className="col-md-6">
              <label className="form-label">Price (₹)</label>
              <input
                name="price"
                type="number"
                className="form-control"
                value={property.price || ""}
                onChange={handleChange}
              />
            </div>
 
            <div className="col-md-6">
              <label className="form-label">Area (sqft)</label>
              <input
                name="areaSqft"
                type="number"
                className="form-control"
                value={property.areaSqft || ""}
                onChange={handleChange}
              />
            </div>
 
            <div className="col-md-4">
              <label className="form-label">City</label>
              <input
                name="city"
                className="form-control"
                value={property.city || ""}
                onChange={handleChange}
              />
            </div>
 
            <div className="col-md-4">
              <label className="form-label">State</label>
              <input
                name="state"
                className="form-control"
                value={property.state || ""}
                onChange={handleChange}
              />
            </div>
 
            <div className="col-md-4">
              <label className="form-label">Country</label>
              <input
                name="country"
                className="form-control"
                value={property.country || ""}
                onChange={handleChange}
              />
            </div>
 
            <div className="col-md-4">
              <label className="form-label">Zipcode</label>
              <input
                name="zipcode"
                className="form-control"
                value={property.zipcode || ""}
                onChange={handleChange}
              />
            </div>
 
            <div className="col-md-4">
              <label className="form-label">Bedrooms</label>
              <input
                name="bedrooms"
                type="number"
                className="form-control"
                value={property.bedrooms || ""}
                onChange={handleChange}
              />
            </div>
 
            <div className="col-md-4">
              <label className="form-label">Bathrooms</label>
              <input
                name="bathrooms"
                type="number"
                className="form-control"
                value={property.bathrooms || ""}
                onChange={handleChange}
              />
            </div>
 
            <div className="col-md-12">
              <label className="form-label">Image URL</label>
              <input
                name="imageUrl"
                className="form-control"
                value={property.imageUrl || ""}
                onChange={handleChange}
              />
            </div>
 
            <div className="col-12 text-end">
              <button
                type="submit"
                style={styles.redButton}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Property"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}