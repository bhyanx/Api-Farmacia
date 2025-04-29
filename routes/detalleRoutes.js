const express = require('express');
const router = express.Router();
const detalleController = require('../controllers/detalleController');

// Rutas para DetalleCompra
router.get('/', detalleCompraController.getAllDetallesCompra); // Obtener todos los detalles de compra
router.get('/compra/:compraId', detalleCompraController.getAllDetallesByCompraId); // Obtener detalles de compra por ID de compra
router.get('/:id', detalleCompraController.getDetalleCompraById); // Obtener un detalle de compra por ID
router.post('/', detalleCompraController.createDetalleCompra); // Crear un nuevo detalle de compra
router.put('/:id', detalleCompraController.updateDetalleCompra); // Actualizar un detalle de compra
router.delete('/:id', detalleCompraController.deleteDetalleCompra); // Eliminar un detalle de compra

module.exports = router;