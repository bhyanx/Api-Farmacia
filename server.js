require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/database');

// IMPORTAR NUESTRAS RUTAS
const usuarioRouter = require('./routes/usuarioRoutes');

const app = express();
const PORT = process.env.PORT || 55003;

const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:55003',
    optionsSuccessStatus: 200
};

// Middleware para manejar CORS y JSON
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// USO DE RUTAS
app.use('/api/Usuarios', usuarioRouter);

//RUTA DE PRUEBA
app.get('/', (req, res) => {
    res.json ({ message: 'API is running' });
});

// RUTAS PARA MANEJO DE ERRORES
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error en el servidor',
    message: err.message });
});

(async () => {
    try {
        console.log('Conexión a la base de datos exitosa');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    }
})();

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});