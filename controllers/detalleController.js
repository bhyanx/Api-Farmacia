const DetalleCompra = require('../models/detalleModels');

// Get all purchase details
exports.getAllDetallesCompra = async (req, res) => {
    try {
        const detalles = await DetalleCompra.getAllDetallesCompra();
        res.status(200).json({ success: true, data: detalles });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los detalles de compra', error: error.message });
    }
};

// Get purchase detail by ID
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

// Create new purchase detail
exports.createDetalleCompra = async (req, res) => {
    try {
        const detalleId = await DetalleCompra.createDetalleCompra(req.body);
        res.status(201).json({ success: true, data: { id: detalleId }, message: 'Detalle de compra creado exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear el detalle de compra', error: error.message });
    }
};

// Update purchase detail
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

// Delete purchase detail
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