const express = require('express');
const router = express.Router();
const productoProveedorController = require('../controllers/productoProveedorController');

// Rutas para ProductoProveedor
router.get('/', productoProveedorController.getAll); // Obtener todos los registros
router.get('/:productoId/:proveedorId', productoProveedorController.getByIds); // Obtener un registro por ProductoID y ProveedorID
router.post('/', productoProveedorController.create); // Crear un nuevo registro
router.delete('/:productoId/:proveedorId', productoProveedorController.delete); // Eliminar un registro

module.exports = router;