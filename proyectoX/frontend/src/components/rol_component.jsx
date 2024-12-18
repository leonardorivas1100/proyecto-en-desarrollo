import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api/rol';

const Rol = () => {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({ id_rol: '', descripcion: '', id_usuario: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);}