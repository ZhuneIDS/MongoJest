// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); // Ensure this path is correct
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());


// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '../public')));

// Otras rutas y configuraciones
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Ruta para la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // 30 seconds timeout for server selection
    connectTimeoutMS: 30000, // 30 seconds timeout for initial connection
    socketTimeoutMS: 45000, // 45 seconds timeout for socket operations

  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('MongoDB connection error:');
        console.error('- Message:', err.message); // Log the error message
        console.error('- Reason:', err.reason); // Log the reason for the error
        console.error('- Code:', err.code); // Log the error code
        console.error('- Full Error:', err); // Log the full error object
      });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});