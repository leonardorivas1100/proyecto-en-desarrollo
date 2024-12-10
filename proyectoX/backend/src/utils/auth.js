import jwt from 'jsonwebtoken';

const generarToken = (numeroIdentificacion) => {
  // Firma el token con el ID del usuario y la clave secreta
  return jwt.sign({ id: numeroIdentificacion }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token válido por 1 hora
  });
};
const verificarToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // Devuelve los datos del token decodificado
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};

export { generarToken, verificarToken };