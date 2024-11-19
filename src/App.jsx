// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import PiePagina from './componentes/PiePagina';
import Login from './componentes/Login';
import Inicio from './paginas/Inicio';
import VehiculosDisponibles from './paginas/VehiculosDisponibles';
import Nosotros from './paginas/Nosotros';
import Contacto from './paginas/Contacto';
import PanelControl from './paginas/PanelControl';

function App() {
  // Estado para manejar la autenticación del usuario
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para manejar el login, por ejemplo, en Login.jsx
  const login = () => {
    setIsAuthenticated(true);
  };

  // Componente de ruta privada para proteger páginas como el PanelControl
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar />
      <div className="d-flex flex-column min-vh-100">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/vehiculos" element={<VehiculosDisponibles />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login login={login} />} />

          {/* Rutas privadas protegidas */}
          <Route path="/panel-control" element={<PrivateRoute element={<PanelControl />} />} />
        </Routes>
      </div>
      <PiePagina />
    </Router>
  );
}

export default App;
