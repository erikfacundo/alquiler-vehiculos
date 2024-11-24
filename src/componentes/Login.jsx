import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Obtener usuarios desde localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Validar credenciales
    const usuarioValido = usuarios.find(
      (usuario) => usuario.email === email && usuario.password === password
    );

    if (usuarioValido) {
      // Almacenar el usuario autenticado en localStorage
      localStorage.setItem("currentUser", JSON.stringify(usuarioValido));

      // Mostrar mensaje de éxito
      Swal.fire(
        "Inicio de sesión",
        `¡Bienvenido, ${usuarioValido.usuario}!`,
        "success"
      );

      // Redirigir o actualizar el estado global según tu lógica
      window.location.href = "/";
    } else {
      // Mostrar mensaje de error
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
