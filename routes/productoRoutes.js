const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.get('/', productoController.getAllProductos); // Obtener todos los productos
router.get('/:id', productoController.getProductoById); // Obtener un producto por ID
router.post('/', productoController.createProducto); // Crear un nuevo producto
router.put('/:id', productoController.updateProducto); // Actualizar un producto
router.delete('/:id', productoController.deleteProducto); // Eliminar un producto (eliminación lógica)
module.exports = router;