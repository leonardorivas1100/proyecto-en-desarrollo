import express from 'express';
import { create_user } from '../controllers/usuarios_controller.js';

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/', create_user);

export default router;