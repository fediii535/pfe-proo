import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Remplacez ceci par votre logique d'authentification

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;