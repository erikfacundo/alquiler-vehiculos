import axios from "axios";
import React, { useEffect, useState } from "react";

const PanelControl = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [showForm, setShowForm] = useState(false); // Para mostrar/ocultar formulario
  const [nuevoVehiculo, setNuevoVehiculo] = useState({
    modelo: "",
    descripcion: "",
    costoPorHora: "",
    potencia: "",
    consumo: "",
    comodidades: "",
    pros: "",
    contras: "",
    disponible: true, // O false
    imagenes: "", // Ruta de la imagen
  });

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    getVehiculos();
  }, []);

  // Obtener los vehículos
  const getVehiculos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/vehiculos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehiculos(response.data);
    } catch (error) {
      console.error("Error al obtener vehículos:", error);
    }
  };

  // Cambiar disponibilidad del vehículo
  const cambiarDisponibilidad = async (id, disponible) => {
    try {
      await axios.put(
        `http://localhost:3000/api/vehiculos/${id}/disponibilidad`,
        { disponible }
      );
      getVehiculos();
    } catch (error) {
      console.error("Error al actualizar disponibilidad:", error);
    }
  };

  // Función para eliminar un vehículo
  const eliminarVehiculo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/vehiculos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehiculos(vehiculos.filter((vehiculo) => vehiculo.id !== id));
      alert("Vehículo eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar vehículo:", error);
    }
  };

  // Toggle para mostrar u ocultar el formulario
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // Manejo de cambios en los campos del formulario
  const handleInputChange = (e) => {
    setNuevoVehiculo({
      ...nuevoVehiculo,
      [e.target.name]: e.target.value,
    });
  };

  // Crear un nuevo vehículo
  const crearVehiculo = async () => {
    try {
      await axios.post("http://localhost:3000/api/vehiculos", nuevoVehiculo);
      setShowForm(false); // Ocultar el formulario después de crear el vehículo
      getVehiculos(); // Recargar los vehículos
      alert("Vehículo creado exitosamente");
    } catch (error) {
      console.error("Error al crear vehículo:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center">Panel de Control</h1>
      <p className="text-center">Vista solo para administradores.</p>

      {/* Botón para mostrar el formulario */}
      <button className="btn btn-primary mb-3" onClick={toggleForm}>
        Agregar nuevo vehículo
      </button>

      {/* Formulario de agregar vehículo */}
      {showForm && (
        <div className="mb-4">
          <h2>Nuevo Vehículo</h2>
          <div>
            <input
              type="text"
              name="modelo"
              value={nuevoVehiculo.modelo}
              onChange={handleInputChange}
              placeholder="Modelo del vehículo"
              className="form-control mb-2"
            />
            <textarea
              name="descripcion"
              value={nuevoVehiculo.descripcion}
              onChange={handleInputChange}
              placeholder="Descripción del vehículo"
              className="form-control mb-2"
            />
            <input
              type="number"
              name="costoPorHora"
              value={nuevoVehiculo.costoPorHora}
              onChange={handleInputChange}
              placeholder="Costo por hora"
              className="form-control mb-2"
            />
            <input
              type="number"
              name="potencia"
              value={nuevoVehiculo.potencia}
              onChange={handleInputChange}
              placeholder="Potencia"
              className="form-control mb-2"
            />
            <input
              type="number"
              name="consumo"
              value={nuevoVehiculo.consumo}
              onChange={handleInputChange}
              placeholder="Consumo"
              className="form-control mb-2"
            />
            <input
              type="text"
              name="comodidades"
              value={nuevoVehiculo.comodidades}
              onChange={handleInputChange}
              placeholder="Comodidades"
              className="form-control mb-2"
            />
            <input
              type="text"
              name="pros"
              value={nuevoVehiculo.pros}
              onChange={handleInputChange}
              placeholder="Pros"
              className="form-control mb-2"
            />
            <input
              type="text"
              name="contras"
              value={nuevoVehiculo.contras}
              onChange={handleInputChange}
              placeholder="Contras"
              className="form-control mb-2"
            />
            <input
              type="text"
              name="imagenes"
              value={nuevoVehiculo.imagenes}
              onChange={handleInputChange}
              placeholder="Ruta de la imagen"
              className="form-control mb-2"
            />
            <select
              name="disponible"
              value={nuevoVehiculo.disponible}
              onChange={handleInputChange}
              className="form-control mb-2"
            >
              <option value={true}>Disponible</option>
              <option value={false}>Alquilado</option>
            </select>
            <button className="btn btn-success" onClick={crearVehiculo}>
              Crear Vehículo
            </button>
          </div>
        </div>
      )}

      {/* Tabla de vehículos */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Modelo</th>
            <th>Descripción</th>
            <th>Costo/Hora</th>
            <th>Potencia</th>
            <th>Consumo</th>
            <th>Comodidades</th>
            <th>Pros</th>
            <th>Contras</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.map((vehiculo) => (
            <tr key={vehiculo.id}>
              <td>{vehiculo.id}</td>
              <td>{vehiculo.modelo}</td>
              <td>{vehiculo.descripcion}</td>
              <td>{vehiculo.costoPorHora}</td>
              <td>{vehiculo.potencia}</td>
              <td>{vehiculo.consumo}</td>
              <td>{vehiculo.comodidades}</td>
              <td>{vehiculo.pros}</td>
              <td>{vehiculo.contras}</td>
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
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => eliminarVehiculo(vehiculo.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PanelControl;
