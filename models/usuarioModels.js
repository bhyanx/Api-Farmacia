const db = require('../config/database');

class UsuarioModel {
    static async getAllUsuarios() {
        try {
            const [rows] = await db.query(`
                SELECT * 
                FROM Usuario 
                WHERE deleted_at IS NULL
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getUsuarioById(id) {
        try {
            const [rows] = await db.query(`
                SELECT * 
                FROM Usuario 
                WHERE UsuarioID = ? AND deleted_at IS NULL
            `, [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async createUsuario(data) {
        try {
            // Verificar si los datos están en usuarioData o directamente en el cuerpo
            const usuarioData = data.usuarioData || data;
    
            // Extraer datos con valores por defecto
            const Nombre = usuarioData.Nombre || '';
            const Rol = usuarioData.Rol || '';
            const Email = usuarioData.Email || '';
            const Contrasena = usuarioData.Contrasena || '';
            const Estado = usuarioData.Estado || 'Activo';
    
            // Validar campos obligatorios
            if (!Nombre.trim() || !Rol.trim() || !Email.trim() || !Contrasena.trim()) {
                throw new Error('Nombre, Rol, Email y Contrasena son campos obligatorios');
            }
    
            // Insertar el usuario en la base de datos
            const [result] = await db.query(
                'INSERT INTO Usuario (Nombre, Rol, Email, Contrasena, Estado, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
                [Nombre, Rol, Email, Contrasena, Estado]
            );
    
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async updateUsuario(id, data) {
        try {
            // Verificar si los datos están en usuarioData o directamente en el cuerpo
            const usuarioData = data.usuarioData || data;
    
            // Extraer datos con valores por defecto
            const Nombre = usuarioData.Nombre || '';
            const Rol = usuarioData.Rol || '';
            const Email = usuarioData.Email || '';
            const Contrasena = usuarioData.Contrasena || null; // Contraseña puede ser opcional
            const Estado = usuarioData.Estado || 'Activo';
    
            // Validar campos obligatorios
            if (!Nombre.trim() || !Rol.trim() || !Email.trim()) {
                throw new Error('Nombre, Rol y Email son campos obligatorios');
            }
    
            // Actualizar el usuario en la base de datos
            await db.query(
                'UPDATE Usuario SET Nombre = ?, Rol = ?, Email = ?, Contrasena = ?, Estado = ?, updated_at = NOW() WHERE UsuarioID = ?',
                [Nombre, Rol, Email, Contrasena, Estado, id]
            );
    
            return true;
        } catch (error) {
            throw error;
        }
    }

    static async deleteUsuario(id) {
        try {
            await db.query('UPDATE Usuario SET deleted_at = NOW() WHERE UsuarioID = ?', [id]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UsuarioModel;