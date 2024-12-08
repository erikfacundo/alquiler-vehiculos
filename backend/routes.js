const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const db = require('./db');

// routes.js
const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


// Ruta para obtener los vehículos
app.get("/vehiculos", (req, res) => {
  const query = "SELECT * FROM vehiculos";
  db.query(query, (err, results) => {
      if (err) {
          console.error("Error al obtener los datos:", err);
          res.status(500).send("Error al obtener los datos");
      } else {
          res.json(results);
      }
  });
});

// Ruta para obtener todos los usuarios
app.get("/usuarios", (req, res) => {
  const query = "SELECT id, usuario, email FROM usuarios";
  db.query(query, (err, results) => {
      if (err) {
          console.error("Error al obtener los usuarios:", err);
          res.status(500).send("Error al obtener los usuarios");
      } else {
          res.json(results);  // Devolvemos los usuarios
      }
  });
});


app.post('/register', (req, res) => {
  const { usuario, email, password, isAdmin } = req.body;
  const query = 'INSERT INTO usuarios (usuario, email, password, isAdmin) VALUES (?, ?, ?, ?)';
  db.query(query, [usuario, email, password, isAdmin || 0], (err, results) => {
    if (err) {
      console.error('Error al registrar el usuario:', err);
      res.status(500).json({ error: 'Error al registrar el usuario' });
      return;
    }
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  });
});


module.exports = app;
