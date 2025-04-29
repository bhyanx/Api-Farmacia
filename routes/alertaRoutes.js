const express = require('express');
const router = express.Router();
const alertaController = require('../controllers/alertaController');

// Rutas para Alerta
router.get('/', alertaController.getAll); // Obtener todas las alertas
router.get('/:id', alertaController.getById); // Obtener una alerta por ID
router.post('/', alertaController.create); // Crear una nueva alerta
router.put('/:id', alertaController.update); // Actualizar una alerta
router.delete('/:id', alertaController.delete); // Eliminar una alerta

module.exports = router;