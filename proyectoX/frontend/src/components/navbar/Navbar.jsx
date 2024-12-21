import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';  // Importa el archivo de estilos CSS

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); // Redirige al login
  };

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item" onClick={() => navigate('/dashboard/administrador')}>
          Dashboard Admin
        </li>
        <li className="nav-item" onClick={() => navigate('/dashboard/asistente')}>
          Dashboard Asistente
        </li>
        <li className="nav-item" onClick={() => navigate('/dashboard/cliente')}>
          Dashboard Cliente
        </li>
        <li className="nav-item" onClick={handleLogout}>
          Cerrar Sesión
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
