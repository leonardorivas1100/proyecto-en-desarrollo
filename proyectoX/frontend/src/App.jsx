import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Importa el AuthProvider
import LoginPage from './pages/login-page';
import DashboardAdmin from './pages/dashboards/dashboard-administrador';
import DashboardAsistente from './pages/dashboards/dashboard-asistente';
import DashboardCliente from './pages/dashboards/dashboard-cliente';
import DashboardNo from './pages/dashboards/dashboard-denied-access'; // Ruta correcta del archivo
import PrivateRoute from './components/protect-route/ProtectRoute'; // Importa el componente de rutas protegidas
import HomePage from './pages/home-page'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>

          {/* Ruta para la página principal */}
          <Route path="/" element={<HomePage />} />

          {/* Ruta para el login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Rutas protegidas por rol */}
          <Route 
            path="/dashboard/administrador" 
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
          
          <Route path="/dashboard/no-permiso" element={<DashboardNo />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
