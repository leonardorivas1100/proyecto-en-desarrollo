// DashboardAdmin.jsx
import React, {useState} from 'react';
import Navbar from "../../components/navbar/Navbar"
import UserForm from "../../components/use-form/UseForm";
import { createUser } from "../../services/api";

const DashboardAsistente = () => {
  const [showForm, setShowForm] = useState(false);

  const handleCreateUser = async (formData) => {
    try {
      await createUser(formData);
      alert("Usuario creado exitosamente");
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
        {showForm && <UserForm onClose={() => setShowForm(false)} onSubmit={handleCreateUser} />}
      </div>
    </div>
  );
};

export default DashboardAsistente;