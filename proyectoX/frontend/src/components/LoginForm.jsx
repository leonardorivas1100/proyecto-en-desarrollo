import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const URL = 'http://localhost:10000/api/auth/login';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Resetea el error antes de intentar iniciar sesión

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
          setError('Respuesta inesperada del servidor.');
          return;
        }

        // Guarda el token y el rol en localStorage
        localStorage.setItem('token', Token_generated);
        localStorage.setItem('userRole', User_rol);

        // Redirige al dashboard según el rol
        switch (User_rol) {
          case 'administrador':
            navigate('/dashboard/admin');
            break;
          case 'asistente':
            navigate('/dashboard/asistente');
            break;
          case 'cliente':
            navigate('/dashboard/cliente');
            break;
          default:
            setError('Rol de usuario no reconocido.');
        }
      } else {
        setError(data.Request_failed || 'Error desconocido');
      }
    } catch (err) {
      setError('Error de conexión. Por favor, inténtalo más tarde.');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Correo electrónico"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Contraseña"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;
  