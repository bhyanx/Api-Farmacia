const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Rutas para Clientes

// Crear un nuevo cliente
router.post('/', clienteController.create);

// Obtener todos los clientes
router.get('/', clienteController.getAll);

// Obtener un cliente por ID
router.get('/:id', clienteController.getById);

// Actualizar un cliente
router.put('/:id', clienteController.update);

// Eliminar un cliente (soft delete)
router.delete('/:id', clienteController.delete);

module.exports = router; 