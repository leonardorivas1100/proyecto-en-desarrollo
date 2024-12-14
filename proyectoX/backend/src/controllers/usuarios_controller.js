import Usuario from "../models/usuarios_model.js";

// 1. Crear un nuevo Usuario.
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

    //  En caso de error al crear el usuario.
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el Usuario',
            error: error.message
        });
    }
};


// 2. Obtener todos los Usuarios.
export const see_all_users = async (req, res) => {
    try {
        const user = await Usuario
        .find() // Busca todos los usuarios
        .populate('id_rol') // Busca y llena el campo id_rol con el nombre del rol correspondiente
        res.status(200).json({
            message: 'Usuarios econtrados con exito!',
            Usuarios_encontrados: user
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener los usuarios',
            error: error.message
        });
    }
};


// 3. Actualizar un usuario por su Numero de identificación.
export const update_user = async (req, res) => {
    try {
            // Verificar si el usuario existe
            const { numeroIdentificacion } = req.params;
            const { nombres, apellidos, telefono, email, password, id_rol  } = req.body;
            const user = await Usuario.findOne({numeroIdentificacion});
    
            // En caso de no haya un usuario para actualizar
            if (!user) {
                return res.status(404).json({
                    Usuario_no_encontrado: 'No pudo encontrarse este usuario.'
                });
            }
    
            // Verificar si el nuevo nombre ya está en uso por otro usuario
            const name_user_now = await Usuario.findOne({ nombres, apellidos });
            if (name_user_now && name_user_now.numeroIdentificacion !== numeroIdentificacion) {
                return res.status(400).json({
                    Error_nombre: 'Ya existe un usurario con este nombre'
                });
            }

            // Verificar si la nueva identificacion ya está en uso por otro usuario
            const identification_user_now = await Usuario.findOne({numeroIdentificacion });
            if (identification_user_now && identification_user_now.numeroIdentificacion !== numeroIdentificacion) {
                return res.status(400).json({
                    Error_identificacion: 'Ya existe un usurario con este numero de identificacion'
                });
            }

            // Verificar el nuevo correo ya está en uso por otro usuario
            const email_user_now = await Usuario.findOne({ email });
            if (email_user_now && email_user_now.numeroIdentificacion !== numeroIdentificacion) {
                return res.status(400).json({
                    Error_email: 'Ya existe un usurario con este correo electronico'
                });
            }

            // Verificar el numero telefonico ya está en uso por otro usuario
            const phone_user_now = await Usuario.findOne({ telefono });
            if (phone_user_now && phone_user_now.numeroIdentificacion !== numeroIdentificacion) {
                return res.status(400).json({
                    Error_number: 'Ya existe un usurario con este numero telfonico'
                });
            }

            // Actualizar el usuario.
        user.nombres = nombres;
        user.apellidos = apellidos;
        user.telefono = telefono;
        user.email = email;
        user.password = password;
        user.id_rol = id_rol;


        const usuario_updated = await user.save();

        res.status(200).json({
            Completado: 'User actualizado correctamente',
            usuario_actualizado: usuario_updated,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            Error: 'Error al actualizar el usuario',
            error: error.message,
        });
    }
};

// 4. Buscar un usuario por su numero de identificacion 


