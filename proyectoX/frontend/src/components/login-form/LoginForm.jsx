// components/login-form/LoginForm.jsx
import React, { useState } from 'react';
import useLoginForm from './useLoginForm';
import FormInput from './FormImput';
import ErrorMessage from './ErrorMessage';

const LoginForm = () => {
  const { email, setEmail, password, setPassword, error, handleSubmit } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false); // Estado para manejar la visibilidad

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Cambia el estado al hacer clic
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Correo electrónico"
        />
        <div className="password-input-container">
          <FormInput
            type={showPassword ? "text" : "password"} // Cambia el tipo entre texto y contraseña
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Contraseña"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="toggle-password-button"
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? "👁️" : "👁️"} {/* Icono para el ojito */}
          </button>
        </div>
        {error && <ErrorMessage message={error} />}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;
