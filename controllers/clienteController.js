const ClienteModel = require('../models/clienteModels');

const clienteController = {
    // Crear un nuevo cliente
    async createClientes(req, res) {
        try {
            const result = await ClienteModel.createCliente(req.body);
            res.status(201).json({ 
                message: 'Cliente creado exitosamente',
                clienteId: result 
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Obtener todos los clientes
    async getAllClientes(req, res) {
        try {
            const clientes = await ClienteModel.getAllClientes();
            res.json(clientes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener un cliente por ID
    async getByIdClientes(req, res) {
        try {
            const cliente = await ClienteModel.getClienteById(req.params.id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            res.json(cliente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Actualizar un cliente
    async updateClientes(req, res) {
        try {
            const cliente = await ClienteModel.getClienteById(req.params.id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            
            await ClienteModel.updateCliente(req.params.id, req.body);
            
            const clienteActualizado = await ClienteModel.getClienteById(req.params.id);
            res.json({
                message: 'Cliente actualizado exitosamente',
                cliente: clienteActualizado
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Eliminar un cliente (soft delete)
    async deleteClientes(req, res) {
        try {
            const cliente = await ClienteModel.getClienteById(req.params.id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            
            await ClienteModel.deleteCliente(req.params.id);
            res.json({ message: 'Cliente eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = clienteController; 