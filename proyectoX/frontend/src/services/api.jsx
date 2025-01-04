import axios from 'axios';

export const createUser = async (userData) => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:10000/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Error al crear el usuario');
    }
    return await response.json();
  };
  


export const getUsers = async (token) => {
  return await axios.get('http://localhost:10000/api/usuarios', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};  
    