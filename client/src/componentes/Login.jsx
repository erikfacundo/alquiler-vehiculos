// src/componentes/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        { email, password }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Guarda el token
        localStorage.setItem("username", response.data.username); // Guarda el nombre
        localStorage.setItem("isAdmin", response.data.isAdmin); // Guarda si es admin

        Swal.fire({
          title: "Bienvenido",
          text: "Inicio de sesión exitoso.",
          icon: "success",
          confirmButtonText: "Ir al inicio",
        }).then(() => {
          navigate("/"); // Redirige a la página principal
        });
      } else {
        Swal.fire({
          title: "Error en el inicio de sesión",
          text: "Email o contraseña incorrectos.",
          icon: "error",
          confirmButtonText: "Intentar de nuevo",
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Swal.fire({
        title: "Error en el inicio de sesión",
        text: "Ocurrió un error al intentar iniciar sesión.",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
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
