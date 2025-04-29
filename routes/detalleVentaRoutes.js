const express = require('express');
const router = express.Router();
const detalleVentaController = require('../controllers/detalleVentaController');

router.get('/', detalleVentaController.getAllDetallesVenta)
router.get('/:id', detalleVentaController.getDetalleVentaById);

module.exports = router;