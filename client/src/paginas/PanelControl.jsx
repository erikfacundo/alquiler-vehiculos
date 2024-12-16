import axios from "axios";
import React, { useEffect, useState } from "react";

const PanelControl = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const token = localStorage.getItem("authToken"); // Token de autorización

  // Obtener vehículos solo una vez cuando el componente se monte
  useEffect(() => {
    getVehiculos();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Función para obtener los vehículos
  const getVehiculos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/vehiculos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehiculos(response.data); // Asigna los vehículos al estado
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
    }
  };

  // Cambiar la disponibilidad de un vehículo
  const cambiarDisponibilidad = async (id, disponible) => {
    try {
      await axios.put(
        `http://localhost:3000/api/vehiculos/${id}/disponibilidad`, // URL del endpoint
        { disponible }
      );
      // Después de cambiar la disponibilidad, volvemos a obtener los vehículos
      getVehiculos();
    } catch (error) {
      console.error("Error al actualizar disponibilidad:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center">Panel de Control</h1>
      <p className="text-center">Vista solo para administradores.</p>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vehículo</th>
            <th>Usuario</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((vehiculo) => (
            <tr key={vehiculo.id}>
              <td>{vehiculo.id}</td>
              <td>{vehiculo.modelo}</td>
              <td>Usuario</td>
              <td>{vehiculo.disponible ? "Disponible" : "Alquilado"}</td>
              <td>
                {vehiculo.disponible ? (
                  <button
                    className="btn btn-warning"
                    onClick={() => cambiarDisponibilidad(vehiculo.id, 0)}
                  >
                    Aprobar
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={() => cambiarDisponibilidad(vehiculo.id, 1)}
                  >
                    Pasar a disponible
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PanelControl;
