import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
  const userRole = localStorage.getItem('userRole'); // Obtén el rol del usuario desde localStorage

  if (userRole !== requiredRole) {
    // Si el rol no coincide, redirige al login o a una página de "No autorizado"
    return <Navigate to="../pages/Dashboards/DasboardNoPer" />;
  }

  // Si el rol es correcto, renderiza el contenido
  return children;
};

export default PrivateRoute;
