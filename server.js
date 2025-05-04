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
    origin: [
        'http://localhost:5173',   // Vite dev server (tu frontend React)
        'http://localhost:55003',  // API local (por si usas doble entorno)
        'https://tu-frontend-en-vercel.vercel.app' // <-- si ya lo tienes desplegado
    ],
    credentials: true,
    optionsSuccessStatus: 200
};

// Configuración de body-parser con manejo de errores
app.use(express.json({
    verify: (req, res, buf, encoding) => {
        if (buf && buf.length) {
            try {
                JSON.parse(buf);
            } catch (e) {
                res.status(400).json({
                    success: false,
                    message: 'JSON inválido',
                    error: e.message
                });
                throw new Error('JSON inválido');
            }
        }
    }
}));

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
    res.json({ message: 'API is running' });
});

// RUTAS PARA MANEJO DE ERRORES
app.use((err, req, res, next) => {
    console.error('Error en el servidor:', err);
    res.status(500).json({ 
        success: false,
        message: 'Error en el servidor',
        error: err.message 
    });
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
