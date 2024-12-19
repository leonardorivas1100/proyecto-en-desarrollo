import Usuario from "../models/usuarios_model.js";
import Rol from "../models/rol_model.js"

// 1. Crear un nuevo Usuario.
export const create_user = async (req, res) => {
    try {

        // Campos de la coleccion usuarios
        const { numeroIdentificacion, nombres, apellidos, telefono, email, password, nombre_rol } = req.body;

        // Verificar si existe un rol con ese nombre.
        const rol = await Rol.findOne({ nombre: nombre_rol });
        if (!rol) {
            return res.status(400).json({ 
                Request_failed: `No existe un rol con el nombre (${nombre_rol}) `
            });
        }

        // Verificar si ya hay un usuario con el mismo número de identificación
        const usuario_existente = await Usuario.findOne({ numeroIdentificacion });
        if (usuario_existente) {
            return res.status(400).json({ 
                Request_failed: 'Ya existe un usuario con este numero de identificacion' });
        }

        // Verificar si ya hay un usuario con el mismo correo electrónico
        const usuario_existente2 = await Usuario.findOne({ email });
        if (usuario_existente2) {
            return res.status(400).json({ 
                Request_failed: 'Ya existe un usuario con este correo electronico' });
        }

        // Verificar si ya hay un usuario con los mismos nombres y apellidos
        const usuario_existente3 = await Usuario.findOne({ nombres, apellidos });
        if (usuario_existente3) {
            return res.status(400).json({ 
                Request_failed: 'Ya existe un usuario con estos nombres y apellidos' });
        }

        // Verificar si ya hay un usuario con el mismo numero de telefono
        const usuario_existente4 = await Usuario.findOne({ telefono });
        if (usuario_existente4) {
            return res.status(400).json({ 
                Request_failed: 'Ya existe un usuario con este numero telefonico' });
        }

        // // Verificar si ya hay un usuario con el mismo rol
        // const usuario_existente5 = await Usuario.findOne({ nombre_rol: rol._id });
        // if (usuario_existente5) {
        //     return res.status(400).json({ 
        //         Request_failed: `Ya existe un usuario con el rol: ${nombre_rol}` });
        // }

        // Crear y guardar el nuevo usuario
        const new_user = new Usuario({
            numeroIdentificacion,
            nombres,
            apellidos,
            telefono,
            email,
            password,
            nombre_rol: rol._id
        });
        await new_user.save();

        // Responder con éxito
        res.status(201).json({
            Request_success: ' User created successfully!',
            User_created: new_user
        });

    }

    //  En caso de error al crear el usuario.
    catch (error) {
        console.error(error);
        res.status(500).json({
            Request_failed: 'Error al crear el Usuario',
            error: error.message
        });
    }
};


// 2. Obtener todos los Usuarios.
export const see_all_users = async (req, res) => {
    try {
        const user = await Usuario
        .find() // Busca todos los usuarios
        .populate('nombre_rol') // Busca y llena el campo id_rol con el nombre del rol correspondiente
        res.status(200).json({
            Request_successfully: ' Users found successfully! ',
            Users_found: user
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            Request_failed: 'Error al obtener los usuarios',
            error: error.message
        });
    }
};


