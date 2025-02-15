// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

// middleware para verificar el token de autenticación
const authMiddleware = (req, res, next) => {
    console.log("auth middleware");
    
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Añade el usuario decodificado a la solicitud
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};

module.exports = authMiddleware;