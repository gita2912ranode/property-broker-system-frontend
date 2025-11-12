import React, { useState } from "react";
import axios from "axios";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
 
export default function AddProperty() {
  const [property, setProperty] = useState({
    title: "",
    description: "",
    propertyType: "",
    price: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    bedrooms: "",
    bathrooms: "",
    areaSqft: "",
    imageUrl: "",
  });
 
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
 
  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
 
    try {
      const token = user?.token;
      const ownerId = user?.id; // assuming your JWT user object contains `id`
 
      const response = await axios.post(
        `http://localhost:9091/api/properties?ownerId=${ownerId}`,
        property,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
 
      alert("✅ Property added successfully!");
      navigate("/my-properties");
    } catch (error) {
      console.error("Error adding property:", error);
      alert("❌ Failed to add property. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <>
      <Navbar />
      <div className="container" style={styles.container}>
        <h3 style={{ color: "#b30000", fontWeight: "bold" }}>
          🏠 Add New Property
        </h3>
        <hr />
 
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Title */}
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input
                name="title"
                value={property.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
 
            {/* Property Type */}
            <div className="col-md-6">
              <label className="form-label">Property Type</label>
              <input
                name="propertyType"
                value={property.propertyType}
                onChange={handleChange}
                className="form-control"
                placeholder="House / Apartment / Villa"
                required
              />
            </div>
 
            {/* Description */}
            <div className="col-md-12">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={property.description}
                onChange={handleChange}
                className="form-control"
                rows="3"
                required
              ></textarea>
            </div>
 
            {/* ✅ Address (NEW FIELD ADDED) */}
            <div className="col-md-12">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                value={property.address}
                onChange={handleChange}
                className="form-control"
                rows="2"
                placeholder="Enter full property address"
                required
              ></textarea>
            </div>
 
            {/* Price & Area */}
            <div className="col-md-6">
              <label className="form-label">Price (₹)</label>
              <input
                name="price"
                type="number"
                value={property.price}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Area (sqft)</label>
              <input
                name="areaSqft"
                type="number"
                value={property.areaSqft}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g., 1200"
              />
            </div>
 
            {/* City / State / Country */}
            <div className="col-md-4">
              <label className="form-label">City</label>
              <input
                name="city"
                value={property.city}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">State</label>
              <input
                name="state"
                value={property.state}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Country</label>
              <input
                name="country"
                value={property.country}
                onChange={handleChange}
                className="form-control"
                placeholder="India"
                required
              />
            </div>
 
            {/* Zip / Beds / Baths */}
            <div className="col-md-4">
              <label className="form-label">Zipcode</label>
              <input
                name="zipcode"
                value={property.zipcode}
                onChange={handleChange}
                className="form-control"
                placeholder="411001"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Bedrooms</label>
              <input
                name="bedrooms"
                type="number"
                value={property.bedrooms}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g., 3"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Bathrooms</label>
              <input
                name="bathrooms"
                type="number"
                value={property.bathrooms}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g., 2"
              />
            </div>
 
            {/* Image */}
            <div className="col-md-12">
              <label className="form-label">Property Image URL</label>
              <input
                name="imageUrl"
                value={property.imageUrl}
                onChange={handleChange}
                className="form-control"
                placeholder="https://example.com/image.jpg"
              />
            </div>
 
            {/* Submit */}
            <div className="col-12 text-end mt-3">
              <button
                type="submit"
                style={styles.redButton}
                disabled={loading}
              >
                {loading ? "Saving..." : "Add Property"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}