// src/componentes/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioValido = usuarios.find(
      (usuario) => usuario.email === email && usuario.password === password
    );

    if (usuarioValido) {
      login(usuarioValido);

      Swal.fire(
        "Inicio de sesión",
        `¡Bienvenido, ${usuarioValido.usuario}!`,
        "success"
      );
      navigate("/");
    } else {
      Swal.fire(
        "Error de inicio de sesión",
        "Email o contraseña incorrectos. Por favor, verifica tus datos.",
        "error"
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleLogin}
        className="p-4 shadow rounded text-center"
        style={{ width: "350px", backgroundColor: "#f8f9fa" }}
      >
        <h2 className="mb-4">Iniciar Sesión</h2>

        <div className="mb-3 text-start">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Ingresar
        </button>
        <p className="mt-3">
          ¿No tienes usuario? <Link to="/registro">Registrarme ahora</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
