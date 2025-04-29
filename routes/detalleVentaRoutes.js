const express = require('express');
const router = express.Router();
const detalleVentaController = require('../controllers/detalleVentaController');

// Obtener todos los detalles de venta
router.get('/', detalleVentaController.getAllDetallesVenta);

// Obtener un detalle de venta por ID
router.get('/:id', detalleVentaController.getDetalleVentaById);

// Crear un nuevo detalle de venta
router.post('/', detalleVentaController.createDetalleVenta);

// Actualizar un detalle de venta por ID
router.put('/:id', detalleVentaController.updateDetalleVenta);

// Eliminar un detalle de venta por ID
router.delete('/:id', detalleVentaController.deleteDetalleVenta);

module.exports = router;