import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
 
export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();
 
  const styles = {
    container: { marginTop: "30px", marginBottom: "50px" },
    card: {
      border: "1px solid #eee",
      borderRadius: "10px",
      marginBottom: "16px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
    },
    redButton: {
      backgroundColor: "#b30000",
      border: "none",
      color: "#fff",
      padding: "8px 12px",
      borderRadius: "6px",
      fontWeight: "700",
      marginRight: "8px",
    },
    outlineButton: {
      border: "1px solid #b30000",
      color: "#b30000",
      padding: "8px 12px",
      borderRadius: "6px",
      fontWeight: "700",
      backgroundColor: "transparent",
    },
    smallText: { fontSize: "0.9rem", color: "#666" },
    statusBadge: (status) => ({
      padding: "6px 10px",
      borderRadius: "12px",
      fontWeight: "700",
      color: "#fff",
      backgroundColor:
        status === "CONFIRMED"
          ? "#198754"
          : status === "REJECTED"
          ? "#dc3545"
          : "#ffc107", // REQUESTED/PENDING
    }),
  };
 
  // ✅ Fetch customer bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = user?.token;
      const response = await axios.get("http://localhost:9091/api/bookings/customer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      if (err.response && err.response.status === 401) {
        alert("Session expired. Please log in again.");
        AuthService.logout();
        navigate("/login");
      } else {
        alert("Failed to load your bookings.");
      }
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  // ✅ Cancel/Delete booking
  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
 
    try {
      setDeleting(bookingId);
      const token = user?.token;
      await axios.delete(`http://localhost:9091/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
 
      alert("✅ Booking cancelled successfully!");
      setBookings((prev) => prev.filter((b) => b.id !== bookingId));
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("❌ Failed to cancel booking. Please try again.");
    } finally {
      setDeleting(null);
    }
  };
 
  const formatDateTime = (isoString) => {
    if (!isoString) return "-";
    try {
      const date = new Date(isoString);
      return date.toLocaleString();
    } catch {
      return isoString;
    }
  };
 
  return (
    <>
      <Navbar />
      <div className="container" style={styles.container}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 style={{ color: "#b30000", fontWeight: "bold" }}>📋 My Bookings</h3>
          <div>
            <button className="btn btn-outline-danger me-2" onClick={fetchBookings}>
              🔄 Refresh
            </button>
            <button className="btn btn-danger" onClick={() => navigate("/properties")}>
              🏠 Browse Properties
            </button>
          </div>
        </div>
 
        {/* Loading state */}
        {loading && <div className="text-center text-muted">Loading your bookings...</div>}
 
        {/* No bookings */}
        {!loading && bookings.length === 0 && (
          <div className="text-center text-muted">
            <p>You have no bookings yet.</p>
            <button
              className="btn btn-danger mt-2"
              onClick={() => navigate("/properties")}
            >
              🔍 Browse Properties
            </button>
          </div>
        )}
 
        {/* Bookings List */}
        {!loading &&
          bookings.map((b) => (
            <div key={b.id} className="card" style={styles.card}>
              <div className="row g-0 p-3 align-items-center">
                <div className="col-md-2">
                  <img
                    src={b.property?.imageUrl || "https://via.placeholder.com/150x100?text=Property"}
                    alt={b.property?.title || "Property"}
                    className="img-fluid rounded"
                    style={{ height: "100px", width: "100%", objectFit: "cover" }}
                  />
                </div>
 
                <div className="col-md-6">
                  <div style={{ paddingLeft: 12 }}>
                    <h5 style={{ color: "#b30000" }}>{b.property?.title || "Property"}</h5>
                    <div style={styles.smallText}>
                      {b.property?.city}, {b.property?.state} • {b.property?.propertyType}
                    </div>
                    <div style={{ marginTop: 6 }}>
                      <strong>Scheduled:</strong> {formatDateTime(b.scheduledAt)}
                    </div>
                    {b.notes && (
                      <div style={{ marginTop: 6 }}>
                        <strong>Notes:</strong> <span style={styles.smallText}>{b.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
 
                <div className="col-md-2 text-center">
                  <div style={styles.statusBadge(b.status)}>{b.status || "REQUESTED"}</div>
                  <div style={{ marginTop: 8, color: "#b30000", fontWeight: "700" }}>
                    ₹{b.property?.price?.toLocaleString?.() ?? b.property?.price}
                  </div>
                </div>
 
                <div className="col-md-2 text-end">
                  <button
                    className="btn btn-sm"
                    style={styles.outlineButton}
                    onClick={() => navigate(`/properties/${b.property?.id}`)}
                  >
                    View Property
                  </button>
                  <div className="mt-2">
                    <button
                      className="btn btn-sm"
                      style={styles.redButton}
                      onClick={() => handleCancel(b.id)}
                      disabled={deleting === b.id}
                    >
                      {deleting === b.id ? "Cancelling..." : "Cancel"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}