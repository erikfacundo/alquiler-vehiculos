import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import Swal from "sweetalert2";

const VehiculosDisponibles = () => {
  const [vehiculosDisponibles, setVehiculosDisponibles] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  useEffect(() => {
    // Consumir datos desde el backend
    axios
      .get("http://localhost:3000/api/vehiculos") // Cambia la URL por la de tu backend
      .then((response) => {
        setVehiculosDisponibles(response.data);
        console.log(response.data); // Asigna los datos del backend al estado
      })
      .catch((error) => {
        console.error("Error al cargar los datos de vehículos:", error);
        Swal.fire(
          "Error",
          "Hubo un problema al cargar los datos de vehículos. Intenta nuevamente.",
          "error"
        );
      });

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

    Swal.fire(
      "Solicitud de alquiler enviada",
      `Su solicitud fue enviada con éxito para el vehículo ${vehiculo.modelo}.`,
      "success"
    );
    setVehiculoSeleccionado(null);
  };

  const handleRestablecerDisponibilidad = (vehiculo) => {
    const vehiculosActualizados = vehiculosDisponibles.map((v) =>
      v.id === vehiculo.id ? { ...v, disponible: true } : v
    );
    setVehiculosDisponibles(vehiculosActualizados);

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
                <Card className="position-relative">
                  <Card.Img
                    variant="top"
                    src={`/src/assets/vehicles/${vehiculo.id}/${vehiculo.imagenes}`}
                    className={`img-fluid ${
                      !vehiculo.disponible && "opacity-50"
                    }`}
                  />
                  {!vehiculo.disponible && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-danger bg-opacity-75">
                      <h4 className="text-white">Vehículo Alquilado</h4>
                    </div>
                  )}
                  <Card.Body>
                    <Card.Title>{vehiculo.modelo}</Card.Title>
                    <Card.Text>{vehiculo.descripcion}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleSeleccionarVehiculo(vehiculo)}
                      className="w-100"
                      disabled={!vehiculo.disponible}
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
                src={`/src/assets/vehicles/${vehiculoSeleccionado.id}/${vehiculoSeleccionado.imagenes}`}
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
