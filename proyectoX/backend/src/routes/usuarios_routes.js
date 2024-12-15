import express from 'express';
import { validatorHandler } from '../middleware/validator.handler.js';
import { createUserSchema, updateUserSchema, getUserSchema,  } from '../validators/usuario_validator.js';
import { create_user, see_all_users, update_user, found_user, delete_user } from '../controllers/usuarios_controller.js';
// , , , deleteUserSchema
const router = express.Router();

// 1. Ruta para crear un nuevo usuario.
/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: Operaciones relacionadas con usuarios.
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     usuario:
 *       type: object
 *       properties:
 *         numeroIdentificacion:
 *           type: string
 *           description: Numero de identificacion del usuario.
 *         nombres:
 *           type: string
 *           descripcion: Nombres del usuario.
 *         apellidos:
 *           type: string
 *           descripcion: Apellidos del usuario.         
 *         telefono:
 *           type: string
 *           descripcion: Numero telefonico del usuario.  
 *         email:
 *           type: string
 *           descripcion: Correo electrónico del usuario.  
 *         password:
 *           type: string
 *           descripcion: Contraseña del usuario.  
 *         nombre_rol:
 *           type: string
 *           descripcion: Nombre del rol que pertenece al usuario  
 *       required:
 *         - numeroIdentificacion
 *         - nombres
 *         - apellidos
 *         - telefono
 *         - email     
 *         - password 
 *         - nombre_rol 
 */
/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: El usuario ya existe
 *       500:
 *         description: Error al crear el usuario
 */
router.post('/', validatorHandler(createUserSchema, "body"), create_user);

// 2. Ruta para obtener todos los usuarios.
router.get('/', see_all_users);

// 3. Ruta para editar un usuario por su numero de identificacion.
router.put('/:numeroIdentificacion', validatorHandler(updateUserSchema, "params"), update_user);

// 4. Ruta para buscar un usuario por su numero de identificacion.
router.get('/:numeroIdentificacion', validatorHandler(getUserSchema, "body"), found_user);

// 5. Ruta para eliminar un usuario por su numero de identificacion.
router.delete('/:numeroIdentificacion', delete_user);


export default router;