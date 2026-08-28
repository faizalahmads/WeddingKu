import React from "react";
import { Navigate } from "react-router-dom";

const HomeRedirect = () => {
  const token = localStorage.getItem("token");

  return token ? (
    <Navigate to="admin/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default HomeRedirect;
