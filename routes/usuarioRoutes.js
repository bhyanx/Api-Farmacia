const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.getAll); // Obtener todos los usuarios
router.get('/:id', usuarioController.getById); // Obtener un usuario por ID
router.post('/', usuarioController.create); // Crear un nuevo usuario
router.put('/:id', usuarioController.update); // Actualizar un usuario
router.delete('/:id', usuarioController.delete); // Eliminar un usuario (soft delete)


module.exports = router;