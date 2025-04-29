const db = require('../config/database');

class DetalleRecetaModel {
    // Obtener todos los detalles de recetas
    static async getAllDetallesReceta() {
        try {
            const [rows] = await db.query('SELECT * FROM DetalleReceta');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Obtener un detalle de receta por ID
    static async getDetalleRecetaById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM DetalleReceta WHERE DetalleRecetaID = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Crear un nuevo detalle de receta
    static async createDetalleReceta(data) {
        try {
            const detalleRecetaData = data.detalleRecetaData || data;

            // Extraer datos
            const RecetaID = detalleRecetaData.RecetaID;
            const ProductoID = detalleRecetaData.ProductoID;
            const Dosis = detalleRecetaData.Dosis || '';
            const Cantidad = detalleRecetaData.Cantidad;

            // Validar campos obligatorios
            if (!RecetaID || !ProductoID || !Cantidad) {
                throw new Error('RecetaID, ProductoID y Cantidad son campos obligatorios');
            }

            // Insertar en la base de datos
            const [result] = await db.query(
                'INSERT INTO DetalleReceta (RecetaID, ProductoID, Dosis, Cantidad) VALUES (?, ?, ?, ?)',
                [RecetaID, ProductoID, Dosis, Cantidad]
            );

            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Actualizar un detalle de receta
    static async updateDetalleReceta(id, data) {
        try {
            const detalleRecetaData = data.detalleRecetaData || data;

            // Extraer datos
            const RecetaID = detalleRecetaData.RecetaID;
            const ProductoID = detalleRecetaData.ProductoID;
            const Dosis = detalleRecetaData.Dosis || '';
            const Cantidad = detalleRecetaData.Cantidad;

            // Validar campos obligatorios
            if (!RecetaID || !ProductoID || !Cantidad) {
                throw new Error('RecetaID, ProductoID y Cantidad son campos obligatorios');
            }

            // Actualizar en la base de datos
            await db.query(
                'UPDATE DetalleReceta SET RecetaID = ?, ProductoID = ?, Dosis = ?, Cantidad = ? WHERE DetalleRecetaID = ?',
                [RecetaID, ProductoID, Dosis, Cantidad, id]
            );

            return true;
        } catch (error) {
            throw error;
        }
    }

    // Eliminar un detalle de receta
    static async deleteDetalleReceta(id) {
        try {
            await db.query('DELETE FROM DetalleReceta WHERE DetalleRecetaID = ?', [id]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DetalleRecetaModel;