// contexts/AuthContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    const URL = 'http://localhost:10000/api/auth/login';

    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { Token_generated, User_rol } = data;

        if (!Token_generated || !User_rol) {
          throw new Error('Respuesta inesperada del servidor.');
        }

        setToken(Token_generated);
        setUserRole(User_rol);
        localStorage.setItem('token', Token_generated);
        localStorage.setItem('userRole', User_rol);

        switch (User_rol) {
          case 'administrador':
            navigate('/dashboard/administrador');
            break;
          case 'asistente':
            navigate('/dashboard/asistente');
            break;
          case 'cliente':
            navigate('/dashboard/cliente');
            break;
          default:
            throw new Error('Rol de usuario no reconocido.');
        }
      } else {
        throw new Error(data.Request_failed || 'Error desconocido');
      }
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUserRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
