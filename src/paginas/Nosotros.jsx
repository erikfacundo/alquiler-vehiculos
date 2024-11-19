import React from 'react';
import { FaCar, FaHandsHelping, FaSmile } from 'react-icons/fa';

const Nosotros = () => (
  <div className="nosotros-container py-5">
    <div className="container text-center">
      <h1 className="display-4 mb-4">Sobre Nosotros</h1>
      <p className="lead mb-5">
        En nuestra empresa, nos dedicamos a ofrecer la mejor experiencia en alquiler de vehículos. Nos importa tu comodidad, seguridad y satisfacción. ¡Ven y descubre por qué somos tu opción número uno!
      </p>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="feature-card p-4">
            <FaCar size={50} color="#666" />
            <h3 className="mt-3">Vehículos de Calidad</h3>
            <p>
              Contamos con una amplia flota de vehículos en perfecto estado, listos para tu próxima aventura o viaje de negocios.
            </p>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="feature-card p-4">
            <FaHandsHelping size={50} color="#666" />
            <h3 className="mt-3">Atención Personalizada</h3>
            <p>
              Nuestro equipo está siempre dispuesto a ayudarte a encontrar la mejor opción que se adapte a tus necesidades.
            </p>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="feature-card p-4">
            <FaSmile size={50} color="#666" />
            <h3 className="mt-3">Clientes Felices</h3>
            <p>
              La satisfacción de nuestros clientes es nuestra prioridad. Nos esforzamos para brindarte una experiencia única.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-5">
        <h2>¡Únete a nosotros y vive la experiencia de viajar con comodidad y seguridad!</h2>
        <p className="lead">Reserva hoy mismo y disfruta de un viaje sin preocupaciones.</p>
        <button className="btn btn-primary">Reserva Ahora</button>
      </div>
    </div>
  </div>
);

export default Nosotros;
