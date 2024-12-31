import React, { useState } from 'react';
import Navbar from "../../components/navbar/Navbar";

const DashboardAdmin = () => {
  const [showForm, setShowForm] = useState(false); // Estado para mostrar u ocultar el formulario
  const [formData, setFormData] = useState({
    numeroIdentificacion: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    email: '',
    password: '',
    nombre_rol: 'administrador', // Valor por defecto
  });

  const URL = 'http://localhost:10000/api/usuarios'

  const handleButtonClick = () => {
    setShowForm(!showForm); // Alternar visibilidad del formulario
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Usuario creado:', result);
        alert('Usuario creado exitosamente');
        setShowForm(false); // Ocultar el formulario después de enviarlo
      } else {
        console.error('Error al crear el usuario');
        alert('Hubo un problema al crear el usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.content}>
        <h1>Bienvenido al Dashboard del Administrador</h1>

        <button onClick={handleButtonClick} className="button-primary">
          Crear un usuario
        </button>

        {showForm && (
          <div className="modal"> {/* Modal para el formulario */}
            <form onSubmit={handleFormSubmit} className="form-container">
              <h2>Crear Usuario</h2>
              <div className="form-group">
                <label>Número de Identificación</label>
                <input
                  type="text"
                  name="numeroIdentificacion"
                  value={formData.numeroIdentificacion}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nombres</label>
                <input
                  type="text"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Apellidos</label>
                <input
                  type="text"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Rol</label>
                <select
                  name="nombre_rol"
                  value={formData.nombre_rol}
                  onChange={handleChange}
                  required
                >
                  <option value="administrador">Administrador</option>
                  <option value="asistente">Asistente</option>
                  <option value="cliente">Cliente</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="button-primary">Guardar</button>
                <button type="button" onClick={handleButtonClick} className="button-secondary">Cancelar</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  content: {
    marginTop: '70px',
    padding: '20px',
  },
};

export default DashboardAdmin;
