const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerSetup = require('./swagger/swagger');
require('dotenv').config();

// Rutas
const autorRoutes = require('./routes/autorRoutes');
const libroRoutes = require('./routes/libroRoutes');
const authRoutes = require('./routes/authRoutes');

// Inicialización de la app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
connectDB();

// Configuración de Swagger
swaggerSetup(app);

// Rutas de la API
app.use('/api/autores', autorRoutes);
app.use('/api/libros', libroRoutes);
app.use('/api/auth', authRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
  res.send('API RESTful para la Gestión de Autores y Libros');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto: ${PORT}`);
});