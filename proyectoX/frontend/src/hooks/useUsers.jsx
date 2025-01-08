import { useState, useEffect } from 'react';
import { getUsers } from '../services/api';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await getUsers(token);
      setUsers(response.data.Users_found || []);
    } catch (err) {
      setError(err.message);
      console.error('Error al obtener usuarios:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, fetchUsers };
};
