import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUsuarioLogueado(currentUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUsuarioLogueado(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <div className="navbar-brand-container">
          <Link className="navbar-brand" to="/">
            <img src="src/assets/img/logo.png" alt="Logo" className="logo" />
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              Menú
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/vehiculos">
                  Vehículos Disponibles
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nosotros">
                  Nosotros
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">
                  Contacto
                </Link>
              </li>
              {usuarioLogueado && usuarioLogueado.isAdmin && (
                <li className="nav-item">
                  <Link className="nav-link" to="/panelcontrol">
                    Panel de Control
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/registro">
                  Registro
                </Link>
              </li>
              <li className="nav-item">
                {usuarioLogueado ? (
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                    style={{ cursor: "pointer", textDecoration: "none" }}
                  >
                    Cerrar Sesión
                  </button>
                ) : (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
