// routes.js
const express = require('express');
const router = express.Router();
const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ error: 'No se proporcionó un token' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido' });
    }
    req.user = decoded;
    next();
  });
};

// Registro de usuario
router.post('/register', async (req, res) => {
  const { usuario, email, password, isAdmin } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO usuarios (usuario, email, password, isAdmin) VALUES (?, ?, ?, ?)';
  
  db.query(query, [usuario, email, hashedPassword, isAdmin || 0], (err, results) => {
    if (err) {
      console.error('Error al registrar el usuario:', err);
      res.status(500).json({ error: 'Error al registrar el usuario' });
      return;
    }
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  });
});

// Inicio de sesión
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error al buscar el usuario:', err);
      res.status(500).json({ error: 'Error al buscar el usuario' });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Credenciales inválidas' });
      return;
    }
    const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});




// Rutas vehículos

// Ruta para crear un nuevo vehículo
// Ruta para crear un vehículo
router.post('/vehiculos', (req, res) => {
  const {
    modelo,
    descripcion,
    costoPorHora,
    potencia,
    consumo,
    comodidades,
    pros,
    contras,
    disponible,
    imagenes
  } = req.body;

  const query =
    'INSERT INTO vehiculos (modelo, descripcion, costoPorHora, potencia, consumo, comodidades, pros, contras, disponible, imagenes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(
    query,
    [
      modelo,
      descripcion,
      costoPorHora,
      potencia,
      consumo,
      comodidades,
      pros,
      contras,
      disponible,
      imagenes
    ],
    (err, results) => {
      if (err) {
        console.error('Error al crear el vehículo:', err);
        res.status(500).json({ error: 'Error al crear el vehículo' });
        return;
      }
      res.status(201).json({ message: 'Vehículo creado exitosamente' });
    }
  );
});



// GET vehículos
router.get('/vehiculos', (req, res) => {
  const query = 'SELECT * FROM vehiculos';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los datos:', err);
      res.status(500).send('Error al obtener los datos');
    } else {
      res.json(results);
    }
  });
});


// Update estado vehículo (protegido)
router.put('/vehiculos/:id/disponibilidad', (req, res) => {
  const vehiculoId = req.params.id;
  const { disponible } = req.body;
  const query = 'UPDATE vehiculos SET disponible = ? WHERE id = ?';

  db.query(query, [disponible, vehiculoId], (err, results) => {
    if (err) {
      console.error('Error al actualizar la disponibilidad del vehículo:', err);
      res.status(500).json({ error: 'Error al actualizar la disponibilidad del vehículo' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Vehículo no encontrado' });
    } else {
      res.status(200).json({ message: 'Disponibilidad del vehículo actualizada exitosamente' });
    }
  });
});

router.delete('/vehiculos/:id',  (req, res) => {
  const vehiculoId = req.params.id;
  const query = 'DELETE FROM vehiculos WHERE id = ?';

  db.query(query, [vehiculoId], (err, results) => {
    if (err) {
      console.error('Error al eliminar el vehículo:', err);
      res.status(500).json({ error: 'Error al eliminar el vehículo' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Vehículo no encontrado' });
    } else {
      res.status(200).json({ message: 'Vehículo eliminado exitosamente' });
    }
  });
});


module.exports = router;
