require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/database');

// IMPORTAR NUESTRAS RUTAS
const usuarioRouter = require('./routes/usuarioRoutes');
const ventaRouter = require('./routes/ventaRoutes');
const detalleVentaRouter = require('./routes/detalleVentaRoutes');
const detalleRouter = require('./routes/detalleRoutes');
const productoRouter = require('./routes/productoRoutes');
const compraRouter = require('./routes/compraRoutes');
const proveedorRouter = require('./routes/proveedorRoutes');
const productoProveedorRouter = require('./routes/productoProveedorRoutes');
const recetaRouter = require('./routes/recetaRoutes');
const detalleRecetaRouter = require('./routes/detalleRecetaRoutes');
const alertaRouter = require('./routes/alertaRoutes');
const clienteRouter = require('./routes/clienteRoutes');

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
app.use('/api/Ventas', ventaRouter);
app.use('/api/DetalleVentas', detalleVentaRouter);
app.use('/api/Detalles', detalleRouter);
app.use('/api/Productos', productoRouter);
app.use('/api/DetalleCompras', compraRouter);
app.use('/api/Proveedores', proveedorRouter);
app.use('/api/ProductoProveedores', productoProveedorRouter);
app.use('/api/Recetas', recetaRouter);
app.use('/api/DetalleRecetas', detalleRecetaRouter);
app.use('/api/Alertas', alertaRouter);
app.use('/api/Clientes', clienteRouter);

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