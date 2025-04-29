const Venta = require('../models/ventaModels');
const Cliente = require('../models/clienteModels');

const ventaController = {
    // Crear una nueva venta
    async create(req, res) {
        try {
            const venta = await Venta.create(req.body);
            res.status(201).json(venta);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Obtener todas las ventas
    async getAll(req, res) {
        try {
            const ventas = await Venta.getAllVentas({
                where: { deleted_at: null },
                include: [{
                    model: Cliente,
                    attributes: ['Nombre', 'DNI']
                }]
            });
            res.json(ventas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener una venta por ID
    async getById(req, res) {
        try {
            const venta = await Venta.findByPk(req.params.id, {
                include: [{
                    model: Cliente,
                    attributes: ['Nombre', 'DNI']
                }]
            });
            if (!venta) {
                return res.status(404).json({ error: 'Venta no encontrada' });
            }
            res.json(venta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar una venta
    async update(req, res) {
        try {
            const venta = await Venta.findByPk(req.params.id);
            if (!venta) {
                return res.status(404).json({ error: 'Venta no encontrada' });
            }
            await venta.update(req.body);
            res.json(venta);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Eliminar una venta (soft delete)
    async delete(req, res) {
        try {
            const venta = await Venta.findByPk(req.params.id);
            if (!venta) {
                return res.status(404).json({ error: 'Venta no encontrada' });
            }
            await venta.destroy();
            res.json({ message: 'Venta eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener ventas por cliente
    async getByCliente(req, res) {
        try {
            const ventas = await Venta.findAll({
                where: {
                    ClienteID: req.params.clienteId,
                    deleted_at: null
                },
                include: [{
                    model: Cliente,
                    attributes: ['Nombre', 'DNI']
                }]
            });
            res.json(ventas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = ventaController; 