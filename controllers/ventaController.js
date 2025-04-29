const VentaModel = require('../models/ventaModels');

const ventaController = {
    // Obtener todas las ventas
    async getAll(req, res) {
        try {
            const ventas = await VentaModel.getAllVentas();
            res.status(200).json(ventas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener una venta por ID
    async getById(req, res) {
        try {
            const venta = await VentaModel.getVentaById(req.params.id);
            if (!venta) {
                return res.status(404).json({ error: 'Venta no encontrada' });
            }
            res.status(200).json(venta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear una nueva venta
    async create(req, res) {
        try {
            const ventaId = await VentaModel.createVenta(req.body);
            res.status(201).json({ message: 'Venta creada exitosamente', ventaId });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Actualizar una venta
    async update(req, res) {
        try {
            const success = await VentaModel.updateVenta(req.params.id, req.body);
            if (!success) {
                return res.status(404).json({ error: 'Venta no encontrada' });
            }
            res.status(200).json({ message: 'Venta actualizada exitosamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Eliminar una venta (soft delete)
    async delete(req, res) {
        try {
            const success = await VentaModel.deleteVenta(req.params.id);
            if (!success) {
                return res.status(404).json({ error: 'Venta no encontrada' });
            }
            res.status(200).json({ message: 'Venta eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener ventas por cliente
    async getByCliente(req, res) {
        try {
            const ventas = await VentaModel.getVentasByCliente(req.params.clienteId);
            res.status(200).json(ventas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = ventaController;