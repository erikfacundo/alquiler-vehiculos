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

// GET ALL USERS (protegido)
router.get('/usuarios', verifyToken, (req, res) => {
  const query = 'SELECT id, usuario, email FROM usuarios';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los usuarios:', err);
      res.status(500).send('Error al obtener los usuarios');
    } else {
      res.json(results);
    }
  });
});

// DELETE user por ID (protegido)
router.delete('/usuarios/:id', verifyToken, (req, res) => {
  const userId = req.params.id;
  const query = 'DELETE FROM usuarios WHERE id = ?';
  
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error al eliminar el usuario:', err);
      res.status(500).json({ error: 'Error al eliminar el usuario' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    }
  });
});

// UPDATE user a Admin (protegido)
router.put('/usuarios/:id/admin', verifyToken, (req, res) => {
  const userId = req.params.id;
  const query = 'UPDATE usuarios SET isAdmin = ? WHERE id = ?';

  db.query(query, [true, userId], (err, results) => {
    if (err) {
      console.error('Error al actualizar el usuario:', err);
      res.status(500).json({ error: 'Error al actualizar el usuario' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      res.status(200).json({ message: 'Usuario actualizado exitosamente' });
    }
  });
});

// Rutas vehículos

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
router.put('/vehiculos/:id/disponibilidad', verifyToken, (req, res) => {
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

module.exports = router;
