import React, { useState } from 'react';
import Navbar from "../../components/navbar/Navbar";
import UserForm from "../../components/use-form/UseForm";
import { createUser } from "../../services/api";
import { useUsers } from "../../hooks/useUsers";

const DashboardAsistente = () => {
  const [showForm, setShowForm] = useState(false);
  const { users, loading, error, fetchUsers } = useUsers();

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
        {loading ? (
          <p>Cargando usuarios...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : users.length === 0 ? (
          <p>No hay usuarios disponibles.</p>
        ) : (
          <table className="user-table">
            <thead>
              <tr>
                <th>Numero Identificacion</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.numeroIdentificacion}</td>
                  <td>{user.nombres}</td>
                  <td>{user.apellidos}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.nombre_rol?.nombre || "Sin rol"}
                  </td>
                  <td>
  <button className="button-edit">Editar</button>
  <button className="button-delete">Eliminar</button>
</td>
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
