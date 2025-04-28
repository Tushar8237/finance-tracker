import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./utils/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import ClearErrorOnRouteChange from "./components/ClearErrorOnRouteChange";

function App() {
  return (
    <Router>
      {/* Clear error on route change */}
      <ClearErrorOnRouteChange />
      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Navigation bar */}
      <Navbar />
      
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Catch-all route for 404s */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
