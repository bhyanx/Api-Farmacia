const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Rutas para Clientes

// Rutas para Clientes
router.get('/', clienteController.getAllClientes); // Obtener todos los clientes
router.get('/:id', clienteController.getClienteById); // Obtener un cliente por ID
router.post('/', clienteController.createCliente); // Crear un nuevo cliente
router.put('/:id', clienteController.updateCliente); // Actualizar un cliente
router.delete('/:id', clienteController.deleteCliente); // Eliminar un cliente (soft delete)

module.exports = router; 