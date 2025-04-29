const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

// Rutas para Ventas
// Crear una nueva venta
router.post('/', ventaController.create);

// Obtener todas las ventas
router.get('/', ventaController.getAll);

// Obtener una venta por ID
router.get('/:id', ventaController.getById);

// Actualizar una venta
router.put('/:id', ventaController.update);

// Eliminar una venta (soft delete)
router.delete('/:id', ventaController.delete);

// Obtener ventas por cliente
router.get('/cliente/:clienteId', ventaController.getByCliente);


module.exports = router; 