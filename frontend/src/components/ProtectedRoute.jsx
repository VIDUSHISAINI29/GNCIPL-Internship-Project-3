// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext); // user will be null if not logged in

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
