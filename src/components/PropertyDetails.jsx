import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import AuthService from "../services/AuthService";
import "bootstrap/dist/css/bootstrap.min.css";
 
export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [booking, setBooking] = useState({
    scheduledAt: "",
    notes: "",
  });
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
 
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const token = user?.token;
        const response = await axios.get(`http://localhost:9091/api/properties/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property details:", error);
        alert("❌ Failed to load property details.");
        navigate("/properties");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);
 
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = user?.token;
      const response = await axios.post(
        `http://localhost:9091/api/bookings?propertyId=${id}`,
        booking,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Booking successful! Your visit is scheduled.");
      setShowBookingForm(false);
      setBooking({ scheduledAt: "", notes: "" });
    } catch (error) {
      console.error("Error booking property:", error);
      alert("❌ Failed to book property. Please try again.");
    }
  };
 
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container text-center mt-5">Loading property details...</div>
      </>
    );
  }
 
  if (!property) {
    return (
      <>
        <Navbar />
        <div className="container text-center mt-5">Property not found.</div>
      </>
    );
  }
 
  const styles = {
    redButton: {
      backgroundColor: "#b30000",
      border: "none",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "6px",
      fontWeight: "700",
      marginRight: "10px",
    },
    outlineButton: {
      border: "1px solid #b30000",
      color: "#b30000",
      padding: "10px 20px",
      borderRadius: "6px",
      fontWeight: "700",
      backgroundColor: "transparent",
    },
  };
 
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          {/* Property Image */}
          <div className="col-md-6">
            <img
              src={property.imageUrl || "https://via.placeholder.com/500x350?text=Property"}
              alt={property.title}
              className="img-fluid rounded"
            />
          </div>
 
          {/* Property Details */}
          <div className="col-md-6">
            <h3 style={{ color: "#b30000", fontWeight: "bold" }}>{property.title}</h3>
            <p className="text-muted">{property.city}, {property.state}</p>
            <h5 style={{ color: "#b30000" }}>₹{property.price?.toLocaleString()}</h5>
            <p>🛏 {property.bedrooms} Beds | 🛁 {property.bathrooms} Baths | 📐 {property.areaSqft} sqft</p>
            <p><b>Type:</b> {property.propertyType}</p>
            <p><b>Address:</b> {property.address}</p>
            <p><b>Description:</b> {property.description}</p>
 
            <button style={styles.redButton} onClick={() => setShowBookingForm(true)}>
              📅 Book Visit
            </button>
            <button style={styles.outlineButton} onClick={() => navigate("/properties")}>
              ⬅ Back
            </button>
          </div>
        </div>
 
        {/* Owner Info */}
        <hr />
        <h5 style={{ color: "#b30000" }}>🏠 Owner Details</h5>
        <p><b>Name:</b> {property.owner?.username || "N/A"}</p>
        <p><b>Email:</b> {property.owner?.email || "N/A"}</p>
      </div>
 
      {/* Booking Form Modal */}
      {showBookingForm && (
        <div
          className="modal show"
          style={{
            display: "block",
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ color: "#b30000" }}>Book Property Visit</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowBookingForm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleBookingSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Select Date & Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="scheduledAt"
                      value={booking.scheduledAt}
                      onChange={(e) => setBooking({ ...booking, scheduledAt: e.target.value })}
                      required
                    />
                  </div>
 
                  <div className="mb-3">
                    <label className="form-label">Notes (optional)</label>
                    <textarea
                      className="form-control"
                      name="notes"
                      value={booking.notes}
                      onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                      rows="3"
                      placeholder="Any special request or note"
                    ></textarea>
                  </div>
 
                  <div className="text-end">
                    <button type="submit" style={styles.redButton}>
                      Confirm Booking
                    </button>
                    <button
                      type="button"
                      style={styles.outlineButton}
                      onClick={() => setShowBookingForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}