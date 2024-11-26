import React, { useState } from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
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
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  const login = (usuario) => {
    if (usuario.isAdmin) {
      setUsuarioLogueado(usuario);
    }
  };

  // PrivateRoute ahora recibe children y no element
  const PrivateRoute = ({ children }) => {
    return usuarioLogueado ? children : <Navigate to="/login" />;
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
          
          {/* Aquí pasas el componente PanelControl como children */}
          <Route
            path="/panelcontrol"
            element={
              <PrivateRoute>
                <PanelControl />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <PiePagina />
    </Router>
  );
}

export default App;
