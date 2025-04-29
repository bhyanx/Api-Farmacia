const db = require('../config/database');

class ProveedorModel {
    // Obtener todos los proveedores
    static async getAllProveedores() {
        try {
            const [rows] = await db.query('SELECT * FROM Proveedor WHERE deleted_at IS NULL');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Obtener un proveedor por ID
    static async getProveedorById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM Proveedor WHERE ProveedorID = ? AND deleted_at IS NULL', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Crear un nuevo proveedor
    static async createProveedor(data) {
        try {
            const proveedorData = data.proveedorData || data;

            // Extraer datos con valores por defecto
            const Nombre = proveedorData.Nombre || '';
            const Contacto = proveedorData.Contacto || '';
            const Direccion = proveedorData.Direccion || '';
            const Estado = proveedorData.Estado || 'Activo';

            // Validar campos obligatorios
            if (!Nombre.trim() || !Contacto.trim() || !Direccion.trim()) {
                throw new Error('Nombre, Contacto y Dirección son campos obligatorios');
            }

            // Insertar el proveedor en la base de datos
            const [result] = await db.query(
                'INSERT INTO Proveedor (Nombre, Contacto, Direccion, Estado, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
                [Nombre, Contacto, Direccion, Estado]
            );

            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Actualizar un proveedor
    static async updateProveedor(id, data) {
        try {
            const proveedorData = data.proveedorData || data;

            // Extraer datos con valores por defecto
            const Nombre = proveedorData.Nombre || '';
            const Contacto = proveedorData.Contacto || '';
            const Direccion = proveedorData.Direccion || '';
            const Estado = proveedorData.Estado || 'Activo';

            // Validar campos obligatorios
            if (!Nombre.trim() || !Contacto.trim() || !Direccion.trim()) {
                throw new Error('Nombre, Contacto y Dirección son campos obligatorios');
            }

            // Actualizar el proveedor en la base de datos
            await db.query(
                'UPDATE Proveedor SET Nombre = ?, Contacto = ?, Direccion = ?, Estado = ?, updated_at = NOW() WHERE ProveedorID = ?',
                [Nombre, Contacto, Direccion, Estado, id]
            );

            return true;
        } catch (error) {
            throw error;
        }
    }

    // Eliminar un proveedor (eliminación lógica)
    static async deleteProveedor(id) {
        try {
            const connection = await db.getConnection();
            try {
                await connection.beginTransaction();

                await connection.query(
                    'UPDATE Proveedor SET deleted_at = NOW() WHERE ProveedorID = ?',
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

module.exports = ProveedorModel;