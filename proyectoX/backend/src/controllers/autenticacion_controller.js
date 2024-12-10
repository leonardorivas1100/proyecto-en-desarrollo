import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Usuario from '../models/usuarios_model.js'; // Ajusta la ruta al modelo
import dotenv from 'dotenv';

// Configurar dotenv para leer variables de entorno
dotenv.config();

// Función para generar un token JWT
const generarToken = (usuario) => {
  return jwt.sign(
    { 
      id: usuario._id, 
      email: usuario.email, 
      rol: usuario.id_rol 
    }, // Información en el payload
    process.env.JWT_SECRET, // Clave secreta desde el archivo .env
    { expiresIn: '1h' } // Tiempo de expiración del token
  );
};

// Controlador para manejar el inicio de sesión
const login = async (req, res) => {
  const { email, password } = req.body; // Captura los datos enviados por el cliente

  try {
    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Verificar si la contraseña es válida
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Generar el token JWT
    const token = generarToken(usuario);

    // Enviar la respuesta con el token
    res.status(200).json({ 
      message: 'Inicio de sesión exitoso',
      token 
    });
  } catch (error) {
    console.error('Error en el login:', error.message);
    res.status(500).json({ 
      message: 'Error interno del servidor', 
      error: error.message 
    });
  }
};

export { login };