// 3. Actualizar un usuario por su Numero de identificación.
export const update_user = async (req, res) => {
    try {
            // Verificar si el usuario existe
            const { numeroIdentificacion } = req.params;
            const { nuevoNumeroIdentificacion, nombres, apellidos, telefono, email, password, nombre_rol  } = req.body;
            const user = await Usuario.findOne({ numeroIdentificacion });

            // En caso de no haya un usuario para actualizar
            if (!user) {
                return res.status(404).json({
                    Request_failed: `No se encontro un usuario con esta identificacion: ${numeroIdentificacion}`
                });
            }

            // Verificar si el nuevo número de identificación ya está en uso por otro usuario
            if (nuevoNumeroIdentificacion) {
                const existingUser = await Usuario.findOne({ numeroIdentificacion: nuevoNumeroIdentificacion });
                if (existingUser && existingUser._id.toString() !== user._id.toString()) {
                    return res.status(400).json({
                        Request_failed: `Ya existe un usuario con el número de identificación: ${nuevoNumeroIdentificacion}`
                    });
                }
                user.numeroIdentificacion = nuevoNumeroIdentificacion; // Actualizar el número de identificación
            }
    
            // Verificar si el nuevo nombre ya está en uso por otro usuario
            const name_user_now = await Usuario.findOne({ nombres, apellidos });
            if (name_user_now && name_user_now.numeroIdentificacion !== numeroIdentificacion) {
                return res.status(400).json({
                    Request_failed: `Ya existe un usurario con el nombre ${nombres} ${apellidos}`
                });
            }

            // Verificar el nuevo correo ya está en uso por otro usuario
            const email_user_now = await Usuario.findOne({ email });
            if (email_user_now && email_user_now.numeroIdentificacion !== numeroIdentificacion) {
                return res.status(400).json({
                    Request_failed: `Ya existe un usurario con el correo electronico: ${email}`
                });
            }

            // Verificar el numero telefonico ya está en uso por otro usuario
            const phone_user_now = await Usuario.findOne({ telefono });
            if (phone_user_now && phone_user_now.numeroIdentificacion !== numeroIdentificacion) {
                return res.status(400).json({
                    Request_failed: `Ya existe un usurario con el numero telfonico: ${telefono}`
                });
            }

            // Buscar el ID del rol por su nombre
            const rol = await Rol.findOne({ nombre: nombre_rol });
            if (!rol) {
                return res.status(404).json({
                    Request_failed: `No se encontró un rol con este nombre: ${nombre_rol}`
                });
            }

            // Verificar si el rol ya está en uso por otro usuario
            // const rol_user_now = await Usuario.findOne({ nombre_rol: rol._id });
            // if (rol_user_now && rol_user_now._id.toString() !== user._id.toString()) {
            //     return res.status(400).json({
            //         Request_failed: `Ya existe un usuario con el rol: ${nombre_rol}`,
            //     });
            // }

        user.nombres = nombres;
        user.apellidos = apellidos;
        user.telefono = telefono;
        user.email = email;
        user.password = password;
        user.nombre_rol = rol._id;


        const usuario_updated = await user.save();

        res.status(200).json({
            Request_success: ' User updated successfully! ',
            user_updated: usuario_updated,
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            Request_failed: 'Error al actualizar el usuario',
            error: error.message,
        });
    }
};

// 4. Buscar un usuario por su numero de identificacion.
export const found_user = async (req, res) => {
    try {
        const { numeroIdentificacion } = req.params;
        const user = await Usuario
        .findOne({ numeroIdentificacion })
        .populate('nombre_rol') // Busca y llena el campo id_rol con el nombre del rol correspondiente

        // Si no se encuentra el usuario con el numero de identifiacion proporcionado.
        if (!user) {
            return res.status(404).json({
                Request_failed: `No se encontro ningún usuario con el numero de identificacion: ${numeroIdentificacion}`
            });
        }

        // Respuesta a la solicitud
        res.status(200).json({
            Request_success: ' User found successfully! ',
            User_found: user
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            Request_failed: 'Error al encontrar el usuario',
            Error: error.message
        })
        
    }
}

// 5. Eliminar un usuario por su numero de identificacion.
export const delete_user = async (req, res) => {
    try {
        const { numeroIdentificacion } = req.params;
        const user = await Usuario.findOneAndDelete({ numeroIdentificacion }); 

        // Si no se encuetra el usuario para eliminar
        if (!user) {
            return res.status(404).json({
                Request_failed: `No se encuentra un usuario con el numero de identificacion: ${numeroIdentificacion}`
            });
        }

        // Respuesta satifactoria.
        res.status(200).json({
            Request_success: ' Usuario eliminado correctamente! ',
            User_eliminated: user
        });
    }

    // En caso de algun error al eliminar el rol
    catch (error) {
        console.error(error);
        res.status(500).json({
            Request_failed: 'Error al eliminar el rol',
            error: error.message
        });
    }
};


