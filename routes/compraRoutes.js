const express = require('express');
const router = express.Router();
const detalleCompraController = require('../controllers/compraController');

// Rutas para DetalleCompra
router.get('/', detalleCompraController.getAllCompras); // Obtener todos los detalles de compras
router.get('/:id', detalleCompraController.getById); // Obtener un detalle de compra por ID
router.post('/', detalleCompraController.create); // Crear un nuevo detalle de compra
router.put('/:id', detalleCompraController.update); // Actualizar un detalle de compra
router.delete('/:id', detalleCompraController.delete); // Eliminar un detalle de compra

module.exports = router;