const db = require('../config/database'); // Asegúrate de que la ruta sea correcta

class ProductoModel {
    // Obtener todos los productos
    static async getAllProductos() {
        try {
            const [rows] = await db.query('SELECT * FROM Producto WHERE deleted_at IS NULL');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Obtener un producto por ID
    static async getProductoById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM Producto WHERE ProductoID = ? AND deleted_at IS NULL', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Crear un nuevo producto
    static async createProducto(data) {
        try {
            const { Nombre, NombreGenerico, Categoria, StockActual, StockMinimo, PrecioUnitario, FechaVencimiento, Lote, Ubicacion } = data;
            const [result] = await db.query(
                'INSERT INTO Producto (Nombre, NombreGenerico, Categoria, StockActual, StockMinimo, PrecioUnitario, FechaVencimiento, Lote, Ubicacion, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())',
                [Nombre, NombreGenerico, Categoria, StockActual, StockMinimo, PrecioUnitario, FechaVencimiento, Lote, Ubicacion]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Actualizar un producto
    static async updateProducto(id, data) {
        try {
            const { Nombre, NombreGenerico, Categoria, StockActual, StockMinimo, PrecioUnitario, FechaVencimiento, Lote, Ubicacion } = data;
            const [result] = await db.query(
                'UPDATE Producto SET Nombre = ?, NombreGenerico = ?, Categoria = ?, StockActual = ?, StockMinimo = ?, PrecioUnitario = ?, FechaVencimiento = ?, Lote = ?, Ubicacion = ?, updated_at = NOW() WHERE ProductoID = ? AND deleted_at IS NULL',
                [Nombre, NombreGenerico, Categoria, StockActual, StockMinimo, PrecioUnitario, FechaVencimiento, Lote, Ubicacion, id]
            );
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }

    // Eliminar un producto (eliminación lógica)
    static async deleteProducto(id) {
        try {
            const [result] = await db.query(
                'UPDATE Producto SET deleted_at = NOW() WHERE ProductoID = ?',
                [id]
            );
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductoModel;