const DetalleVenta = require('../models/detalleVentaModels');

// Obtener todos los detalles de venta
exports.getAllDetallesVenta = async (req, res) => {
    try {
        const detalles = await DetalleVenta.getAllDetallesVenta();
        res.status(200).json({ success: true, data: detalles });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los detalles de venta', error: error.message });
    }
};

// Obtener todos los detalles de venta por ID de venta
exports.getAllDetallesByVentaId = async (req, res) => {
    try {
        const detalles = await DetalleVenta.getAllDetallesByVentaId(req.params.ventaId);
        res.status(200).json({ success: true, data: detalles });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los detalles de venta por ID de venta', error: error.message });
    }
};

// Obtener un detalle de venta por ID
exports.getDetalleVentaById = async (req, res) => {
    try {
        const detalle = await DetalleVenta.getDetalleVentaById(req.params.id);
        if (!detalle) {
            return res.status(404).json({ success: false, message: 'Detalle de venta no encontrado' });
        }
        res.status(200).json({ success: true, data: detalle });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el detalle de venta', error: error.message });
    }
};

// Crear un nuevo detalle de venta
exports.createDetalleVenta = async (req, res) => {
    try {
        const detalleId = await DetalleVenta.createDetalleVenta(req.body);
        res.status(201).json({ success: true, data: { id: detalleId }, message: 'Detalle de venta creado exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear el detalle de venta', error: error.message });
    }
};

// Actualizar un detalle de venta
exports.updateDetalleVenta = async (req, res) => {
    try {
        const success = await DetalleVenta.updateDetalleVenta(req.params.id, req.body);
        if (!success) {
            return res.status(404).json({ success: false, message: 'Detalle de venta no encontrado' });
        }
        res.status(200).json({ success: true, message: 'Detalle de venta actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar el detalle de venta', error: error.message });
    }
};

// Eliminar un detalle de venta
exports.deleteDetalleVenta = async (req, res) => {
    try {
        const success = await DetalleVenta.deleteDetalleVenta(req.params.id);
        if (!success) {
            return res.status(404).json({ success: false, message: 'Detalle de venta no encontrado' });
        }
        res.status(200).json({ success: true, message: 'Detalle de venta eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar el detalle de venta', error: error.message });
    }
};

// Obtener detalles de venta con información del producto
exports.getDetallesConProductoInfo = async (req, res) => {
    try {
        const detalles = await DetalleVenta.getDetallesConProductoInfo(req.params.ventaId);
        res.status(200).json({ success: true, data: detalles });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los detalles de venta con información del producto', error: error.message });
    }
};