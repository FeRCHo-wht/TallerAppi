const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

// Generar token JWT
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  });
};

// @desc    Registrar un nuevo usuario
// @route   POST /api/auth/register
// @access  Público
const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    
    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }
    
    // Crear el usuario
    const usuario = await Usuario.create({
      nombre,
      email,
      password
    });
    
    if (usuario) {
      res.status(201).json({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        token: generarToken(usuario._id)
      });
    } else {
      res.status(400).json({ mensaje: 'Datos de usuario inválidos' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

// @desc    Autenticar usuario / obtener token
// @route   POST /api/auth/login
// @access  Público
const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    
    if (usuario && (await usuario.compararPassword(password))) {
      res.json({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        token: generarToken(usuario._id)
      });
    } else {
      res.status(401).json({ mensaje: 'Email o contraseña incorrectos' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

module.exports = {
  registrarUsuario,
  loginUsuario
};