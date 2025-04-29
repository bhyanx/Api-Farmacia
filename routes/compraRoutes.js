const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

router.get('/', compraController.getAllCompras); 


module.exports = router;