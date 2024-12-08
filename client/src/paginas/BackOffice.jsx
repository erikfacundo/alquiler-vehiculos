import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const vehiculos = [
  { id: 1, modelo: 'BMW X5', estado: 'habilitado' },
  { id: 2, modelo: 'Hyundai Tucson', estado: 'habilitado' },
  { id: 3, modelo: 'Mercedes Benz Clase C', estado: 'habilitado' },
  { id: 4, modelo: 'Nissan Altima', estado: 'habilitado' },
  { id: 5, modelo: 'Opel Astra', estado: 'habilitado' },
  { id: 6, modelo: 'Toyota Corolla', estado: 'habilitado' },
];

const BackOffice = () => {
  const [vehiculosState, setVehiculosState] = useState(vehiculos);
  const history = useHistory();

  useEffect(() => {
  
  }, []);

  const toggleEstado = (id) => {
    const updatedVehiculos = vehiculosState.map((vehiculo) =>
      vehiculo.id === id
        ? { ...vehiculo, estado: vehiculo.estado === 'habilitado' ? 'deshabilitado' : 'habilitado' }
        : vehiculo
    );
    setVehiculosState(updatedVehiculos);
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
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehiculosState.map((vehiculo) => (
                <tr key={vehiculo.id}>
                  <td>{vehiculo.id}</td>
                  <td>{vehiculo.modelo}</td>
                  <td>{vehiculo.estado}</td>
                  <td>
                    <Button
                      variant={vehiculo.estado === 'habilitado' ? 'danger' : 'success'}
                      onClick={() => toggleEstado(vehiculo.id)}
                    >
                      {vehiculo.estado === 'habilitado' ? 'Deshabilitar' : 'Habilitar'}
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
