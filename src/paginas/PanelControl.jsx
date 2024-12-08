import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap'; 
import axios from 'axios'; 

const PanelControl = () => {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [vehiculos, setVehiculos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || !currentUser.isAdmin) {
      navigate("/");  // Redirigir si no es admin
    } else {
      setUsuarioLogueado(currentUser);
    }
    
    // Obtener vehículos desde el servidor
    axios.get('http://localhost:5000/vehiculos')
      .then(response => setVehiculos(response.data))
      .catch(error => console.error('Error al obtener vehículos:', error));
  }, [navigate]);

  // Agregar un vehículo
  const agregarVehiculo = (nuevoVehiculo) => {
    axios.post('http://localhost:5000/vehiculos', nuevoVehiculo)
      .then(response => {
        setVehiculos([...vehiculos, response.data]);
        alert('Vehículo agregado');
      })
      .catch(error => {
        console.error('Error al agregar vehículo:', error);
        alert('Error al agregar vehículo');
      });
  };

  // Editar un vehículo
  const editarVehiculo = (id, vehiculoActualizado) => {
    axios.put(`http://localhost:5000/vehiculos/${id}`, vehiculoActualizado)
      .then(response => {
        setVehiculos(vehiculos.map(vehiculo => 
          vehiculo.id === id ? { ...vehiculo, ...vehiculoActualizado } : vehiculo
        ));
        alert('Vehículo actualizado');
      })
      .catch(error => {
        console.error('Error al editar vehículo:', error);
        alert('Error al editar vehículo');
      });
  };

  // Eliminar un vehículo
  const eliminarVehiculo = (id) => {
    axios.delete(`http://localhost:5000/vehiculos/${id}`)
      .then(response => {
        setVehiculos(vehiculos.filter(vehiculo => vehiculo.id !== id));
        alert('Vehículo eliminado');
      })
      .catch(error => {
        console.error('Error al eliminar vehículo:', error);
        alert('Error al eliminar vehículo');
      });
  };

  // Cambiar estado habilitado/deshabilitado
  const toggleDisponibilidad = (id) => {
    const vehiculo = vehiculos.find(vehiculo => vehiculo.id === id);
    const vehiculoActualizado = { ...vehiculo, disponible: !vehiculo.disponible };
    
    editarVehiculo(id, vehiculoActualizado);
  };

  return (
    <div>
      {usuarioLogueado && usuarioLogueado.isAdmin && (
        <>
          <h1 className="text-center">Panel de Control</h1>
          <p className="text-center">Vista solo para administradores.</p>

          {/* Botón para agregar un vehículo */}
          <button className="btn btn-primary mb-3" onClick={() => agregarVehiculo({
            id: vehiculos.length + 1, 
            modelo: "Nuevo Modelo", 
            marca: "Nueva Marca",
            imagenes: ["/src/assets/vehicles/default.png"],
            descripcion: "Descripción del nuevo vehículo.",
            costoPorHora: 10,
            potencia: "150 CV",
            consumo: "8.0 L/100km",
            comodidades: "Comodidad básica",
            pros: "Pros básicos",
            contras: "Contras básicos",
            disponible: true
          })}>
            Agregar Vehículo
          </button>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Modelo</th>
                <th>Marca</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehiculos.map((vehiculo) => (
                <tr key={vehiculo.id}>
                  <td>{vehiculo.id}</td>
                  <td>{vehiculo.modelo}</td>
                  <td>{vehiculo.marca}</td>
                  <td>
                    {/* Switch para cambiar la disponibilidad */}
                    <Form.Check
                      type="switch"
                      id={`disponibilidad-switch-${vehiculo.id}`}
                      checked={vehiculo.disponible}
                      onChange={() => toggleDisponibilidad(vehiculo.id)}
                      label={vehiculo.disponible ? 'Habilitado' : 'Deshabilitado'}
                    />
                  </td>
                  <td>
                    <button className="btn btn-warning" onClick={() => editarVehiculo(vehiculo.id, {
                      modelo: 'Nuevo Modelo Editado'
                    })}>Editar</button>
                    <button className="btn btn-danger" onClick={() => eliminarVehiculo(vehiculo.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default PanelControl;
