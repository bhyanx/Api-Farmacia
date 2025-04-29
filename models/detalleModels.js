const db = require('../config/database');

class DetalleCompraModel {
    static async getAllDetallesCompra() {
        try {
            const [rows] = await db.query('SELECT * FROM DetalleCompra ',);
            return rows;
        } catch (error) {
            throw error;
        }
    }


    static async getAllDetallesByCompraId(compraId) {
        try {
            const [rows] = await db.query('SELECT * FROM DetalleCompra WHERE CompraID = ?', [compraId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getDetalleCompraById(detalleCompraId) {
        try {
            const [rows] = await db.query('SELECT * FROM DetalleCompra WHERE DetalleCompraID = ?', [detalleCompraId]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async createDetalleCompra(detalleCompraData) {
        try {
            const { CompraID, ProductoID, Cantidad, PrecioUnitario } = detalleCompraData;
            const Subtotal = Cantidad * PrecioUnitario;

            const [result] = await db.query(
                `INSERT INTO DetalleCompra 
                (CompraID, ProductoID, Cantidad, PrecioUnitario, Subtotal) 
                VALUES (?, ?, ?, ?, ?)`,
                [CompraID, ProductoID, Cantidad, PrecioUnitario, Subtotal]
            );

            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async updateDetalleCompra(detalleCompraId, detalleCompraData) {
        try {
            const { CompraID, ProductoID, Cantidad, PrecioUnitario } = detalleCompraData;
            const Subtotal = Cantidad * PrecioUnitario;

            const [result] = await db.query(
                `UPDATE DetalleCompra SET 
                CompraID = ?, 
                ProductoID = ?, 
                Cantidad = ?, 
                PrecioUnitario = ?, 
                Subtotal = ? 
                WHERE DetalleCompraID = ?`,
                [CompraID, ProductoID, Cantidad, PrecioUnitario, Subtotal, detalleCompraId]
            );

            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async deleteDetalleCompra(detalleCompraId) {
        try {
            const [result] = await db.query('DELETE FROM DetalleCompra WHERE DetalleCompraID = ?', [detalleCompraId]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async getDetallesConProductoInfo(compraId) {
        try {
            const [rows] = await db.query(
                `SELECT dc.*, p.Nombre as ProductoNombre, p.NombreGenerico, p.StockActual 
                FROM DetalleCompra dc
                JOIN Producto p ON dc.ProductoID = p.ProductoID
                WHERE dc.CompraID = ?`,
                [compraId]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getTotalCompra(compraId) {
        try {
            const [rows] = await db.query(
                'SELECT SUM(Subtotal) as Total FROM DetalleCompra WHERE CompraID = ?',
                [compraId]
            );
            return rows[0].Total || 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DetalleCompraModel;