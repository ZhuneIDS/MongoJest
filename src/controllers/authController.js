// src/controllers/authController.js
const User = require('../models/User'); // Ensure you have a User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
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

    console.log('Login request received:', { email, password }); // Debugging: Log the request body

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email); // Debugging: Log if user is not found
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    console.log('User found:', user); // Debugging: Log the user object

    // Compare plain-text passwords
    if (password !== user.password) {
      console.log('Password mismatch for user:', email); // Debugging: Log if password is incorrect
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    console.log('Password matched for user:', email); // Debugging: Log if password is correct

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('Token generated for user:', email); // Debugging: Log the generated token

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error); // Debugging: Log any errors
    res.status(500).json({ message: 'Error logging in.', error });
  }
};