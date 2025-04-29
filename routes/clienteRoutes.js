const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Rutas para Clientes

// Crear un nuevo cliente
router.post('/', clienteController.createClientes);

// Obtener todos los clientes
router.get('/', clienteController.getAllClientes);

// Obtener un cliente por ID
router.get('/:id', clienteController.getByIdClientes);

// Actualizar un cliente
router.put('/:id', clienteController.updateClientes);

// Eliminar un cliente (soft delete)
router.delete('/:id', clienteController.deleteClientes);

module.exports = router; 