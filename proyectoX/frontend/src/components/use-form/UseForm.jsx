import React, { useState } from 'react';

const UserForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    numeroIdentificacion: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    password: '',
    nombre_rol: 'administrador',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Crear Usuario</h2>
        {/* Campos del formulario */}
        {/* Mismos inputs con 'value' y 'onChange' */}
        <button type="submit" className="button-primary">Guardar</button>
        <button type="button" onClick={onClose} className="button-secondary">Cancelar</button>
      </form>
    </div>
  );
};

export default UserForm;
