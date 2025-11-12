import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import PrivateRoute from "./components/PrivateRoute";
import PropertySearch from "./components/PropertySearch";
import AddProperty from "./components/AddProperty";
import MyProperties from "./components/myProperties";
import UpdateProperty from "./components/UpdateProperty";
 
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
        <Route
    path="/add-property"
    element={
      <PrivateRoute>
        <AddProperty />
      </PrivateRoute>
  }
/>
<Route
  path="/my-properties"
  element={
    <PrivateRoute>
      <MyProperties />
    </PrivateRoute>
  }
/>
<Route path="/update-property/:id" element={<UpdateProperty />} />
      </Routes>
    </Router>
  );
}
 
export default App;