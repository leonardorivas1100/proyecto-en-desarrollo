// pages/Dashboards/DashboardAdmin.jsx
import React from 'react';
import Navbar from "../../components/navbar/Navbar"

const DashboardAdmin = () => {
  return (
    <div>
      <Navbar />
      <div style={styles.content}>
        <h1>Bienvenido al Dashboard del Administrador</h1>
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

export default DashboardAdmin;
