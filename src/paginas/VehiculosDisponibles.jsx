import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import vehiculos from "../data/vehiculos";

const VehiculosDisponibles = () => {
  const [vehiculosDisponibles, setVehiculosDisponibles] = useState([]);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [inicioAlquiler, setInicioAlquiler] = useState(dayjs());
  const [finAlquiler, setFinAlquiler] = useState(dayjs().add(1, "hour"));
  const [costoSimulado, setCostoSimulado] = useState(0);

  useEffect(() => {
    setVehiculosDisponibles(vehiculos);
  }, []);

  useEffect(() => {
    if (vehiculoSeleccionado) {
      const horasAlquiler = finAlquiler.diff(inicioAlquiler, "hour");
      const costo = horasAlquiler * vehiculoSeleccionado.costoPorHora;
      setCostoSimulado(costo);
    }
  }, [inicioAlquiler, finAlquiler, vehiculoSeleccionado]);

  const handleSeleccionarVehiculo = (vehiculo) => {
    setVehiculoSeleccionado(vehiculo);
  };

  const handleVolver = () => {
    setVehiculoSeleccionado(null);
    setCostoSimulado(0);
  };

  const handleAlquilar = () => {
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

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Row className="my-4">
                  <Col md={6} xs={12} className="mb-3">
                    <DateTimePicker
                      label="Inicio de Alquiler"
                      value={inicioAlquiler}
                      onChange={(newValue) => setInicioAlquiler(newValue)}
                      renderInput={(params) => (
                        <input {...params} className="form-control my-2" />
                      )}
                    />
                  </Col>
                  <Col md={6} xs={12} className="mb-3">
                    <DateTimePicker
                      label="Fin de Alquiler"
                      value={finAlquiler}
                      onChange={(newValue) => setFinAlquiler(newValue)}
                      renderInput={(params) => (
                        <input {...params} className="form-control my-2" />
                      )}
                    />
                  </Col>
                </Row>
              </LocalizationProvider>

              {costoSimulado > 0 && (
                <p>
                  <strong>Costo Total:</strong> ${costoSimulado}
                </p>
              )}

              <Button
                variant="danger"
                onClick={handleAlquilar}
                className="w-100"
              >
                Alquilar Vehículo
              </Button>

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
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default VehiculosDisponibles;
