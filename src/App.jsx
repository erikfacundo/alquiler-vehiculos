// src/App.jsx
import React, { useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./componentes/Login";
import Navbar from "./componentes/Navbar";
import PiePagina from "./componentes/PiePagina";
import Registro from "./componentes/Registro";
import Contacto from "./paginas/Contacto";
import Inicio from "./paginas/Inicio";
import Nosotros from "./paginas/Nosotros";
import PanelControl from "./paginas/PanelControl";
import VehiculosDisponibles from "./paginas/VehiculosDisponibles";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

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
          <Route path="/registro" element={<Registro />} />

          <Route
            path="/panel-control"
            element={<PrivateRoute element={<PanelControl />} />}
          />
        </Routes>
      </div>
      <PiePagina />
    </Router>
  );
}

export default App;
