// src/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); // Revisar estructura
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

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // debug de tiempo de espera
    connectTimeoutMS: 30000, // debug de tiempo de espera
    socketTimeoutMS: 45000, // debug de tiempo de espera

  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('MongoDB connection error:');
        console.error('- Message:', err.message); // log de mensaje de error
        console.error('- Reason:', err.reason); // log de razón de error
        console.error('- Code:', err.code); // log de código de error
        console.error('- Full Error:', err); // log de error completo
      });

// empezar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});