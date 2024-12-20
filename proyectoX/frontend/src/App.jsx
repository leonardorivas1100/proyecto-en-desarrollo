import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardAdmin from './pages//Dashboards/DashboardAdmin';
import DashboardAsistente from './pages//Dashboards/DashboardAsistente';
import DashboardCliente from './pages/Dashboards/DashboardCliente';
import PrivateRoute from './components/PrivateRoute'; // Importa el componente

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para el login */}
        <Route path="/" element={<LoginPage />} />

        {/* Rutas protegidas por rol */}
        <Route 
          path="/dashboard/admin" 
          element={
            <PrivateRoute requiredRole="administrador">
              <DashboardAdmin />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/dashboard/asistente" 
          element={
            <PrivateRoute requiredRole="asistente">
              <DashboardAsistente />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/dashboard/cliente" 
          element={
            <PrivateRoute requiredRole="cliente">
              <DashboardCliente />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
