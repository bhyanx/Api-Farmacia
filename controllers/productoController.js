const ProductoModel = require('../models/productoModels');

const productoController = {
    // Obtener todos los productos
    async getAll(req, res) {
        try {
            const productos = await ProductoModel.getAllProductos();
            res.status(200).json({ success: true, data: productos });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener los productos', error: error.message });
        }
    },

    // Obtener un producto por ID
    async getById(req, res) {
        try {
            const producto = await ProductoModel.getProductoById(req.params.id);
            if (!producto) {
                return res.status(404).json({ success: false, message: 'Producto no encontrado' });
            }
            res.status(200).json({ success: true, data: producto });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al obtener el producto', error: error.message });
        }
    },

    // Crear un nuevo producto
    async create(req, res) {
        try {
            const productoId = await ProductoModel.createProducto(req.body);
            res.status(201).json({ success: true, message: 'Producto creado exitosamente', data: { ProductoID: productoId } });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al crear el producto', error: error.message });
        }
    },

    // Actualizar un producto
    async update(req, res) {
        try {
            const affectedRows = await ProductoModel.updateProducto(req.params.id, req.body);
            if (affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Producto no encontrado o no actualizado' });
            }
            res.status(200).json({ success: true, message: 'Producto actualizado exitosamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al actualizar el producto', error: error.message });
        }
    },

    // Eliminar un producto (eliminación lógica)
    async delete(req, res) {
        try {
            const affectedRows = await ProductoModel.deleteProducto(req.params.id);
            if (affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Producto no encontrado o ya eliminado' });
            }
            res.status(200).json({ success: true, message: 'Producto eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Error al eliminar el producto', error: error.message });
        }
    }
};

module.exports = productoController;