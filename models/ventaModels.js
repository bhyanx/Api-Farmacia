const db = require('../config/database');

class VentaModel {
    static async getAllVentas() {
        try {
            const [rows] = await db.query(`
                SELECT v.*, c.Nombre as ClienteNombre, c.DNI as ClienteDNI 
                FROM Venta v
                JOIN Cliente c ON v.ClienteID = c.ClienteID
                WHERE v.deleted_at IS NULL
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getVentaById(id) {
        try {
            const [rows] = await db.query(`
                SELECT v.*, c.Nombre as ClienteNombre, c.DNI as ClienteDNI 
                FROM Venta v
                JOIN Cliente c ON v.ClienteID = c.ClienteID
                WHERE v.VentaID = ? AND v.deleted_at IS NULL
            `, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async createVenta(ventaData) {
        try {
            if (!ventaData || typeof ventaData !== 'object') {
                throw new Error('Datos de la venta no válidos');
            }

            const { ClienteID = 0, Total = 0, MetodoPago = '', Estado = 'Completada' } = ventaData;
            
            if (!ClienteID || !MetodoPago) {
                throw new Error('ClienteID y MetodoPago son campos obligatorios');
            }

            const [result] = await db.query(
                'INSERT INTO Venta (ClienteID, FechaVenta, Total, MetodoPago, Estado, created_at, updated_at) VALUES (?, NOW(), ?, ?, ?, NOW(), NOW())',
                [ClienteID, Total, MetodoPago, Estado]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async updateVenta(id, ventaData) {
        try {
            if (!ventaData || typeof ventaData !== 'object') {
                throw new Error('Datos de la venta no válidos');
            }

            const { ClienteID = 0, Total = 0, MetodoPago = '', Estado = 'Completada' } = ventaData;
            
            if (!ClienteID || !MetodoPago) {
                throw new Error('ClienteID y MetodoPago son campos obligatorios');
            }

            await db.query(
                'UPDATE Venta SET ClienteID = ?, Total = ?, MetodoPago = ?, Estado = ?, updated_at = NOW() WHERE VentaID = ?',
                [ClienteID, Total, MetodoPago, Estado, id]
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    static async deleteVenta(id) {
        try {
            await db.query('UPDATE Venta SET deleted_at = NOW() WHERE VentaID = ?', [id]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    static async getVentasByCliente(clienteId) {
        try {
            const [rows] = await db.query(`
                SELECT v.*, c.Nombre as ClienteNombre, c.DNI as ClienteDNI 
                FROM Venta v
                JOIN Cliente c ON v.ClienteID = c.ClienteID
                WHERE v.ClienteID = ? AND v.deleted_at IS NULL
            `, [clienteId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = VentaModel;