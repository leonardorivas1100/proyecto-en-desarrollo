import express from 'express';
import { login } from '../controllers/autenticacion_controller.js'; // Importar el controlador

const router = express.Router();

// Ruta para el inicio de sesión
router.post('/login', login);

export default router;
