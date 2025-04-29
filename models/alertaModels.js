const db = require('../config/database');

class AlertaModel {
    // Obtener todas las alertas
    static async getAllAlertas() {
        try {
            const [rows] = await db.query('SELECT * FROM Alerta');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Obtener una alerta por ID
    static async getAlertaById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM Alerta WHERE AlertaID = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Crear una nueva alerta
    static async createAlerta(data) {
        try {
            const alertaData = data.alertaData || data;

            // Extraer datos
            const ProductoID = alertaData.ProductoID;
            const Tipo = alertaData.Tipo || '';
            const FechaGeneracion = alertaData.FechaGeneracion || new Date();
            const Estado = alertaData.Estado || 'Pendiente';

            // Validar campos obligatorios
            if (!ProductoID || !Tipo.trim()) {
                throw new Error('ProductoID y Tipo son campos obligatorios');
            }

            // Insertar en la base de datos
            const [result] = await db.query(
                'INSERT INTO Alerta (ProductoID, Tipo, FechaGeneracion, Estado) VALUES (?, ?, ?, ?)',
                [ProductoID, Tipo, FechaGeneracion, Estado]
            );

            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Actualizar una alerta
    static async updateAlerta(id, data) {
        try {
            const alertaData = data.alertaData || data;

            // Extraer datos
            const ProductoID = alertaData.ProductoID;
            const Tipo = alertaData.Tipo || '';
            const FechaGeneracion = alertaData.FechaGeneracion || new Date();
            const Estado = alertaData.Estado || 'Pendiente';

            // Validar campos obligatorios
            if (!ProductoID || !Tipo.trim()) {
                throw new Error('ProductoID y Tipo son campos obligatorios');
            }

            // Actualizar en la base de datos
            await db.query(
                'UPDATE Alerta SET ProductoID = ?, Tipo = ?, FechaGeneracion = ?, Estado = ? WHERE AlertaID = ?',
                [ProductoID, Tipo, FechaGeneracion, Estado, id]
            );

            return true;
        } catch (error) {
            throw error;
        }
    }

    // Eliminar una alerta
    static async deleteAlerta(id) {
        try {
            await db.query('DELETE FROM Alerta WHERE AlertaID = ?', [id]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AlertaModel;