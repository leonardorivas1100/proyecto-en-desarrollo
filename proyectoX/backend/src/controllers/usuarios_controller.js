import Usuario from "../models/usuarios_model.js";

export const create_user = async (req, res) => {
    try {

        // Campos de la coleccion usuarios
        const { numeroIdentificacion, nombres, apellidos, telefono, email, password, id_rol } = req.body;

        // Verificar si ya hay un usuario con el mismo número de identificación
        const usuario_existente = await Usuario.findOne({ numeroIdentificacion });
        if (usuario_existente) {
            return res.status(400).json({ message: 'Ya existe un usuario con este numero de identificacion' });
        }

        // Verificar si ya hay un usuario con el mismo correo electrónico
        const usuario_existente2 = await Usuario.findOne({ email });
        if (usuario_existente2) {
            return res.status(400).json({ message: 'Ya existe un usuario con este correo electronico' });
        }

        // Verificar si ya hay un usuario con los mismos nombres y apellidos
        const usuario_existente3 = await Usuario.findOne({ nombres, apellidos });
        if (usuario_existente3) {
            return res.status(400).json({ message: 'Ya existe un usuario con estos nombres y apellidos' });
        }

        // Crear y guardar el nuevo usuario
        const new_user = new Usuario({
            numeroIdentificacion, 
            nombres, 
            apellidos, 
            telefono, 
            email, 
            password, 
            id_rol
        });
        await new_user.save();

        // Responder con éxito
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            Usuario_creado: new_user
        });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el Usuario', 
            error: error.message });
    }
};