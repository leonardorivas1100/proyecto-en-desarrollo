import express from 'express';
import { login } from '../controllers/authController.js'; // Importar el controlador

const router = express.Router();

// Ruta para el inicio de sesión
router.post('/login', login);

export default router;
