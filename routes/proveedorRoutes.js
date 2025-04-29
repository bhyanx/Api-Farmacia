const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

// Rutas para Proveedores
router.get('/', proveedorController.getAll); // Obtener todos los proveedores
router.get('/:id', proveedorController.getById); // Obtener un proveedor por ID
router.post('/', proveedorController.create); // Crear un nuevo proveedor
router.put('/:id', proveedorController.update); // Actualizar un proveedor
router.delete('/:id', proveedorController.delete); // Eliminar un proveedor (soft delete)

module.exports = router;