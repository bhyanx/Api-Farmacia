const express = require('express');
const router = express.Router();
const detalleVentaController = require('../controllers/detalleVentaController');

router.get('/', detalleVentaController.getAllDetallesVenta); // Obtener todos los detalles de venta
router.get('/venta/:ventaId', detalleVentaController.getAllDetallesByVentaId); // Obtener detalles de venta por ID de venta
router.get('/:id', detalleVentaController.getDetalleVentaById); // Obtener un detalle de venta por ID
router.post('/', detalleVentaController.createDetalleVenta); // Crear un nuevo detalle de venta
router.put('/:id', detalleVentaController.updateDetalleVenta); // Actualizar un detalle de venta
router.delete('/:id', detalleVentaController.deleteDetalleVenta); // Eliminar un detalle de venta


module.exports = router;