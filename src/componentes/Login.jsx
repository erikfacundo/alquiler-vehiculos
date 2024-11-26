// src/componentes/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("currentUser", JSON.stringify(response.data.usuario));
        login(response.data.usuario);

        // Mostrar mensaje de éxito
        Swal.fire(
          "Inicio de sesión",
          `¡Bienvenido, ${response.data.usuario.usuario}!`,
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
    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      // Mostrar detalles del error
      if (error.response) {
        Swal.fire(
          "Error de conexión",
          error.response.data.message || "Hubo un problema al intentar iniciar sesión.",
          "error"
        );
      } else {
        Swal.fire("Error de conexión", "No se pudo conectar al servidor.", "error");
      }
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
      </form>
    </div>
  );
};

export default Login;
