// app.js
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Reemplaza con la URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json()); // Middleware para parsear cuerpos de solicitudes JSON

// Rutas
app.use('/api', routes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
