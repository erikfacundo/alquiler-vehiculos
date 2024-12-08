import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import vehiculos from "../data/vehiculos";

const VehiculosDisponibles = () => {
  const [vehiculosDisponibles, setVehiculosDisponibles] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  useEffect(() => {
    const vehiculosGuardados =
      JSON.parse(localStorage.getItem("vehiculos")) || vehiculos;
    setVehiculosDisponibles(vehiculosGuardados);

    const usuario = JSON.parse(localStorage.getItem("currentUser"));
    setUsuarioLogueado(usuario);
  }, []);

  const handleSeleccionarVehiculo = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
  };

  const handleVolver = () => {
    setVehiculoSeleccionado(null);
  };

  const handleAlquilar = (vehiculo) => {
    if (!usuarioLogueado) {
      Swal.fire({
        title: "Iniciar sesión",
        text: "Para alquilar un vehículo, debes iniciar sesión.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iniciar sesión",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    const vehiculosActualizados = vehiculosDisponibles.map((v) =>
      v.id === vehiculo.id ? { ...v, disponible: false } : v
    );
    setVehiculosDisponibles(vehiculosActualizados);
    localStorage.setItem("vehiculos", JSON.stringify(vehiculosActualizados));

    Swal.fire(
      "Alquiler Exitoso",
      `Has alquilado el vehículo ${vehiculo.modelo} con éxito.`,
      "success"
    );
    setVehiculoSeleccionado(null);
  };

  const handleRestablecerDisponibilidad = (vehiculo) => {
    const vehiculosActualizados = vehiculosDisponibles.map((v) =>
      v.id === vehiculo.id ? { ...v, disponible: true } : v
    );
    setVehiculosDisponibles(vehiculosActualizados);
    localStorage.setItem("vehiculos", JSON.stringify(vehiculosActualizados));

    Swal.fire(
      "Disponibilidad Restablecida",
      `El vehículo ${vehiculo.modelo} ha sido marcado como disponible.`,
      "success"
    );
    setVehiculoSeleccionado(null);
  };

  return (
    <div className="container">
      {!vehiculoSeleccionado ? (
        <div>
          <h1 className="my-4 text-center">Vehículos Disponibles</h1>
          <Row>
            {vehiculosDisponibles.map((vehiculo) => (
              <Col md={4} key={vehiculo.id} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={vehiculo.imagenes[0]}
                    className="img-fluid"
                  />
                  <Card.Body>
                    <Card.Title>{vehiculo.modelo}</Card.Title>
                    <Card.Text>{vehiculo.descripcion}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleSeleccionarVehiculo(vehiculo)}
                      className="w-100"
                    >
                      Ver Detalles
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div className="vehiculo-detalle my-5">
          <Button variant="secondary" onClick={handleVolver} className="mb-3">
            Volver
          </Button>
          <Row>
            <Col
              md={6}
              className="d-flex justify-content-center align-items-center"
            >
              <img
                src={vehiculoSeleccionado.imagenes[0]}
                alt={vehiculoSeleccionado.modelo}
                className="img-fluid mb-4"
              />
            </Col>
            <Col md={6}>
              <h2>{vehiculoSeleccionado.modelo}</h2>
              <p>
                <strong>Descripción:</strong> {vehiculoSeleccionado.descripcion}
              </p>
              <p>
                <strong>Costo por hora:</strong> $
                {vehiculoSeleccionado.costoPorHora}
              </p>

              <div className="mt-4">
                <h4>Detalles del Vehículo</h4>
                <Table striped bordered hover>
                  <tbody>
                    <tr>
                      <th>Potencia</th>
                      <td>{vehiculoSeleccionado.potencia}</td>
                    </tr>
                    <tr>
                      <th>Consumo</th>
                      <td>{vehiculoSeleccionado.consumo}</td>
                    </tr>
                    <tr>
                      <th>Comodidades</th>
                      <td>{vehiculoSeleccionado.comodidades}</td>
                    </tr>
                    <tr>
                      <th>Pros</th>
                      <td>{vehiculoSeleccionado.pros}</td>
                    </tr>
                    <tr>
                      <th>Contras</th>
                      <td>{vehiculoSeleccionado.contras}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              {vehiculoSeleccionado.disponible ? (
                <Button
                  variant="success"
                  onClick={() => handleAlquilar(vehiculoSeleccionado)}
                  className="w-100"
                >
                  Alquilar Vehículo
                </Button>
              ) : (
                <div>
                  <Button variant="secondary" className="w-100 mb-2" disabled>
                    No Disponible
                  </Button>
                  {usuarioLogueado && usuarioLogueado.isAdmin && (
                    <Button
                      variant="warning"
                      onClick={() =>
                        handleRestablecerDisponibilidad(vehiculoSeleccionado)
                      }
                      className="w-100"
                    >
                      Marcar como Disponible
                    </Button>
                  )}
                </div>
              )}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default VehiculosDisponibles;
