const CompraModel = require('../models/compraModels');

const compraController = {
    // Obtener todas las compras
    async getAll(req, res) {
        try {
            const compras = await CompraModel.getAllCompras();
            res.status(200).json({ success: true, data: compras });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener las compras', error: error.message });
        }
    },

    // Obtener una compra por ID
    async getById(req, res) {
        try {
            const compra = await CompraModel.getCompraById(req.params.id);
            if (!compra) {
                return res.status(404).json({ success: false, message: 'Compra no encontrada' });
            }
            res.status(200).json({ success: true, data: compra });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener la compra', error: error.message });
        }
    },

    // Crear una nueva compra
    async create(req, res) {
        try {
            const compraId = await CompraModel.createCompra(req.body);
            res.status(201).json({ success: true, message: 'Compra creada exitosamente', data: { CompraID: compraId } });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al crear la compra', error: error.message });
        }
    },

    // Actualizar una compra
    async update(req, res) {
        try {
            const affectedRows = await CompraModel.updateCompra(req.params.id, req.body);
            if (affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Compra no encontrada o no actualizada' });
            }
            res.status(200).json({ success: true, message: 'Compra actualizada exitosamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al actualizar la compra', error: error.message });
        }
    },

    // Eliminar una compra (eliminación lógica)
    async delete(req, res) {
        try {
            const affectedRows = await CompraModel.deleteCompra(req.params.id);
            if (affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Compra no encontrada o ya eliminada' });
            }
            res.status(200).json({ success: true, message: 'Compra eliminada exitosamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al eliminar la compra', error: error.message });
        }
    }
};

module.exports = compraController;