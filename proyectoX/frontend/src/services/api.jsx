import axios from 'axios';

const API_URL = 'http://localhost:10000/api/usuarios';

export const createUser = async (userData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getUsers = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
