import React, { useState, useEffect } from "react";
import { Button, Row, Col, Card, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const vehiculos = [
  {
    id: 1,
    modelo: "BMW X5",
    marca: "BMW",
    imagenes: [
      "/src/assets/vehicles/bmw/320d.png",
      "/src/assets/vehicles/bmw/520i.png",
    ],
    descripcion: "SUV de lujo, gran desempeño y confort.",
    costoPorHora: 20,
    potencia: "250 CV",
    consumo: "10.5 L/100km",
    comodidades: "Aire acondicionado, Asientos de cuero, Cámara de reversa, Navegación GPS",
    pros: "Gran rendimiento, Tecnología avanzada, Confort superior",
    contras: "Consumo de combustible alto, Precio elevado",
  },
  {
    id: 2,
    modelo: "Hyundai Tucson",
    marca: "Hyundai",
    imagenes: [
      "/src/assets/vehicles/hyundai/bayon.png",
      "/src/assets/vehicles/hyundai/i20.png",
    ],
    descripcion: "SUV compacta con gran eficiencia de combustible.",
    costoPorHora: 18,
    potencia: "180 CV",
    consumo: "7.2 L/100km",
    comodidades: "Pantalla táctil, Sensores de estacionamiento, Asistente de cambio de carril",
    pros: "Eficiencia de combustible, Buen manejo, Asequible",
    contras: "Espacio limitado, Interior básico",
  },
  {
    id: 3,
    modelo: "Mercedes Benz Clase C",
    marca: "Mercedes",
    imagenes: [
      "/src/assets/vehicles/mercedes/mercedes-c200.png",
    ],
    descripcion: "Elegante sedán con tecnología avanzada.",
    costoPorHora: 25,
    potencia: "280 CV",
    consumo: "9.0 L/100km",
    comodidades: "Asientos de cuero, Sistema de sonido premium, Conducción autónoma parcial",
    pros: "Confort, Diseño elegante, Potencia",
    contras: "Alto costo de mantenimiento, Precio elevado",
  },
  {
    id: 4,
    modelo: "Nissan Altima",
    marca: "Nissan",
    imagenes: [
      "/src/assets/vehicles/nissan/qashqai.png",
    ],
    descripcion: "Sedán cómodo y económico para viajes largos.",
    costoPorHora: 22,
    potencia: "240 CV",
    consumo: "8.5 L/100km",
    comodidades: "Control de clima, Cámara de reversa, Conectividad Bluetooth",
    pros: "Comodidad, Económico, Buen rendimiento",
    contras: "Diseño básico, Sin opciones de lujo",
  },
  {
    id: 5,
    modelo: "Opel Astra",
    marca: "Opel",
    imagenes: [
      "/src/assets/vehicles/opel/astra.png",
    ],
    descripcion: "Compacto ideal para la ciudad, eficiente en combustible.",
    costoPorHora: 15,
    potencia: "150 CV",
    consumo: "6.5 L/100km",
    comodidades: "Pantalla táctil, Conectividad Apple CarPlay, Sensores de proximidad",
    pros: "Eficiencia, Precio accesible, Comodidad",
    contras: "Espacio limitado, Tecnología básica",
  },
  {
    id: 6,
    modelo: "Toyota Corolla",
    marca: "Toyota",
    imagenes: [
      "/src/assets/vehicles/toyota/corolla.png",
    ],
    descripcion: "Sedán confiable y económico para todo tipo de viaje.",
    costoPorHora: 17,
    potencia: "170 CV",
    consumo: "7.0 L/100km",
    comodidades: "Aire acondicionado, Sistema de seguridad avanzado, Conectividad",
    pros: "Fiabilidad, Bajo costo de mantenimiento, Buen consumo",
    contras: "Diseño conservador, Potencia moderada",
  }
];

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
              <Card.Img variant="top" src={vehiculo.imagenes[0]} className="img-fluid" />
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
        <Col md={6} className="d-flex justify-content-center align-items-center">
          <img
            src={vehiculoSeleccionado.imagenes[0]}
            alt={vehiculoSeleccionado.modelo}
            className="img-fluid mb-4"
          />
        </Col>
        <Col md={6}>
          <h2>{vehiculoSeleccionado.modelo}</h2>
          <p><strong>Descripción:</strong> {vehiculoSeleccionado.descripcion}</p>
          <p><strong>Costo por hora:</strong> ${vehiculoSeleccionado.costoPorHora}</p>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Row className="my-4">
              <Col md={6} xs={12} className="mb-3">
                <DateTimePicker
                  label="Inicio de Alquiler"
                  value={inicioAlquiler}
                  onChange={(newValue) => setInicioAlquiler(newValue)}
                  renderInput={(params) => <input {...params} className="form-control my-2" />}
                />
              </Col>
              <Col md={6} xs={12} className="mb-3">
                <DateTimePicker
                  label="Fin de Alquiler"
                  value={finAlquiler}
                  onChange={(newValue) => setFinAlquiler(newValue)}
                  renderInput={(params) => <input {...params} className="form-control my-2" />}
                />
              </Col>
            </Row>
          </LocalizationProvider>

          {costoSimulado > 0 && (
            <p><strong>Costo Total:</strong> ${costoSimulado}</p>
          )}

          <Button variant="danger" onClick={handleAlquilar} className="w-100">
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
