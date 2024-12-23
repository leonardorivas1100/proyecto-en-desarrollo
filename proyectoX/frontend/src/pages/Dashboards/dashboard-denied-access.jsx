import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardNo = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    const userRole = localStorage.getItem('userRole'); // Obtener el rol del usuario desde localStorage
    // Determinar la ruta del dashboard según el rol
    if (userRole === 'administrador') {
      navigate('/dashboard/administrador');
    } else if (userRole === 'asistente') {
      navigate('/dashboard/asistente');
    } else if (userRole === 'cliente') {
      navigate('/dashboard/cliente');
    } else {
      navigate('/login'); // Por defecto, redirige al login
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>No tienes acceso a esta página debido a tu rol en esta plataforma. Gracias.</h1>
      <button
        onClick={handleGoBack}
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Volver a mi Dashboard
      </button>
    </div>
  );
};

export default DashboardNo;
