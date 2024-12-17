import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';

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

  // Función para eliminar un vehículo con confirmación de SweetAlert
  const eliminarVehiculo = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡Este vehículo será eliminado permanentemente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/vehiculos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVehiculos(vehiculos.filter((vehiculo) => vehiculo.id !== id));
        Swal.fire(
          'Eliminado!',
          'El vehículo ha sido eliminado.',
          'success'
        );
      } catch (error) {
        console.error("Error al eliminar vehículo:", error);
      }
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

  // Crear un nuevo vehículo y mostrar mensaje con SweetAlert
  const crearVehiculo = async () => {
    try {
      await axios.post("http://localhost:3000/api/vehiculos", nuevoVehiculo);
      setShowForm(false); // Ocultar el formulario después de crear el vehículo
      getVehiculos(); // Recargar los vehículos
      Swal.fire(
        '¡Éxito!',
        'Vehículo creado exitosamente.',
        'success'
      );
    } catch (error) {
      console.error("Error al crear vehículo:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-primary">Panel de Control</h1>
      <p className="text-center mb-4">Vista solo para administradores.</p>

      {/* Botón para mostrar el formulario */}
      <button className="btn btn-outline-primary mb-4" onClick={toggleForm}>
        {showForm ? "Cancelar" : "Agregar nuevo vehículo"}
      </button>

      {/* Formulario de agregar vehículo */}
      {showForm && (
        <div className="card shadow-sm p-4 mb-4">
          <h3 className="card-title text-center mb-4">Nuevo Vehículo</h3>
          <div>
            <div className="mb-3">
              <label className="form-label">Modelo</label>
              <input
                type="text"
                name="modelo"
                value={nuevoVehiculo.modelo}
                onChange={handleInputChange}
                placeholder="Modelo del vehículo"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                name="descripcion"
                value={nuevoVehiculo.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción del vehículo"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Costo por Hora</label>
              <input
                type="number"
                name="costoPorHora"
                value={nuevoVehiculo.costoPorHora}
                onChange={handleInputChange}
                placeholder="Costo por hora"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Potencia</label>
              <input
                type="number"
                name="potencia"
                value={nuevoVehiculo.potencia}
                onChange={handleInputChange}
                placeholder="Potencia"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Consumo</label>
              <input
                type="number"
                name="consumo"
                value={nuevoVehiculo.consumo}
                onChange={handleInputChange}
                placeholder="Consumo"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Comodidades</label>
              <input
                type="text"
                name="comodidades"
                value={nuevoVehiculo.comodidades}
                onChange={handleInputChange}
                placeholder="Comodidades"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Pros</label>
              <input
                type="text"
                name="pros"
                value={nuevoVehiculo.pros}
                onChange={handleInputChange}
                placeholder="Pros"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contras</label>
              <input
                type="text"
                name="contras"
                value={nuevoVehiculo.contras}
                onChange={handleInputChange}
                placeholder="Contras"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Imagenes</label>
              <input
                type="text"
                name="imagenes"
                value={nuevoVehiculo.imagenes}
                onChange={handleInputChange}
                placeholder="Ruta de la imagen"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select
                name="disponible"
                value={nuevoVehiculo.disponible}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value={true}>Disponible</option>
                <option value={false}>Alquilado</option>
              </select>
            </div>
            <button className="btn btn-success w-100" onClick={crearVehiculo}>
              Crear Vehículo
            </button>
          </div>
        </div>
      )}

      {/* Tabla de vehículos */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
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
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => cambiarDisponibilidad(vehiculo.id, !vehiculo.disponible)}
                  >
                    {vehiculo.disponible ? "Deshabilitar" : "Habilitar"}
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
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
    </div>
  );
};

export default PanelControl;
