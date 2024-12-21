// components/login-form/LoginForm.jsx
import React from 'react';
import useLoginForm from './useLoginForm';
import FormInput from './FormImput';
import ErrorMessage from './ErrorMessage';

const LoginForm = () => {
  const { email, setEmail, password, setPassword, error, handleSubmit } = useLoginForm();

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
        <FormInput
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Contraseña"
        />
        {error && <ErrorMessage message={error} />}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;
