const express = require('express');
const router = express.Router();
const detalleController = require('../controllers/detalleController');

router.get('/', detalleController.getAllDetallesCompra)
router.get('/:id', detalleController.getDetalleCompraById);

module.exports = router;