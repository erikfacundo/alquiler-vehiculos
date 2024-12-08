import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 5000;

const usuariosFile = path.resolve('usuarios.json');
const vehiculosFile = path.resolve('  ./data/vehiculos.json');

// cors ex´ress//
app.use(cors());
app.use(express.json());

// Función para leer datos de un archivo JSON
const leerArchivo = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.writeFile(filePath, JSON.stringify([], null, 2));
      return [];
    }
    throw err;
  }
};

// escribir en json//
const escribirArchivo = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    throw err;
  }
};

/**  USUARIOS **/

// registro usuarios//
app.post('/registro', async (req, res) => {
  const { usuario, password, email, isAdmin } = req.body;

  try {
    const usuarios = await leerArchivo(usuariosFile);
    usuarios.push({ usuario, password, email, isAdmin });
    await escribirArchivo(usuariosFile, usuarios);
    res.status(200).json({ message: 'Usuario registrado correctamente.' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario.' });
  }
});

// iniciar sesion//
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuarios = await leerArchivo(usuariosFile);
    const usuarioValido = usuarios.find(
      (usuario) => usuario.email === email && usuario.password === password
    );

    if (usuarioValido) {
      res.status(200).json({ success: true, usuario: usuarioValido });
    } else {
      res.status(400).json({ success: false, message: 'Email o contraseña incorrectos.' });
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ success: false, message: 'Hubo un problema al intentar iniciar sesión.' });
  }
});

/** VEHÍCULOS **/

// traigo vehiculos///
app.get('/vehiculos', async (req, res) => {
  try {
    const vehiculos = await leerArchivo(vehiculosFile);
    res.status(200).json(vehiculos);
  } catch (error) {
    console.error('Error al obtener vehículos:', error);
    res.status(500).json({ message: 'Error al obtener vehículos.' });
  }
});

// agreggar //
app.post('/vehiculos', async (req, res) => {
  const nuevoVehiculo = req.body;

  try {
    const vehiculos = await leerArchivo(vehiculosFile);
    nuevoVehiculo.id = vehiculos.length ? vehiculos[vehiculos.length - 1].id + 1 : 1;
    vehiculos.push(nuevoVehiculo);
    await escribirArchivo(vehiculosFile, vehiculos);
    res.status(201).json(nuevoVehiculo);
  } catch (error) {
    console.error('Error al agregar vehículo:', error);
    res.status(500).json({ message: 'Error al agregar vehículo.' });
  }
});

// editar //
app.put('/vehiculos/:id', async (req, res) => {
  const { id } = req.params;
  const vehiculoActualizado = req.body;

  try {
    const vehiculos = await leerArchivo(vehiculosFile);
    const index = vehiculos.findIndex((vehiculo) => vehiculo.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ message: 'Vehículo no encontrado.' });
    }

    vehiculos[index] = { ...vehiculos[index], ...vehiculoActualizado };
    await escribirArchivo(vehiculosFile, vehiculos);
    res.status(200).json(vehiculos[index]);
  } catch (error) {
    console.error('Error al editar vehículo:', error);
    res.status(500).json({ message: 'Error al editar vehículo.' });
  }
});

// eliminar//
app.delete('/vehiculos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const vehiculos = await leerArchivo(vehiculosFile);
    const vehiculosActualizados = vehiculos.filter((vehiculo) => vehiculo.id !== parseInt(id));

    if (vehiculos.length === vehiculosActualizados.length) {
      return res.status(404).json({ message: 'Vehículo no encontrado.' });
    }

    await escribirArchivo(vehiculosFile, vehiculosActualizados);
    res.status(200).json({ message: 'Vehículo eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar vehículo:', error);
    res.status(500).json({ message: 'Error al eliminar vehículo.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
