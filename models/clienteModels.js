const db = require('../config/database');

class ClienteModel {
    static async getAllClientes() {
        try {
            const [rows] = await db.query('SELECT * FROM Cliente WHERE deleted_at IS NULL');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getClienteById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM Cliente WHERE ClienteID = ? AND deleted_at IS NULL', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async createCliente(data) {
        try {
            // Validación básica de los datos
            if (!data || !data.clienteData) {
                throw new Error('No se proporcionaron datos del cliente');
            }

            const clienteData = data.clienteData;

            // Extraer datos con valores por defecto
            const nombre = clienteData.nombre || '';
            const dni = clienteData.DNI || '';
            const telefono = clienteData.telefono || null;
            const email = clienteData.email || null;
            const historialMedico = clienteData.historialMedico || null;

            // Validar campos obligatorios
            if (!nombre.trim()) {
                throw new Error('El nombre es obligatorio');
            }
            if (!dni.trim()) {
                throw new Error('El DNI es obligatorio');
            }

            const [result] = await db.query(
                'INSERT INTO Cliente (Nombre, DNI, Telefono, Email, HistorialMedico, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
                [nombre, dni, telefono, email, historialMedico]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async updateCliente(id, data) {
        try {
            // Validación básica de los datos
            if (!data || !data.clienteData) {
                throw new Error('No se proporcionaron datos para actualizar');
            }

            const clienteData = data.clienteData;

            // Extraer datos con valores por defecto
            const nombre = clienteData.nombre || '';
            const dni = clienteData.DNI || '';
            const telefono = clienteData.telefono || null;
            const email = clienteData.email || null;
            const historialMedico = clienteData.historialMedico || null;

            // Validar campos obligatorios
            if (!nombre.trim()) {
                throw new Error('El nombre es obligatorio');
            }
            if (!dni.trim()) {
                throw new Error('El DNI es obligatorio');
            }

            // Primero verificamos si el cliente existe
            const [existingClient] = await db.query(
                'SELECT ClienteID FROM Cliente WHERE ClienteID = ? AND deleted_at IS NULL',
                [id]
            );

            if (!existingClient || existingClient.length === 0) {
                throw new Error('Cliente no encontrado');
            }

            // Realizamos la actualización en una transacción separada
            const connection = await db.getConnection();
            try {
                await connection.beginTransaction();

                await connection.query(
                    'UPDATE Cliente SET Nombre = ?, DNI = ?, Telefono = ?, Email = ?, HistorialMedico = ?, updated_at = NOW() WHERE ClienteID = ?',
                    [nombre, dni, telefono, email, historialMedico, id]
                );

                await connection.commit();
                return true;
            } catch (error) {
                await connection.rollback();
                throw error;
            } finally {
                connection.release();
            }
        } catch (error) {
            throw error;
        }
    }

    static async deleteCliente(id) {
        try {
            const connection = await db.getConnection();
            try {
                await connection.beginTransaction();
                
                await connection.query(
                    'UPDATE Cliente SET deleted_at = NOW() WHERE ClienteID = ?',
                    [id]
                );

                await connection.commit();
                return true;
            } catch (error) {
                await connection.rollback();
                throw error;
            } finally {
                connection.release();
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ClienteModel; 