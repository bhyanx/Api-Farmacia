const ClienteModel = require('../models/clienteModels');

const clienteController = {
    // Crear un nuevo cliente
    async createCliente(req, res) {
        try {
            const clienteId = await ClienteModel.createCliente(req.body);
            res.status(201).json({ 
                message: 'Cliente creado exitosamente',
                clienteId 
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Obtener todos los clientes
    async getAllClientes(req, res) {
        try {
            const clientes = await ClienteModel.getAllClientes();
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener un cliente por ID
    async getClienteById(req, res) {
        try {
            const cliente = await ClienteModel.getClienteById(req.params.id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            res.status(200).json(cliente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar un cliente
    async updateCliente(req, res) {
        try {
            const cliente = await ClienteModel.getClienteById(req.params.id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            
            await ClienteModel.updateCliente(req.params.id, req.body);
            
            const clienteActualizado = await ClienteModel.getClienteById(req.params.id);
            res.status(200).json({
                message: 'Cliente actualizado exitosamente',
                cliente: clienteActualizado
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Eliminar un cliente (soft delete)
    async deleteCliente(req, res) {
        try {
            const cliente = await ClienteModel.getClienteById(req.params.id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            
            await ClienteModel.deleteCliente(req.params.id);
            res.status(200).json({ message: 'Cliente eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = clienteController;