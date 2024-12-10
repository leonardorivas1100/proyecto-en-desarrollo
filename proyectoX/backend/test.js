import { generarToken, verificarToken } from './src/utils/auth.js';

const usuarioId = '12345';

// Generar un token
const token = generarToken(usuarioId);
console.log('Token generado:', token);

// Verificar el token
try {
  const decoded = verificarToken(token);
  console.log('Token verificado:', decoded);
} catch (error) {
  console.error('Error al verificar el token:', error.message);
}
