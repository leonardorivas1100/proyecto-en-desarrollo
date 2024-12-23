// components/login-form/useLoginForm.js
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Error desconocido.');
    }
  };

  return { email, setEmail, password, setPassword, error, handleSubmit };
};

export default useLoginForm;
