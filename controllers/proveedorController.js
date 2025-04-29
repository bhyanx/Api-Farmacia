const ProveedorModel = require('../models/proveedorModels');

const proveedorController = {
    // Obtener todos los proveedores
    async getAll(req, res) {
        try {
            const proveedores = await ProveedorModel.getAllProveedores();
            res.status(200).json(proveedores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener un proveedor por ID
    async getById(req, res) {
        try {
            const proveedor = await ProveedorModel.getProveedorById(req.params.id);
            if (!proveedor) {
                return res.status(404).json({ error: 'Proveedor no encontrado' });
            }
            res.status(200).json(proveedor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear un nuevo proveedor
    async create(req, res) {
        try {
            const proveedorId = await ProveedorModel.createProveedor(req.body);
            res.status(201).json({ message: 'Proveedor creado exitosamente', proveedorId });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Actualizar un proveedor
    async update(req, res) {
        try {
            const success = await ProveedorModel.updateProveedor(req.params.id, req.body);
            if (!success) {
                return res.status(404).json({ error: 'Proveedor no encontrado' });
            }
            res.status(200).json({ message: 'Proveedor actualizado exitosamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Eliminar un proveedor (soft delete)
    async delete(req, res) {
        try {
            const success = await ProveedorModel.deleteProveedor(req.params.id);
            if (!success) {
                return res.status(404).json({ error: 'Proveedor no encontrado' });
            }
            res.status(200).json({ message: 'Proveedor eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = proveedorController;