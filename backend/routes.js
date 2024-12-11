// routes.js
const express = require('express');
const router = express.Router();
const db = require('./db');

// GET ALL USERS
router.get('/usuarios', (req, res) => {
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

// POST nuevo usuario
router.post('/register', (req, res) => {
  const { usuario, email, password, isAdmin } = req.body;
  const query = 'INSERT INTO usuarios (usuario, email, password, isAdmin) VALUES (?, ?, ?, ?)';
  db.query(query, [usuario, email, password, isAdmin || 0], (err, results) => {
    if (err) {
      console.error('Error al registrar el usuario:', err);
      res.status(500).json({ error: 'Error al registrar el usuario' });
    } else {
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    }
  });
});

// DELETE user por ID

router.delete('/usuarios/:id', (req, res) => {
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

// UPDATE user a Admin

router.put('/usuarios/:id/admin', (req, res) => {
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

/// Rutas vehiculos

// GET vehiculos
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

//Update estado vehiculo

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



module.exports = router;
