const express = require('express');
const router = express.Router();
const recetaController = require('../controllers/recetaController');

// Rutas para Recetas
router.get('/', recetaController.getAll); // Obtener todas las recetas
router.get('/:id', recetaController.getById); // Obtener una receta por ID
router.post('/', recetaController.create); // Crear una nueva receta
router.put('/:id', recetaController.update); // Actualizar una receta
router.delete('/:id', recetaController.delete); // Eliminar una receta (soft delete)

module.exports = router;