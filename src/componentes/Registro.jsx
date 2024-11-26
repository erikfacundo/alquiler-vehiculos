import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios"; // Necesitarás instalar axios para hacer peticiones HTTP

const Registro = () => {
  const [dataForm, setDataForm] = useState({
    usuario: "",
    password: "",
    email: "",
    isAdmin: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDataForm({
      ...dataForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar los datos al servidor
      const response = await axios.post("http://localhost:5000/registro", dataForm);

      console.log("Respuesta del servidor:", response.data);

      Swal.fire({
        title: "Registro Exitoso",
        text: "Usuario registrado exitosamente. Ahora puedes iniciar sesión.",
        icon: "success",
        confirmButtonText: "Ir al Login",
      }).then(() => {
        navigate("/login");
      });

      // Limpiar el formulario después de un registro exitoso
      setDataForm({
        usuario: "",
        password: "",
        email: "",
        isAdmin: false,
      });
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al registrar el usuario.",
        icon: "error",
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
        <h2 className="mb-4">Crear Usuario</h2>

        <div className="mb-3 text-start">
          <label htmlFor="usuario" className="form-label">
            Usuario
          </label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={dataForm.usuario}
            onChange={handleChange}
            className="form-control"
            placeholder="Ingresa tu usuario"
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
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            className="form-control"
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Ingresa tu email"
            required
          />
        </div>

{/*         <div>
          <input
            type="checkbox"
            name="isAdmin"
            checked={dataForm.isAdmin}
            onChange={handleChange}
          />
          <label htmlFor="isAdmin" className="form-label">
            ¿Perfil Administrador?
          </label>
        </div> */}

        <button type="submit" className="btn btn-primary w-100">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registro;
