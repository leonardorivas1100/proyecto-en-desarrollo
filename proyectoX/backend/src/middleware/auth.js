import jwt from 'jsonwebtoken';
import Role from '../models/rol_model.js'

// Middleware para verificar el token de autenticación
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Decodificamos el token y lo adjuntamos a la solicitud
        console.log('Token decodificado:', req.user); // Verifica el contenido
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token de autenticación inválido' });
    }
};


// Middleware para verificar el rol del usuario
const verifyRole = (rolesPermitidos) => async (req, res, next) => {
    try {

    const userRoleId = req.user.rol;  

    // Consulta el nombre del rol desde la base de datos
    const role = await Role.findById(userRoleId);
    if (!role) {
        return res.status(403).json({ message: 'Rol no encontrado, acceso denegado' });
    }

    // Verifica si el nombre del rol está en los roles permitidos
    if (rolesPermitidos.includes(role.nombre)) {
        return next();
    }

    return res.status(403).json({ message: 'Acceso denegado' });
    } catch (error) {
        console.error('Error en verifyRole:', error.message);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};


// Exportando las funciones
export { verifyToken, verifyRole };