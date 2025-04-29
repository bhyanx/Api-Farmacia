const RecetaModel = require('../models/recetaModels');

const recetaController = {
    // Obtener todas las recetas
    async getAll(req, res) {
        try {
            const recetas = await RecetaModel.getAllRecetas();
            res.status(200).json(recetas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener una receta por ID
    async getById(req, res) {
        try {
            const receta = await RecetaModel.getRecetaById(req.params.id);
            if (!receta) {
                return res.status(404).json({ error: 'Receta no encontrada' });
            }
            res.status(200).json(receta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear una nueva receta
    async create(req, res) {
        try {
            const recetaId = await RecetaModel.createReceta(req.body);
            res.status(201).json({ message: 'Receta creada exitosamente', recetaId });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Actualizar una receta
    async update(req, res) {
        try {
            const success = await RecetaModel.updateReceta(req.params.id, req.body);
            if (!success) {
                return res.status(404).json({ error: 'Receta no encontrada' });
            }
            res.status(200).json({ message: 'Receta actualizada exitosamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Eliminar una receta (soft delete)
    async delete(req, res) {
        try {
            const success = await RecetaModel.deleteReceta(req.params.id);
            if (!success) {
                return res.status(404).json({ error: 'Receta no encontrada' });
            }
            res.status(200).json({ message: 'Receta eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = recetaController;