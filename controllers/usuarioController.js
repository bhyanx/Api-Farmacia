const UsuarioModel = require('../models/usuarioModels');

const usuarioController = {
    // Obtener todos los usuarios
    async getAll(req, res) {
        try {
            const usuarios = await UsuarioModel.getAllUsuarios();
            res.status(200).json(usuarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener un usuario por ID
    async getById(req, res) {
        try {
            const usuario = await UsuarioModel.getUsuarioById(req.params.id);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear un nuevo usuario
    async create(req, res) {
        try {
            const usuarioId = await UsuarioModel.createUsuario(req.body);
            res.status(201).json({ message: 'Usuario creado exitosamente', usuarioId });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Actualizar un usuario
    async update(req, res) {
        try {
            const success = await UsuarioModel.updateUsuario(req.params.id, req.body);
            if (!success) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.status(200).json({ message: 'Usuario actualizado exitosamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Eliminar un usuario (soft delete)
    async delete(req, res) {
        try {
            const success = await UsuarioModel.deleteUsuario(req.params.id);
            if (!success) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.status(200).json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = usuarioController;