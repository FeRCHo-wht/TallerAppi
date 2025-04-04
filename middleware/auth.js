const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const protegerRuta = async (req, res, next) => {
  let token;
  
  // Verificar si existe el token en los headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener el token
      token = req.headers.authorization.split(' ')[1];
      
      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Obtener el usuario del token
      req.usuario = await Usuario.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ mensaje: 'No autorizado, token inválido' });
    }
  }
  
  if (!token) {
    return res.status(401).json({ mensaje: 'No autorizado, no hay token' });
  }
};

const esAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.rol === 'admin') {
    next();
  } else {
    res.status(403).json({ mensaje: 'No autorizado, se requiere rol de administrador' });
  }
};

module.exports = { protegerRuta, esAdmin };