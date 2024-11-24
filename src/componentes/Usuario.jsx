import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Usuario = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUsuario(currentUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSave = () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const updatedUsuarios = usuarios.map((u) =>
      u.email === usuario.email ? usuario : u
    );
    localStorage.setItem("usuarios", JSON.stringify(updatedUsuarios));
    localStorage.setItem("currentUser", JSON.stringify(usuario));
    Swal.fire("Datos actualizados", "Tu perfil ha sido actualizado", "success");
  };

  if (!usuario) return <h2>Cargando perfil...</h2>;

  return (
    <div className="container">
      <h1 className="text-center my-4">Perfil de Usuario</h1>
      <form
        className="p-4 shadow rounded"
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <div className="mb-3">
          <label htmlFor="usuario" className="form-label">
            Nombre de Usuario
          </label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={usuario.usuario || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="edad" className="form-label">
            Edad
          </label>
          <input
            type="number"
            id="edad"
            name="edad"
            value={usuario.edad || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefono" className="form-label">
            Teléfono
          </label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            value={usuario.telefono || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="btn btn-primary w-100"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default Usuario;
