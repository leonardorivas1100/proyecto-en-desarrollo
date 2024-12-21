// DashboardAdmin.jsx
import React from 'react';
import Navbar from '../..components/navbar/Navbar';


const DashboardCliente = () => {
  return (
    <div>
      <Navbar />
      <div style={styles.content}>
        <h1>Bienvenido al Dashboard del cliente</h1>
        {/* Contenido específico del Dashboard */}
      </div>
    </div>
  );
};

const styles = {
  content: {
    marginTop: '70px', // Espacio igual o mayor al alto del navbar
    padding: '20px',
  },
};

export default DashboardCliente;