import express from 'express';
import { create_user, see_all_users, update_user, found_user, delete_user } from '../controllers/usuarios_controller.js';

const router = express.Router();

// 1. Ruta para crear un nuevo usuario.
router.post('/', create_user);

// 2. Ruta para obtener todos los usuarios.
router.get('/', see_all_users);

// 3. Ruta para editar un usuario por su numero de identificacion.
router.put('/:numeroIdentificacion', update_user);

// 4. Ruta para buscar un usuario por su numero de identificacion.
router.get('/:numeroIdentificacion', found_user);

// 5. Ruta para eliminar un usuario por su numero de identificacion.
router.delete('/:numeroIdentificacion', delete_user);


export default router;