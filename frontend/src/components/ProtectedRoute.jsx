import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login if user isn’t authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
