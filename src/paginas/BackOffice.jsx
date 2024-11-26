import React, { useState } from 'react';
import { Button, Row, Col, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import vehiculosData from '../data/vehiculos'; // Ajusta la ruta según tu estructura

const BackOffice = () => {
  const [vehiculos, setVehiculos] = useState(vehiculosData);
  const history = useHistory();

  const toggleEstado = (id) => {
    const vehiculo = vehiculos.find((v) => v.id === id);
    Swal.fire({
      title: `¿Estás seguro de ${vehiculo.disponible ? 'deshabilitar' : 'habilitar'} este vehículo?`,
      text: `Modelo: ${vehiculo.modelo}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedVehiculos = vehiculos.map((v) =>
          v.id === id ? { ...v, disponible: !v.disponible } : v
        );
        setVehiculos(updatedVehiculos);
      }
    });
  };

  const handleLogout = () => {
    history.push('/');
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">BackOffice - Vehículos</h1>
      <Button variant="secondary" onClick={handleLogout} className="mb-4">
        Cerrar sesión
      </Button>
      <Row>
        <Col md={12}>
          <Table striped bordered hover>
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
                  <td>{vehiculo.disponible ? 'Habilitado' : 'Deshabilitado'}</td>
                  <td>
                    <Button
                      variant={vehiculo.disponible ? 'danger' : 'success'}
                      onClick={() => toggleEstado(vehiculo.id)}
                    >
                      {vehiculo.disponible ? 'Deshabilitar' : 'Habilitar'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default BackOffice;
