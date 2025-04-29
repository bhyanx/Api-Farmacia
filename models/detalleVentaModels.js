const db = require('../config/database');

class DetalleVentaModel {
    static async getAllDetallesVenta() {
        try {
            const [rows] = await db.query('SELECT * FROM DetalleVenta');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getAllDetallesByVentaId(ventaId) {
        try {
            const [rows] = await db.query('SELECT * FROM DetalleVenta WHERE VentaID = ?', [ventaId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getDetalleVentaById(detalleVentaId) {
        try {
            const [rows] = await db.query('SELECT * FROM DetalleVenta WHERE DetalleVentaID = ?', [detalleVentaId]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async createDetalleVenta(detalleVentaData) {
        try {
            const { VentaID, ProductoID, Cantidad, PrecioUnitario } = detalleVentaData;
            const Subtotal = Cantidad * PrecioUnitario;

            const [result] = await db.query(
                `INSERT INTO DetalleVenta 
                (VentaID, ProductoID, Cantidad, PrecioUnitario, Subtotal) 
                VALUES (?, ?, ?, ?, ?)`,
                [VentaID, ProductoID, Cantidad, PrecioUnitario, Subtotal]
            );

            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async updateDetalleVenta(detalleVentaId, detalleVentaData) {
        try {
            const { VentaID, ProductoID, Cantidad, PrecioUnitario } = detalleVentaData;
            const Subtotal = Cantidad * PrecioUnitario;

            const [result] = await db.query(
                `UPDATE DetalleVenta SET 
                VentaID = ?, 
                ProductoID = ?, 
                Cantidad = ?, 
                PrecioUnitario = ?, 
                Subtotal = ? 
                WHERE DetalleVentaID = ?`,
                [VentaID, ProductoID, Cantidad, PrecioUnitario, Subtotal, detalleVentaId]
            );

            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async deleteDetalleVenta(detalleVentaId) {
        try {
            const [result] = await db.query('DELETE FROM DetalleVenta WHERE DetalleVentaID = ?', [detalleVentaId]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async getDetallesConProductoInfo(ventaId) {
        try {
            const [rows] = await db.query(
                `SELECT dv.*, p.Nombre as ProductoNombre, p.PrecioUnitario as PrecioLista 
                FROM DetalleVenta dv
                JOIN Producto p ON dv.ProductoID = p.ProductoID
                WHERE dv.VentaID = ?`,
                [ventaId]
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DetalleVentaModel;