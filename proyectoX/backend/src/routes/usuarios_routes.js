import express from 'express';
import { create_user, see_all_users } from '../controllers/usuarios_controller.js';

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/', create_user);

// Ruta para crear un nuevo usuario
router.get('/', see_all_users);


export default router;