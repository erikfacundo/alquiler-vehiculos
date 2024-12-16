// src/App.jsx
import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Verificar si hay un usuario autenticado en el localStorage al cargar la aplicación
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  // const PrivateRoute = ({ element }) => {
  //   return currentUser ? element : <Navigate to="/login" />;
  // };

  return (
    <Router>
      <Navbar currentUser={currentUser} logout={logout} />
      <div className="d-flex flex-column min-vh-100">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/vehiculos" element={<VehiculosDisponibles />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/panel-control" element={<PanelControl />} />
        </Routes>
      </div>
      <PiePagina />
    </Router>
  );
}

export default App;
