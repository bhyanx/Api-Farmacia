const DetalleCompraModel = require('../models/detalleModels');

const detalleCompraController = {
    // Crear un nuevo detalle de compra
    async createDetalleCompra(req, res) {
        try {
            const detalleId = await DetalleCompraModel.createDetalleCompra(req.body);
            res.status(201).json({
                message: 'Detalle de compra creado exitosamente',
                detalleId
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Obtener todos los detalles de compra
    async getAllDetallesCompra(req, res) {
        try {
            const detalles = await DetalleCompraModel.getAllDetallesCompra();
            res.status(200).json(detalles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener un detalle de compra por ID
    async getDetalleCompraById(req, res) {
        try {
            const detalle = await DetalleCompraModel.getDetalleCompraById(req.params.id);
            if (!detalle) {
                return res.status(404).json({ error: 'Detalle de compra no encontrado' });
            }
            res.status(200).json(detalle);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener todos los detalles de compra por ID de compra
    async getAllDetallesByCompraId(req, res) {
        try {
            const detalles = await DetalleCompraModel.getAllDetallesByCompraId(req.params.compraId);
            res.status(200).json(detalles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar un detalle de compra
    async updateDetalleCompra(req, res) {
        try {
            const detalle = await DetalleCompraModel.getDetalleCompraById(req.params.id);
            if (!detalle) {
                return res.status(404).json({ error: 'Detalle de compra no encontrado' });
            }

            await DetalleCompraModel.updateDetalleCompra(req.params.id, req.body);

            const detalleActualizado = await DetalleCompraModel.getDetalleCompraById(req.params.id);
            res.status(200).json({
                message: 'Detalle de compra actualizado exitosamente',
                detalle: detalleActualizado
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Eliminar un detalle de compra
    async deleteDetalleCompra(req, res) {
        try {
            const detalle = await DetalleCompraModel.getDetalleCompraById(req.params.id);
            if (!detalle) {
                return res.status(404).json({ error: 'Detalle de compra no encontrado' });
            }

            await DetalleCompraModel.deleteDetalleCompra(req.params.id);
            res.status(200).json({ message: 'Detalle de compra eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = detalleCompraController;