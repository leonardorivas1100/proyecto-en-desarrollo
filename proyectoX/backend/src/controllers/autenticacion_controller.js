import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Usuario from '../models/usuarios_model.js'; // Ajusta la ruta al modelo
import dotenv from 'dotenv';

// Configurar dotenv para variables de entorno
dotenv.config();

// Función para generar un token JWT
const generarToken = (usuario) => {
  return jwt.sign(
    { 
      id: usuario._id, 
      email: usuario.email, 
      nombres: usuario.nombres, 
      apellidos: usuario.apellidos, 
      rol: usuario.nombre_rol.nombre, 
    },
    process.env.JWT_SECRET, // Clave secreta desde el archivo .env
    { expiresIn: '1h' } // Tiempo de expiración del token
  );
};

// Controlador para manejar el inicio de sesión
const login = async (req, res) => {
  const { email, password } = req.body; // Captura los datos enviados por el cliente

  try {
    // Verificar si el usuario existe
    const usuario = await Usuario
    .findOne({ email })
    .populate('nombre_rol');

    if (!usuario) {
      return res.status(404).json({ 
        Request_failed: 'No se encontro ningún usuario con el correo ingresado.' });
    }

    // Verificar si la contraseña es válida
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(401).json({ 
        Request_failed: 'La contraseña es incorrecta' });
    }

    // Generar el token JWT
    const token = generarToken(usuario);
    console.log(
      `- Token generado exitosamente!: ${token}.
       - El usuario autenticado es un ${usuario.nombre_rol.nombre}`)

    // Enviar la respuesta con el token
    res.status(200).json({ 
      Request_success: 'Token generado exitosamente!',
      Token_generated: token,
      User_rol: usuario.nombre_rol.nombre, // Enviamos el rol en la respuesta
    });


  } catch (error) {
    console.error('Error en el login:', error.message);
    res.status(500).json({ 
      Request_failed: 'Error interno del servidor', 
      error: error.message 
    });
  }
};

export { login };
