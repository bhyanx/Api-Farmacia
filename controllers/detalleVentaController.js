const DetalleVentaModel = require('../models/detalleVentaModels');

const detalleVentaController = {
    // Crear un nuevo detalle de venta
    async createDetalleVenta(req, res) {
        try {
            const detalleId = await DetalleVentaModel.createDetalleVenta(req.body);
            res.status(201).json({
                message: 'Detalle de venta creado exitosamente',
                detalleId
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Obtener todos los detalles de venta
    async getAllDetallesVenta(req, res) {
        try {
            const detalles = await DetalleVentaModel.getAllDetallesVenta();
            res.status(200).json(detalles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener un detalle de venta por ID
    async getDetalleVentaById(req, res) {
        try {
            const detalle = await DetalleVentaModel.getDetalleVentaById(req.params.id);
            if (!detalle) {
                return res.status(404).json({ error: 'Detalle de venta no encontrado' });
            }
            res.status(200).json(detalle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener todos los detalles de venta por ID de venta
    async getAllDetallesByVentaId(req, res) {
        try {
            const detalles = await DetalleVentaModel.getAllDetallesByVentaId(req.params.ventaId);
            res.status(200).json(detalles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar un detalle de venta
    async updateDetalleVenta(req, res) {
        try {
            const detalle = await DetalleVentaModel.getDetalleVentaById(req.params.id);
            if (!detalle) {
                return res.status(404).json({ error: 'Detalle de venta no encontrado' });
            }

            await DetalleVentaModel.updateDetalleVenta(req.params.id, req.body);

            const detalleActualizado = await DetalleVentaModel.getDetalleVentaById(req.params.id);
            res.status(200).json({
                message: 'Detalle de venta actualizado exitosamente',
                detalle: detalleActualizado
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Eliminar un detalle de venta
    async deleteDetalleVenta(req, res) {
        try {
            const detalle = await DetalleVentaModel.getDetalleVentaById(req.params.id);
            if (!detalle) {
                return res.status(404).json({ error: 'Detalle de venta no encontrado' });
            }

            await DetalleVentaModel.deleteDetalleVenta(req.params.id);
            res.status(200).json({ message: 'Detalle de venta eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener detalles de venta con información del producto
    async getDetallesConProductoInfo(req, res) {
        try {
            const detalles = await DetalleVentaModel.getDetallesConProductoInfo(req.params.ventaId);
            res.status(200).json(detalles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = detalleVentaController;