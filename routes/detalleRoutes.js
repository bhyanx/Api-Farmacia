const express = require('express');
const router = express.Router();
const detalleController = require('../controllers/detalleController');

// Obtener todos los detalles de compra
router.get('/', detalleController.getAllDetallesCompra);

// Obtener un detalle de compra por ID
router.get('/:id', detalleController.getDetalleCompraById);

// Crear un nuevo detalle de compra
router.post('/', detalleController.createDetalleCompra);

// Actualizar un detalle de compra por ID
router.put('/:id', detalleController.updateDetalleCompra);

// Eliminar un detalle de compra por ID
router.delete('/:id', detalleController.deleteDetalleCompra);

module.exports = router;