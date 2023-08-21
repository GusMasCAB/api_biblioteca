const Usuario = require("../models/usuarioModel");

exports.getAllUsuarios= async(req,res,next)=>{
    try {
        const usuarios = await Usuario.find();
        if(usuarios.length===0){
            const error = new Error('No hay usuarios en la base de datos');
            error.status = 404;
            throw error;
        };
        res.status(200).json(usuarios);
    } catch (error) {
        next(error);   
    }
};

exports.getUsuarioById= async(req,res,next)=>{
    try {

        const userId = req.params.id;
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            const error = new Error('ID de usuario no válido');
            error.statusCode = 400;
            throw error;
        }

        const usuario = await Usuario.findById(userId);
        if(!usuario){
            const error = new Error('Usuario no encontrado');
            error.status = 404;
            throw error;
        };
        res.status(200).json(usuario);
    } catch (error) {
        next(error);   
    }       
}

exports.createUsuario = async(req,res,next)=>{
    try {
        const usuario = await Usuario.create(req.body);
        await usuario.save();

        res.status(201).json(usuario);
    } catch (error) {
        next(error);
    }
};

exports.updateUsuario = async(req, res, next)=>{
    try {

        const usuario = await Usuario.findByIdAndUpdate(req.params.id,req.body,{new: true});
        if(!usuario){
            const error = new Error("Usuario no encontrado");
            error.status = 404;
            throw error;
        };
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
};

exports.deleteUsuario = async(req, res, next)=>{
    try {
        const userId = req.params.id;
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            const error = new Error('ID de usuario no válido');
            error.statusCode = 400;
            throw error;
        }
        const usuarioEliminado = await Usuario.findByIdAndDelete(userId);

        if (!usuarioEliminado) {
            const error = new Error('Error al eliminar usuario no encontrado');
            error.status = 404;
            throw error;
        }
        res.status(200).json(usuarioEliminado);
    } catch (error) {
        next(error);
    }
}