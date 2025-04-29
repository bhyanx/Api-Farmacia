const DetalleCompra = require('../models/detalleModels');

// Obtener todos los detalles de compra
exports.getAllDetallesCompra = async (req, res) => {
    try {
        const detalles = await DetalleCompra.getAllDetallesCompra();
        res.status(200).json({ success: true, data: detalles });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los detalles de compra', error: error.message });
    }
};

// Obtener todos los detalles de compra por ID de compra
exports.getAllDetallesByCompraId = async (req, res) => {
    try {
        const detalles = await DetalleCompra.getAllDetallesByCompraId(req.params.compraId);
        res.status(200).json({ success: true, data: detalles });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los detalles de compra por ID de compra', error: error.message });
    }
};

// Obtener un detalle de compra por ID
exports.getDetalleCompraById = async (req, res) => {
    try {
        const detalle = await DetalleCompra.getDetalleCompraById(req.params.id);
        if (!detalle) {
            return res.status(404).json({ success: false, message: 'Detalle de compra no encontrado' });
        }
        res.status(200).json({ success: true, data: detalle });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el detalle de compra', error: error.message });
    }
};

// Crear un nuevo detalle de compra
exports.createDetalleCompra = async (req, res) => {
    try {
        const detalleId = await DetalleCompra.createDetalleCompra(req.body);
        res.status(201).json({ success: true, data: { id: detalleId }, message: 'Detalle de compra creado exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear el detalle de compra', error: error.message });
    }
};

// Actualizar un detalle de compra
exports.updateDetalleCompra = async (req, res) => {
    try {
        const success = await DetalleCompra.updateDetalleCompra(req.params.id, req.body);
        if (!success) {
            return res.status(404).json({ success: false, message: 'Detalle de compra no encontrado' });
        }
        res.status(200).json({ success: true, message: 'Detalle de compra actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar el detalle de compra', error: error.message });
    }
};

// Eliminar un detalle de compra
exports.deleteDetalleCompra = async (req, res) => {
    try {
        const success = await DetalleCompra.deleteDetalleCompra(req.params.id);
        if (!success) {
            return res.status(404).json({ success: false, message: 'Detalle de compra no encontrado' });
        }
        res.status(200).json({ success: true, message: 'Detalle de compra eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar el detalle de compra', error: error.message });
    }
};

// Obtener detalles de compra con información del producto
exports.getDetallesConProductoInfo = async (req, res) => {
    try {
        const detalles = await DetalleCompra.getDetallesConProductoInfo(req.params.compraId);
        res.status(200).json({ success: true, data: detalles });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los detalles de compra con información del producto', error: error.message });
    }
};

// Obtener el total de una compra
exports.getTotalCompra = async (req, res) => {
    try {
        const total = await DetalleCompra.getTotalCompra(req.params.compraId);
        res.status(200).json({ success: true, data: { total } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el total de la compra', error: error.message });
    }
};