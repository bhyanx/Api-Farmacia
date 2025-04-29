const db = require('../config/database');

class ClienteModel {
    // Obtener todos los clientes
    static async getAllClientes() {
        try {
            const [rows] = await db.query('SELECT * FROM Cliente WHERE deleted_at IS NULL');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Obtener un cliente por ID
    static async getClienteById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM Cliente WHERE ClienteID = ? AND deleted_at IS NULL', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Crear un nuevo cliente
    static async createCliente(data) {
        try {
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

    // Actualizar un cliente
    static async updateCliente(id, data) {
        try {
            // Verificar si los datos están en clienteData o directamente en el cuerpo
            const clienteData = data.clienteData || data;
    
            const nombre = clienteData.Nombre || '';
            const dni = clienteData.DNI || '';
            const telefono = clienteData.Telefono || null;
            const email = clienteData.Email || null;
            const historialMedico = clienteData.HistorialMedico || null;
    
            if (!nombre.trim()) {
                throw new Error('El nombre es obligatorio');
            }
            if (!dni.trim()) {
                throw new Error('El DNI es obligatorio');
            }
    
            await db.query(
                'UPDATE Cliente SET Nombre = ?, DNI = ?, Telefono = ?, Email = ?, HistorialMedico = ?, updated_at = NOW() WHERE ClienteID = ?',
                [nombre, dni, telefono, email, historialMedico, id]
            );
    
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Eliminar un cliente (eliminación lógica)
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