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
        <input
          type="text"
          name="numeroIdentificacion"
          value={formData.numeroIdentificacion}
          onChange={handleChange}
          placeholder="Número de Identificación"
        />
        <input
          type="text"
          name="nombres"
          value={formData.nombres}
          onChange={handleChange}
          placeholder="Nombres"
        />
        <input
          type="text"
          name="apellidos"
          value={formData.apellidos}
          onChange={handleChange}
          placeholder="Apellidos"
        />
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
        />
        {/* Campo para seleccionar el rol */}
        <select
          name="nombre_rol"
          value={formData.nombre_rol}
          onChange={handleChange}
        >
          <option value="administrador">Administrador</option>
          <option value="asistente">Asistente</option>
          <option value="cliente">Cliente</option>
        </select>

        <button type="submit" className="button-primary">Guardar</button>
        <button type="button" onClick={onClose} className="button-secondary">Cancelar</button>
      </form>
    </div>
  );
};

export default UserForm;
