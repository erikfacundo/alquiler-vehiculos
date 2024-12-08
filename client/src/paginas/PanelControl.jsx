import React from 'react';

const PanelControl = () => (
  <div>
    <h1 className="text-center">Panel de Control</h1>
    <p className="text-center">Vista solo para administradores.</p>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Vehículo</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Juan Pérez</td>
          <td>Ford Fiesta</td>
          <td>Alquilado</td>
        </tr>
        <tr>
          <td>2</td>
          <td>María García</td>
          <td>Chevrolet Onix</td>
          <td>Disponible</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default PanelControl;