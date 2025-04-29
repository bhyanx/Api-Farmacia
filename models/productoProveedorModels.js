const db = require('../config/database');

class ProductoProveedorModel {
    // Obtener todos los registros de ProductoProveedor
    static async getAllProductoProveedores() {
        try {
            const [rows] = await db.query(`
                SELECT 
                    prod.ProductoID, 
                    producto.NombreGenerico, 
                    prod.ProveedorID, 
                    proveedor.Nombre
                FROM ProductoProveedor prod
                INNER JOIN railway.Producto producto ON prod.ProductoID = producto.ProductoID
                INNER JOIN railway.Proveedor proveedor ON prod.ProveedorID = proveedor.ProveedorID
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Obtener un registro de ProductoProveedor por ProductoID y ProveedorID
    static async getProductoProveedorByIds(productoId, proveedorId) {
        try {
            const [rows] = await db.query(
                'SELECT * FROM ProductoProveedor WHERE ProductoID = ? AND ProveedorID = ?',
                [productoId, proveedorId]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Crear un nuevo registro de ProductoProveedor
    static async createProductoProveedor(data) {
        try {
            const productoProveedorData = data.productoProveedorData || data;

            // Extraer datos
            const ProductoID = productoProveedorData.ProductoID;
            const ProveedorID = productoProveedorData.ProveedorID;

            // Validar campos obligatorios
            if (!ProductoID || !ProveedorID) {
                throw new Error('ProductoID y ProveedorID son campos obligatorios');
            }

            // Insertar en la base de datos
            const [result] = await db.query(
                'INSERT INTO ProductoProveedor (ProductoID, ProveedorID) VALUES (?, ?)',
                [ProductoID, ProveedorID]
            );

            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Eliminar un registro de ProductoProveedor por ProductoID y ProveedorID
    static async deleteProductoProveedor(productoId, proveedorId) {
        try {
            await db.query(
                'DELETE FROM ProductoProveedor WHERE ProductoID = ? AND ProveedorID = ?',
                [productoId, proveedorId]
            );
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductoProveedorModel;