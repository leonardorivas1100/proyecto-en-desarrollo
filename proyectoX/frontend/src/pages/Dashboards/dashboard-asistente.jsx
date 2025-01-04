// DashboardAsistente.jsx
import React, { useState, useEffect } from 'react';
import Navbar from "../../components/navbar/Navbar";
import UserForm from "../../components/use-form/UseForm";
import { createUser, getUsers } from "../../services/api"; // Asegúrate de tener esta función en tus servicios

const DashboardAsistente = () => {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState([]); // Estado para almacenar usuarios

  // Función para obtener la lista de usuarios
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Token si es necesario
      const response = await getUsers(token); // Suponiendo que `getUsers` está configurado
      setUsers(response.data); // Asegúrate de que la estructura de datos sea correcta
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  // Llamar a `fetchUsers` al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Manejar la creación de un usuario
  const handleCreateUser = async (formData) => {
    try {
      await createUser(formData);
      alert("Usuario creado exitosamente");
      fetchUsers(); // Actualizar la lista de usuarios
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un problema al crear el usuario");
    } finally {
      setShowForm(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: '70px', padding: '20px' }}>
        <h1>Bienvenido al Dashboard del Asistente</h1>
        <button onClick={() => setShowForm(true)} className="button-primary">
          Crear un usuario
        </button>
        {showForm && (
          <UserForm
            onClose={() => setShowForm(false)}
            onSubmit={handleCreateUser}
          />
        )}
        <h2>Lista de Usuarios</h2>
        {users.length === 0 ? (
          <p>No hay usuarios disponibles.</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Rol</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.numeroIdentificacion}</td>
                  <td>{user.nombres}</td>
                  <td>{user.apellidos}</td>
                  <td>{user.email}</td>
                  <td>{user.nombre_rol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DashboardAsistente;
