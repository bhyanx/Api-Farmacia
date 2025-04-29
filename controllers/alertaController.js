const AlertaModel = require('../models/alertaModels');

const alertaController = {
    // Obtener todas las alertas
    async getAll(req, res) {
        try {
            const alertas = await AlertaModel.getAllAlertas();
            res.status(200).json(alertas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener una alerta por ID
    async getById(req, res) {
        try {
            const alerta = await AlertaModel.getAlertaById(req.params.id);
            if (!alerta) {
                return res.status(404).json({ error: 'Alerta no encontrada' });
            }
            res.status(200).json(alerta);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Crear una nueva alerta
    async create(req, res) {
        try {
            const alertaId = await AlertaModel.createAlerta(req.body);
            res.status(201).json({ message: 'Alerta creada exitosamente', alertaId });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Actualizar una alerta
    async update(req, res) {
        try {
            const success = await AlertaModel.updateAlerta(req.params.id, req.body);
            if (!success) {
                return res.status(404).json({ error: 'Alerta no encontrada' });
            }
            res.status(200).json({ message: 'Alerta actualizada exitosamente' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Eliminar una alerta
    async delete(req, res) {
        try {
            const success = await AlertaModel.deleteAlerta(req.params.id);
            if (!success) {
                return res.status(404).json({ error: 'Alerta no encontrada' });
            }
            res.status(200).json({ message: 'Alerta eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = alertaController;