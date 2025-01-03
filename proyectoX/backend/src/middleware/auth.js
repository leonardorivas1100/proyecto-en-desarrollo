import jwt from 'jsonwebtoken';
import Role from '../models/rol_model.js'

// Middleware para verificar el token de autenticación
const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ 
            Autenticacion_failed: 'Token de autenticación no proporcionado' 
        });
    }

    // Extraer el token del encabezado con formato 'Bearer <token>'
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            Autenticacion_failed: 'Formato del token no válido' 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Decodificamos el token y lo adjuntamos a la solicitud
        console.log('Token decodificado:', decoded); // Verifica el contenido
        next();
    } catch (error) {
        return res.status(401).json({ 
            Autenticacion_failed: 'Token de autenticación inválido' });
    }
};


// Middleware para verificar el rol del usuario
const verifyRole = (rolesPermitidos) => async (req, res, next) => {
    try {
    const userRoleId = req.user.rol;

    // Verifica si el nombre del rol está en los roles permitidos
    if (rolesPermitidos.includes(userRoleId)) {
        return next();
    }

    return res.status(403).json({ 
        Autenticacion_failed: 'Acceso denegado' 
    });

} catch (error) {
    console.error('Error en verifyRole:', error.message);
    return res.status(500).json({ 
        Request_failed: 'Error interno del servidor' 
    });
}
};


// Exportando las funciones
export { verifyToken, verifyRole };