const Usuario = require('../models/usuarioModels');

exports.getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.getAllUsuarios();
        res.status(200).json({ success: true, data: usuarios });
    }catch (error){
        res.status(500).json({ success: false, message: 'Error al obtener los usuarios', error: error.message });
    }
}