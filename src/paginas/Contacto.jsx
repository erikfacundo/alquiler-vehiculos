import React from 'react';

const Contacto = () => (
  <div className="text-center">
    <h1>Contacto</h1>
    <p>Si tienes alguna consulta, no dudes en contactarnos.</p>
    <form className="mx-auto" style={{ maxWidth: '500px' }}>
      <div className="form-group">
        <label>Nombre</label>
        <input type="text" className="form-control" placeholder="Tu nombre" required />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" className="form-control" placeholder="Tu email" required />
      </div>
      <div className="form-group">
        <label>Mensaje</label>
        <textarea className="form-control" rows="4" placeholder="Escribe tu mensaje" required></textarea>
      </div>
      <button type="submit" className="btn btn-primary mt-3">Enviar</button>
    </form>
  </div>
);

export default Contacto;