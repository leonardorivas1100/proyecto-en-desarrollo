// importamos las dependencias necesarias para que el controlador pueda funcionar.
import Rol from "../models/rol_model.js";

// Crear un nuevo Rol
export const create_rol = async (req, res) => {
    try {
        const { nombre } = req.body;

        // Verificar si el Rol ya existe
        const existeRol = await Rol.findOne({ nombre });
        if (existeRol) {
            return res.status(400).json({ message: 'Ya existe un rol con este nombre' });
        }

        // Crear y guardar el nuevo rol
        const nuevoRol = new Rol({nombre});
        await nuevoRol.save();

        // Responder con éxito
        res.status(201).json({
            message: 'Rol creado exitosamente',
            documento_creado: nuevoRol
        });

    }

    // Responder con error 
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el rol', 
            error: error.message });
    }
};

// Obtener todos los Roles
export const see_all_roles = async (req, res) => {
    try {
        const roles = await Rol.find(); // Busca todos los roles
        res.status(200).json(roles); 

    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: 'Error al obtener los roles', 
            error: error.message });
    }
};

// Actualizar un rol por ID
export const update_rol = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;

        // Verificar si el Rol existe
        const rol = await Rol.findById(id);
        if (!rol) {
            return res.status(404).json({ 
                message: 'Rol no encontrado' 
            });
        }

        // Verificar si el nuevo nombre ya está en uso por otro rol
        const existeRol = await Rol.findOne({ nombre });
        if (existeRol && existeRol.id !== id) {
            return res.status(400).json({ 
                message: 'Ya existe un rol con este nombre' 
            });
        }

        // Actualizar el rol
        rol.nombre = nombre;
        const rolActualizado = await rol.save();

        res.status(200).json({
            message: 'Rol actualizado correctamente',
            documento_actualizado: rolActualizado,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al actualizar el rol',
            error: error.message,
        });
    }
};


// Obtener un rol por id
export const see_rol = async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await Rol.findById( id ); // Buscar un rol por el _id

        if (!rol) {
            return res.status(404).json({ 
                message: 'Rol no encontrado' });
        }
        res.status(200).json(rol);

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: 'Error al obtener el rol', 
            error: error.message });
    }
};

// Eliminar rol por id
export const delete_rol = async (req, res) => {
    try {
        const { id } = req.params;
        const rol = await Rol.findByIdAndDelete( id ); // Eliminarlo por su id

        if (!rol) {
            return res.status(404).json({ 
                message: 'Rol no encontrado' });
        }
        res.status(200).json({ 
            message: 'Rol eliminado correctamente', 
            documento_eliminado: rol });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: 'Error al eliminar el rol', 
            error: error.message });
    }
};
