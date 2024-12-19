import React from 'react';

const DashboardPage = () => {
  return (
    <div
      className="centered"
      style={{
        flexDirection: 'column',
        textAlign: 'center',
        color: '#fff',
        fontSize: '30px',
      }}
    >
      <h1 style={{ color: '#1db954', marginBottom: '20px' }}>Bienvenido al Dashboard</h1>
      <p style={{ fontSize: '25px' }}>Has iniciado sesión correctamente!</p>
    </div>
  );
};

export default DashboardPage;
