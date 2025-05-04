const ProductoModel = require('../models/productoModels');

const productoController = {
    // Obtener todos los productos
    async getAll(req, res) {
        try {
            const productos = await ProductoModel.getAllProductos();
            res.status(200).json({ success: true, data: productos });
        } catch (error) {
            console.error('Error al obtener productos:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Error al obtener los productos', 
                error: error.message 
            });
        }
    },

    // Obtener un producto por ID
    async getById(req, res) {
        try {
            const producto = await ProductoModel.getProductoById(req.params.id);
            if (!producto) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Producto no encontrado' 
                });
            }
            res.status(200).json({ success: true, data: producto });
        } catch (error) {
            console.error('Error al obtener producto:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Error al obtener el producto', 
                error: error.message 
            });
        }
    },

    // Crear un nuevo producto
    async create(req, res) {
        try {
            // Validar que el cuerpo de la petición sea un objeto válido
            if (!req.body || typeof req.body !== 'object') {
                return res.status(400).json({ 
                    success: false, 
                    message: 'El cuerpo de la petición debe ser un objeto JSON válido' 
                });
            }

            // Validar que no haya campos adicionales no permitidos
            const allowedFields = [
                'Nombre', 'NombreGenerico', 'Categoria', 'StockActual', 
                'StockMinimo', 'PrecioUnitario', 'FechaVencimiento', 
                'Lote', 'Ubicacion'
            ];
            
            const receivedFields = Object.keys(req.body);
            const invalidFields = receivedFields.filter(field => !allowedFields.includes(field));
            
            if (invalidFields.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: `Campos no permitidos: ${invalidFields.join(', ')}`
                });
            }

            // Intentar crear el producto
            const productoId = await ProductoModel.createProducto(req.body);
            
            res.status(201).json({ 
                success: true, 
                message: 'Producto creado exitosamente', 
                data: { ProductoID: productoId } 
            });
        } catch (error) {
            console.error('Error al crear producto:', error);
            
            // Determinar el código de estado apropiado
            const statusCode = error.message.includes('Campos requeridos') || 
                             error.message.includes('deben ser números') ||
                             error.message.includes('deben ser positivos') ||
                             error.message.includes('formato YYYY-MM-DD') ? 400 : 500;
            
            res.status(statusCode).json({ 
                success: false, 
                message: 'Error al crear el producto', 
                error: error.message 
            });
        }
    },

    // Actualizar un producto
    async update(req, res) {
        try {
            if (!req.body || typeof req.body !== 'object') {
                return res.status(400).json({ 
                    success: false, 
                    message: 'El cuerpo de la petición debe ser un objeto JSON válido' 
                });
            }

            const affectedRows = await ProductoModel.updateProducto(req.params.id, req.body);
            if (affectedRows === 0) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Producto no encontrado o no actualizado' 
                });
            }
            res.status(200).json({ 
                success: true, 
                message: 'Producto actualizado exitosamente' 
            });
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            const statusCode = error.message.includes('deben ser números') ||
                             error.message.includes('deben ser positivos') ||
                             error.message.includes('formato YYYY-MM-DD') ? 400 : 500;
            
            res.status(statusCode).json({ 
                success: false, 
                message: 'Error al actualizar el producto', 
                error: error.message 
            });
        }
    },

    // Eliminar un producto (eliminación lógica)
    async delete(req, res) {
        try {
            const affectedRows = await ProductoModel.deleteProducto(req.params.id);
            if (affectedRows === 0) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Producto no encontrado o ya eliminado' 
                });
            }
            res.status(200).json({ 
                success: true, 
                message: 'Producto eliminado exitosamente' 
            });
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Error al eliminar el producto', 
                error: error.message 
            });
        }
    }
};

module.exports = productoController;