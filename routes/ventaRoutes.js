const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

// Rutas para Ventas
router.get('/', ventaController.getAll); // Obtener todas las ventas
router.get('/:id', ventaController.getById); // Obtener una venta por ID
router.post('/', ventaController.create); // Crear una nueva venta
router.put('/:id', ventaController.update); // Actualizar una venta
router.delete('/:id', ventaController.delete); // Eliminar una venta (soft delete)
router.get('/cliente/:clienteId', ventaController.getByCliente); // Obtener ventas por cliente



module.exports = router; 