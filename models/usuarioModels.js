const db = require('../config/database'); // Asegúrate de que la ruta sea correcta

class UsuarioModel {
    static async getAllUsuarios(){
        try {
            const [rows] = await db.query('SELECT * FROM Usuario');
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UsuarioModel;