// importamos las dependencias necesarias para que el controlador pueda funcionar.
import Rol from "../models/rol_model.js";

// 1. Crear un nuevo Rol.
export const create_rol = async (req, res) => {
    try {
        const { nombre } = req.body;

        // Verificar si el Rol ya existe
        const existeRol = await Rol.findOne({ nombre });
        if (existeRol) {
            return res.status(400).json({ 
                Error_name: 'Ya existe un rol con este nombre' });
        }

        // Crear y guardar el nuevo rol
        const nuevoRol = new Rol({ nombre });
        await nuevoRol.save();

        // Responder con éxito
        res.status(201).json({
            Request_success: ' ¡Rol created successfully!',
            New_rol: nuevoRol
        });

    }

    // Responder con error en caso de no ingresar el rol
    catch (error) {
        console.error(error);
        res.status(500).json({
            Happened_an_error: 'Error al crear el rol',
            error: error.message
        });
    }
};


// 2. Obtener todos los Roles.
export const see_all_roles = async (req, res) => {
    try {
        const roles = await Rol.find(); // Busca todos los roles
        res.status(200).json({
            Request_success: ' ¡Roles found successfully! ',
            Roles_found: roles
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            Happened_an_error: 'Error al obtener los roles',
            error: error.message
        });
    }
};


// 3. Actualizar un rol por su nombre.
export const update_rol = async (req, res) => {
    try {
        // Verificar si el Rol existe
        const { nombre } = req.params;
        const rol = await Rol.findOne({ nombre });

        // En caso de que no haya un rol para actualizar
        if (!rol) {
            return res.status(404).json({
                Happened_an_error: 'No se encuentra este rol para ser actualizado',
            });
        }

        // Verificar si el nuevo nombre ya está en uso por otro rol
        const { nombre: nuevoNombre } = req.body; // Nuevo nombre desde el cuerpo de la solicitud
        const existeRol = await Rol.findOne({ nombre: nuevoNombre });

        if (existeRol && existeRol.nombre !== rol.nombre) {
            return res.status(400).json({
                Happened_an_error: 'Ya existe un rol con este nombre',
            });
        }
 

        // Actualizar el rol
        rol.nombre = nuevoNombre;
        const rolActualizado = await rol.save();

        res.status(200).json({
            Request_success: 'Rol actualizado correctamente',
            Rol_updated: rolActualizado,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            Happened_an_error: 'Error al actualizar el rol',
            error: error.message,
        });
    }
};



// 4. Buscar un rol por su nombre.
export const see_rol = async (req, res) => {
    try {
        const { nombre } = req.params;
        const rol = await Rol.findOne({ nombre }); // Buscar un rol por el nombre

        // Si el rol no se encuetra
        if (!rol) {
            return res.status(404).json({
                Happened_an_error: 'Rol no encontrado, hay un error en la busqueda o en la logica'
            });
        }
        // Respuesta positiva
        res.status(200).json({
            Request_success: ' ¡Rol encontrado con exito! ', rol
        });

        // Error cualquiera
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al obtener el rol',
            error: error.message
        });
    }
};

// 5. Eliminar un rol por su Id.
export const delete_rol = async (req, res) => {
    try {
        const { nombre } = req.params;
        const rol = await Rol.findOneAndDelete(nombre); // Eliminarlo por su id

        // Si no se encuetra el rol para eliminar
        if (!rol) {
            return res.status(404).json({
                Happened_an_error: 'Rol no encontrado'
            });
        }

        // Respuesta a si todo fue correcto eliminando el rol especificado
        res.status(200).json({
            Request_success: 'Rol eliminado correctamente',
            Rol_eliminado: rol
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
