// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

const ProtectedRoute = ({ children }) => {
  const user = supabase.auth.user(); // Check if a user is logged in

  if (!user) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/" />;
  }

  return children; // Render the protected component
};

export default ProtectedRoute;