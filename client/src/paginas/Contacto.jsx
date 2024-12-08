// src/paginas/Contacto.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Contacto = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Mensaje enviado",
      text: "Tu mensaje ha sido enviado con éxito. Nos pondremos en contacto contigo pronto.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="text-center">
      <h1>Contacto</h1>
      <p>Si tienes alguna consulta, no dudes en contactarnos.</p>
      <form
        className="mx-auto"
        style={{ maxWidth: "500px" }}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="Tu nombre"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Tu email"
            required
          />
        </div>
        <div className="form-group">
          <label>Mensaje</label>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Escribe tu mensaje"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Contacto;
