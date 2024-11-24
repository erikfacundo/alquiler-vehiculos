import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Admin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    const usuariosData = JSON.parse(localStorage.getItem("usuarios")) || [];
    const vehiculosData = JSON.parse(localStorage.getItem("vehiculos")) || [];
    setUsuarios(usuariosData);
    setVehiculos(vehiculosData);
  }, []);

  const handleEditarUsuario = (index, campo, valor) => {
    const updatedUsuarios = [...usuarios];
    updatedUsuarios[index][campo] = valor;
    setUsuarios(updatedUsuarios);
  };

  const handleGuardarUsuarios = () => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    Swal.fire(
      "Usuarios Actualizados",
      "Se han guardado los cambios",
      "success"
    );
  };

  const handleEditarVehiculo = (index, campo, valor) => {
    const updatedVehiculos = [...vehiculos];
    updatedVehiculos[index][campo] = valor;
    setVehiculos(updatedVehiculos);
  };

  const handleGuardarVehiculos = () => {
    localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
    Swal.fire(
      "Vehículos Actualizados",
      "Se han guardado los cambios en los vehículos",
      "success"
    );
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Panel de Administrador</h1>

      <h3>Editar Usuarios</h3>
      {usuarios.map((usuario, index) => (
        <div key={index} className="mb-3 p-3 border rounded">
          <input
            type="text"
            value={usuario.usuario}
            onChange={(e) =>
              handleEditarUsuario(index, "usuario", e.target.value)
            }
            className="form-control mb-2"
            placeholder="Nombre de Usuario"
          />
          <input
            type="email"
            value={usuario.email}
            disabled
            className="form-control mb-2"
          />
        </div>
      ))}
      <button
        onClick={handleGuardarUsuarios}
        className="btn btn-success mb-4 w-100"
      >
        Guardar Cambios en Usuarios
      </button>

      <h3>Editar Vehículos</h3>
      {vehiculos.map((vehiculo, index) => (
        <div key={index} className="mb-3 p-3 border rounded">
          <input
            type="text"
            value={vehiculo.modelo}
            onChange={(e) =>
              handleEditarVehiculo(index, "modelo", e.target.value)
            }
            className="form-control mb-2"
            placeholder="Modelo"
          />
          <input
            type="number"
            value={vehiculo.costoPorHora}
            onChange={(e) =>
              handleEditarVehiculo(index, "costoPorHora", e.target.value)
            }
            className="form-control mb-2"
            placeholder="Costo por Hora"
          />
          <label className="form-check-label me-2">Disponible:</label>
          <input
            type="checkbox"
            checked={vehiculo.disponible}
            onChange={(e) =>
              handleEditarVehiculo(index, "disponible", e.target.checked)
            }
          />
        </div>
      ))}
      <button
        onClick={handleGuardarVehiculos}
        className="btn btn-success w-100"
      >
        Guardar Cambios en Vehículos
      </button>
    </div>
  );
};

export default Admin;
