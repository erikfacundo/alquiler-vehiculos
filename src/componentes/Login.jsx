import React from 'react';
import Swal from 'sweetalert2';

const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    Swal.fire('Inicio de sesión', 'Usuario autenticado con éxito', 'success');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
  <form 
    onSubmit={handleLogin} 
    className="p-4 shadow rounded text-center" 
    style={{ width: '350px', backgroundColor: '#f8f9fa' }}
  >
    <h2 className="mb-4">Iniciar Sesión</h2>

    <div className="mb-3 text-start">
      <label htmlFor="usuario" className="form-label">Usuario</label>
      <input 
        type="text" 
        id="usuario" 
        className="form-control" 
        placeholder="Ingresa tu usuario" 
        required 
      />
    </div>

    <div className="mb-3 text-start">
      <label htmlFor="password" className="form-label">Contraseña</label>
      <input 
        type="password" 
        id="password" 
        className="form-control" 
        placeholder="Ingresa tu contraseña" 
        required 
      />
    </div>

    <button type="submit" className="btn btn-primary w-100">Ingresar</button>
  </form>
</div>

  );
};

export default Login;
