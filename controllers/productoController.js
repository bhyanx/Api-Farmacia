const Producto = require('../models/productoModels');

// Obtener todos los productos
exports.getAllProductos = async (req, res) => {
    try {
        const productos = await Producto.getAllProductos();
        res.status(200).json({ success: true, data: productos });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los productos', error: error.message });
    }
};

// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
    try {
        const producto = await Producto.getProductoById(req.params.id);
        if (!producto) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }
        res.status(200).json({ success: true, data: producto });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el producto', error: error.message });
    }
};

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
    try {
        const productoId = await Producto.createProducto(req.body);
        res.status(201).json({ success: true, message: 'Producto creado exitosamente', data: { ProductoID: productoId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al crear el producto', error: error.message });
    }
};

// Actualizar un producto
exports.updateProducto = async (req, res) => {
    try {
        const affectedRows = await Producto.updateProducto(req.params.id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado o no actualizado' });
        }
        res.status(200).json({ success: true, message: 'Producto actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al actualizar el producto', error: error.message });
    }
};

// Eliminar un producto (eliminación lógica)
exports.deleteProducto = async (req, res) => {
    try {
        const affectedRows = await Producto.deleteProducto(req.params.id);
        if (affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado o ya eliminado' });
        }
        res.status(200).json({ success: true, message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al eliminar el producto', error: error.message });
    }
};