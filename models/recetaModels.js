const db = require('../config/database');

class RecetaModel {
    // Obtener todas las recetas
    static async getAllRecetas() {
        try {
            const [rows] = await db.query('SELECT * FROM Receta WHERE deleted_at IS NULL');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Obtener una receta por ID
    static async getRecetaById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM Receta WHERE RecetaID = ? AND deleted_at IS NULL', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Crear una nueva receta
    static async createReceta(data) {
        try {
            const recetaData = data.recetaData || data;

            // Extraer datos con valores por defecto
            const ClienteID = recetaData.ClienteID;
            const FechaEmision = recetaData.FechaEmision || new Date();
            const Medico = recetaData.Medico || '';
            const Estado = recetaData.Estado || 'Pendiente';

            // Validar campos obligatorios
            if (!ClienteID || !Medico.trim()) {
                throw new Error('ClienteID y Medico son campos obligatorios');
            }

            // Insertar la receta en la base de datos
            const [result] = await db.query(
                'INSERT INTO Receta (ClienteID, FechaEmision, Medico, Estado, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
                [ClienteID, FechaEmision, Medico, Estado]
            );

            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Actualizar una receta
    static async updateReceta(id, data) {
        try {
            const recetaData = data.recetaData || data;

            // Extraer datos con valores por defecto
            const ClienteID = recetaData.ClienteID;
            const FechaEmision = recetaData.FechaEmision || new Date();
            const Medico = recetaData.Medico || '';
            const Estado = recetaData.Estado || 'Pendiente';

            // Validar campos obligatorios
            if (!ClienteID || !Medico.trim()) {
                throw new Error('ClienteID y Medico son campos obligatorios');
            }

            // Actualizar la receta en la base de datos
            await db.query(
                'UPDATE Receta SET ClienteID = ?, FechaEmision = ?, Medico = ?, Estado = ?, updated_at = NOW() WHERE RecetaID = ?',
                [ClienteID, FechaEmision, Medico, Estado, id]
            );

            return true;
        } catch (error) {
            throw error;
        }
    }

    // Eliminar una receta (eliminación lógica)
    static async deleteReceta(id) {
        try {
            const connection = await db.getConnection();
            try {
                await connection.beginTransaction();

                await connection.query(
                    'UPDATE Receta SET deleted_at = NOW() WHERE RecetaID = ?',
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

module.exports = RecetaModel;