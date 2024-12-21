import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
  const userRole = localStorage.getItem('userRole'); // Obtén el rol almacenado en localStorage

  if (userRole !== requiredRole) {
    // Redirige al usuario a la página de "sin permiso"
    return <Navigate to="/dashboard/no-permiso" />;
  }

  return children;
};

export default PrivateRoute;
