const express = require('express');
const router = express.Router();
const detalleRecetaController = require('../controllers/detalleRecetaController');

// Rutas para DetalleReceta
router.get('/', detalleRecetaController.getAll); // Obtener todos los detalles de recetas
router.get('/:id', detalleRecetaController.getById); // Obtener un detalle de receta por ID
router.post('/', detalleRecetaController.create); // Crear un nuevo detalle de receta
router.put('/:id', detalleRecetaController.update); // Actualizar un detalle de receta
router.delete('/:id', detalleRecetaController.delete); // Eliminar un detalle de receta

module.exports = router;