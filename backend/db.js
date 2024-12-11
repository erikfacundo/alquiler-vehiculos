// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Asegúrate de que esta contraseña sea correcta
  database: 'alquiler_vehiculos',
  port: 3306, // Asegúrate de que este puerto coincida con el configurado en MySQL
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos.');
});

module.exports = connection;
