import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Inicio = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setUsuario(currentUser);
  }, []);

  return (
    <div className="home">
      <section className="hero bg-primary text-white py-6">
        <div className="container text-center">
          <h1 className="display-4 mb-3">
            {usuario
              ? `Bienvenido, ${usuario.usuario}`
              : "Bienvenidos al Alquiler de Vehículos"}
          </h1>
          <p className="lead mb-4">
            Explora nuestra selección de vehículos para alquilar y encuentra el
            que mejor se adapte a tus necesidades.
          </p>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <Link to="/vehiculos" className="btn btn-light btn-lg mr-2">
              Explorar Vehículos
            </Link>
            <Link to="/contacto" className="btn btn-outline-light btn-lg">
              Contacta con Nosotros
            </Link>
          </div>
        </div>
      </section>

      <section className="features py-5">
        <div className="container text-center">
          <h2 className="mb-5">¿Por qué elegirnos?</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <i className="fas fa-car fa-3x mb-3"></i>
                <h4>Vehículos de Calidad</h4>
                <p>
                  Solo ofrecemos vehículos de marcas confiables y en excelentes
                  condiciones para tu comodidad y seguridad.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <i className="fas fa-clock fa-3x mb-3"></i>
                <h4>Rápido y Fácil</h4>
                <p>
                  El proceso de alquiler es rápido, fácil y completamente en
                  línea, para que puedas disfrutar de tu viaje sin
                  complicaciones.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card">
                <i className="fas fa-thumbs-up fa-3x mb-3"></i>
                <h4>Excelente Servicio</h4>
                <p>
                  Nuestro equipo está siempre disponible para asistirte y
                  asegurarse de que tengas la mejor experiencia de alquiler.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-4">Lo que dicen nuestros clientes</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="testimonial">
                <p className="lead">
                  "El proceso de alquiler fue super sencillo y el vehículo
                  estaba impecable. ¡Sin duda volveré a alquilar!"
                </p>
                <p>
                  <strong>Juan Pérez</strong>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial">
                <p className="lead">
                  "Excelente atención al cliente, siempre dispuestos a ayudar.
                  Los vehículos son de calidad, 100% recomendados."
                </p>
                <p>
                  <strong>Laura Gómez</strong>
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial">
                <p className="lead">
                  "Alquilamos un coche para nuestras vacaciones y todo fue
                  perfecto. Súper rápidos y eficientes."
                </p>
                <p>
                  <strong>Carlos Ruiz</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
