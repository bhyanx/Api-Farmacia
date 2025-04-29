const db = require('../config/database'); // Asegúrate de que la ruta sea correcta

class CompraModel {
    // Obtener todas las compras
    static async getAllCompras() {
        try {
            const [rows] = await db.query('SELECT * FROM Compra WHERE deleted_at IS NULL');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Obtener una compra por ID
    static async getCompraById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM Compra WHERE CompraID = ? AND deleted_at IS NULL', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Crear una nueva compra
    static async createCompra(data) {
        try {
            const { ProveedorID, FechaCompra, FechaEntrega, Total, Estado } = data;
            const [result] = await db.query(
                'INSERT INTO Compra (ProveedorID, FechaCompra, FechaEntrega, Total, Estado, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
                [ProveedorID, FechaCompra, FechaEntrega, Total, Estado]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Actualizar una compra
    static async updateCompra(id, data) {
        try {
            const { ProveedorID, FechaCompra, FechaEntrega, Total, Estado } = data;
            const [result] = await db.query(
                'UPDATE Compra SET ProveedorID = ?, FechaCompra = ?, FechaEntrega = ?, Total = ?, Estado = ?, updated_at = NOW() WHERE CompraID = ? AND deleted_at IS NULL',
                [ProveedorID, FechaCompra, FechaEntrega, Total, Estado, id]
            );
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }

    // Eliminar una compra (eliminación lógica)
    static async deleteCompra(id) {
        try {
            const [result] = await db.query(
                'UPDATE Compra SET deleted_at = NOW() WHERE CompraID = ?',
                [id]
            );
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CompraModel;