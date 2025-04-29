const DetalleRecetaModel = require('../models/detalleRecetaModels');

const detalleRecetaController = {
    // Obtener todos los detalles de recetas
    async getAll(req, res) {
        try {
            const detallesReceta = await DetalleRecetaModel.getAllDetallesReceta();
            res.status(200).json(detallesReceta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener un detalle de receta por ID
    async getById(req, res) {
        try {
            const detalleReceta = await DetalleRecetaModel.getDetalleRecetaById(req.params.id);
            if (!detalleReceta) {
                return res.status(404).json({ error: 'Detalle de receta no encontrado' });
            }
            res.status(200).json(detalleReceta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear un nuevo detalle de receta
    async create(req, res) {
        try {
            const detalleRecetaId = await DetalleRecetaModel.createDetalleReceta(req.body);
            res.status(201).json({ message: 'Detalle de receta creado exitosamente', detalleRecetaId });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Actualizar un detalle de receta
    async update(req, res) {
        try {
            const success = await DetalleRecetaModel.updateDetalleReceta(req.params.id, req.body);
            if (!success) {
                return res.status(404).json({ error: 'Detalle de receta no encontrado' });
            }
            res.status(200).json({ message: 'Detalle de receta actualizado exitosamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Eliminar un detalle de receta
    async delete(req, res) {
        try {
            const success = await DetalleRecetaModel.deleteDetalleReceta(req.params.id);
            if (!success) {
                return res.status(404).json({ error: 'Detalle de receta no encontrado' });
            }
            res.status(200).json({ message: 'Detalle de receta eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = detalleRecetaController;