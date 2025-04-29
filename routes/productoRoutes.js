const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Rutas para Producto
router.get('/', productoController.getAll); // Obtener todos los productos
router.get('/:id', productoController.getById); // Obtener un producto por ID
router.post('/', productoController.create); // Crear un nuevo producto
router.put('/:id', productoController.update); // Actualizar un producto
router.delete('/:id', productoController.delete); // Eliminar un producto

module.exports = router;