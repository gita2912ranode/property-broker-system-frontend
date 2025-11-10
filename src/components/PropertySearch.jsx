import React, { useState } from "react";
import AuthService from "../services/AuthService";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
 
export default function PropertySearch() {
  const [filters, setFilters] = useState({
    city: "",
    state: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
  });
  const [properties, setProperties] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
 
  const user = AuthService.getCurrentUser();
  const navigate = useNavigate();
 
  const styles = {
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
    priceTag: {
      fontSize: "1.2rem",
      color: "#b30000",
      fontWeight: "bold",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "10px",
      marginBottom: "20px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    },
  };
 
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
 
  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchProperties(0);
  };
 
  const fetchProperties = async (pageNo) => {
    setLoading(true);
    try {
      const token = user?.token;
      const params = new URLSearchParams({ page: pageNo, size: 5 });
 
      Object.keys(filters).forEach((key) => {
        if (filters[key]) params.append(key, filters[key]);
      });
 
      const response = await axios.get(
        `http://localhost:9091/api/properties/search?${params.toString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
 
      const data = response.data;
      setProperties(data.content || []);
      setPage(data.number || 0);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };
 
  const handleLogout = () => {
    AuthService.logout();
    navigate("/");
  };
 
  return (
    <div className="container mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 style={{ color: "#b30000", fontWeight: "bold" }}>🏡 Find Your Dream Property</h3>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
 
      {/* Filter Form */}
      <form className="row g-2 mb-4" onSubmit={handleSearch}>
        <div className="col-md-2">
          <input name="city" placeholder="City" className="form-control" onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <input name="state" placeholder="State" className="form-control" onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <input name="type" placeholder="Type (e.g. Flat)" className="form-control" onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <input name="minPrice" type="number" placeholder="Min ₹" className="form-control" onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <input name="maxPrice" type="number" placeholder="Max ₹" className="form-control" onChange={handleChange} />
        </div>
        <div className="col-md-1">
          <input name="bedrooms" type="number" placeholder="Beds" className="form-control" onChange={handleChange} />
        </div>
        <div className="col-md-1">
          <input name="bathrooms" type="number" placeholder="Baths" className="form-control" onChange={handleChange} />
        </div>
        <div className="col-12 text-end">
          <button type="submit" style={styles.redButton}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>
 
      {/* Property Cards */}
      {properties.length > 0 ? (
        properties.map((p) => (
          <div className="card" style={styles.card} key={p.id}>
            <div className="row g-0 p-2 align-items-center">
              <div className="col-md-3">
                <img
                  src={p.imageUrl || "https://via.placeholder.com/200x150?text=Property"}
                  alt={p.title || "Property"}
                  className="img-fluid rounded"
                  style={{ objectFit: "cover", height: "150px", width: "100%" }}
                />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title mb-1" style={{ color: "#b30000" }}>
                    {p.title || `${p.bedrooms} BHK ${p.type}`}
                  </h5>
                  <p className="card-text mb-1 text-muted">
                    {p.city}, {p.state}
                  </p>
                  <p className="card-text mb-0">
                    🛏 {p.bedrooms || "-"} Beds | 🛁 {p.bathrooms || "-"} Baths <br />
                    💰 Price: <span style={styles.priceTag}>₹{p.price?.toLocaleString()}</span>
                  </p>
                </div>
              </div>
              <div className="col-md-3 text-end pe-4">
                <p style={styles.priceTag}>₹{p.price?.toLocaleString()}</p>
                <button style={styles.redButton}>Contact Agent</button>
                <button style={styles.outlineButton}>Get Phone No.</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-muted">
          {loading ? "Loading..." : "No properties found. Try new filters."}
        </div>
      )}
 
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button
            className="btn btn-outline-danger me-2"
            disabled={page === 0}
            onClick={() => fetchProperties(page - 1)}
          >
            ⬅ Prev
          </button>
          <span>
            Page {page + 1} of {totalPages}
          </span>
          <button
            className="btn btn-outline-danger ms-2"
            disabled={page === totalPages - 1}
            onClick={() => fetchProperties(page + 1)}
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}