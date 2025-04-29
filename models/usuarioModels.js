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

    static async createUsuario(usuarioData) {
        try {
            if (!usuarioData || typeof usuarioData !== 'object') {
                throw new Error('Datos del usuario no válidos');
            }

            const { Nombre = '', Rol = '', Email = '', Contrasena = '', Estado = 'Activo' } = usuarioData;

            if (!Nombre.trim() || !Rol.trim() || !Email.trim() || !Contrasena.trim()) {
                throw new Error('Nombre, Rol, Email y Contrasena son campos obligatorios');
            }

            const [result] = await db.query(
                'INSERT INTO Usuario (Nombre, Rol, Email, Contrasena, Estado, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
                [Nombre, Rol, Email, Contrasena, Estado]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async updateUsuario(id, usuarioData) {
        try {
            if (!usuarioData || typeof usuarioData !== 'object') {
                throw new Error('Datos del usuario no válidos');
            }

            const { Nombre = '', Rol = '', Email = '', Contrasena = null, Estado = 'Activo' } = usuarioData;

            if (!Nombre.trim() || !Rol.trim() || !Email.trim()) {
                throw new Error('Nombre, Rol y Email son campos obligatorios');
            }

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