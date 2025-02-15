// src/controllers/authController.js
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hashear la contraseña (encrypta)
    const hashedPassword = await bcrypt.hash(password, 10);

    // crear un nuevo usuario
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login request received:', { email, password }); // para debugear

    // revisar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email); // debug para saber si el usuario no existe
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    console.log('User found:', user); // debug para saber si el usuario existe

    // comparar contraseñas
    if (password !== user.password) {
      console.log('Password mismatch for user:', email); // debug para saber si la contraseña no coincide
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    console.log('Password matched for user:', email); // debug para saber si la contraseña coincide

    // generar token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('Token generated for user:', email); // debug para saber si el token se generó correctamente

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error); // debug para saber si hubo un error
    res.status(500).json({ message: 'Error logging in.', error });
  }
};