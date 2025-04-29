const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

// Rutas para Ventas
router.post('/', ventaController.create);
router.get('/', ventaController.getAll);
router.get('/:id', ventaController.getById);
router.put('/:id', ventaController.update);
router.delete('/:id', ventaController.delete);
router.get('/cliente/:clienteId', ventaController.getByCliente);

module.exports = router; 