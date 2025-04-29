const ProductoProveedorModel = require('../models/productoProveedorModels');

const productoProveedorController = {
    // Obtener todos los registros de ProductoProveedor
    async getAll(req, res) {
        try {
            const productoProveedores = await ProductoProveedorModel.getAllProductoProveedores();
            res.status(200).json(productoProveedores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener un registro de ProductoProveedor por ProductoID y ProveedorID
    async getByIds(req, res) {
        try {
            const { productoId, proveedorId } = req.params;
            const productoProveedor = await ProductoProveedorModel.getProductoProveedorByIds(productoId, proveedorId);
            if (!productoProveedor) {
                return res.status(404).json({ error: 'Registro no encontrado' });
            }
            res.status(200).json(productoProveedor);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear un nuevo registro de ProductoProveedor
    async create(req, res) {
        try {
            const productoProveedorId = await ProductoProveedorModel.createProductoProveedor(req.body);
            res.status(201).json({ message: 'Registro creado exitosamente', productoProveedorId });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Eliminar un registro de ProductoProveedor por ProductoID y ProveedorID
    async delete(req, res) {
        try {
            const { productoId, proveedorId } = req.params;
            const success = await ProductoProveedorModel.deleteProductoProveedor(productoId, proveedorId);
            if (!success) {
                return res.status(404).json({ error: 'Registro no encontrado' });
            }
            res.status(200).json({ message: 'Registro eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = productoProveedorController;