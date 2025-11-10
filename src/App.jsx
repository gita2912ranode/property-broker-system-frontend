import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import PrivateRoute from "./components/PrivateRoute";
import PropertySearch from "./components/PropertySearch";
 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/welcome"
          element={
            <PrivateRoute>
              <Welcome />
            </PrivateRoute>
          }
        />
        <Route 
        path="/properties"
        element={
          <PrivateRoute>
            <PropertySearch/>
          </PrivateRoute>
        }/>
      </Routes>
    </Router>
  );
}
 
export default App;