import express from 'express';
import { validatorHandler } from '../middleware/validator.handler.js';
import { createUserSchema, updateUserSchema } from '../validators/usuario_validator.js';
import { create_user, see_all_users, update_user, found_user, delete_user } from '../controllers/usuarios_controller.js';
import {  verifyToken, verifyRole } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuario
 *   description: Operaciones relacionadas con usuarios.
 */
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: apiKey
 *       in: header
 *       name: Authorization
 *       description: Se utiliza para autenticar las peticiones mediante JWT.
 *   schemas:
 *     Usuario:
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


// 1. Ruta para crear un nuevo usuario.
/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuario]
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con token JWT
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
router.post('/', verifyToken, verifyRole(['asistente']), validatorHandler(createUserSchema, "body"), create_user);


// 2. Ruta para obtener todos los usuarios.
/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Mirar todos los usuarios registrados
 *     tags: [Usuario]
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con token JWT
 *     responses:
 *       201:
 *         description: Lista de usuarios
 *       500:
 *         description: Error al obtener los usuarios
 */
router.get('/', verifyToken, verifyRole(['asistente']), see_all_users);


// 3. Ruta para buscar un usuario por su numero de identificacion.
/**
 * @swagger
 * /api/usuarios/{numeroIdentificacion}:
 *   get:
 *     summary: Obtener un usuario especificado por su numero de identificacion
 *     description: Obtendrá un usuario especificado por su nombre
 *     tags: [Usuario]
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - name: numeroIdentificacion
 *         in: path
 *         required: true
 *         description: Numero de identificacion del usuario
 *     responses:
 *       200:
 *         description: Usuario no encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener el usuario
 */
router.get('/:numeroIdentificacion', verifyToken, verifyRole(['asistente']), found_user);


// 4. Ruta para editar un usuario por su numero de identificacion.
/**
 * @swagger
 * /api/usuarios/{numeroIdentificacion}:
 *   put:
 *     summary: Actualizar un usuario por número de identificación
 *     description: Actualiza los detalles de un usuario existente mediante su número de identificación.
 *     tags: [Usuario]
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - name: numeroIdentificacion
 *         in: path
 *         required: true
 *         description: Número de identificación del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nuevoNumeroIdentificacion:
 *                 type: string        
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               nombre_rol:
 *                 type: string
 *             required:
 *               - nuevoNumeroIdentificacion   
 *               - nombres
 *               - apellidos
 *               - telefono
 *               - email
 *               - password
 *               - nombre_rol
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
router.put('/:numeroIdentificacion', verifyToken, verifyRole(['asistente']), validatorHandler(updateUserSchema, "body"), update_user);


// 5. Ruta para eliminar un usuario por su numero de identificacion.
/**
 * @swagger
 * /api/usuarios/{numeroIdentificacion}:
 *   delete:
 *     summary: Eliminar un usuario por número de identificación
 *     description: Elimina un usuario de la base de datos utilizando su número de identificación.
 *     tags: [Usuario]
 *     security:
 *       - BearerAuth: []  # Requiere autenticación con token JWT
 *     parameters:
 *       - name: numeroIdentificacion
 *         in: path
 *         required: true
 *         description: Número de identificación del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno en el servidor
 */
router.delete('/:numeroIdentificacion', verifyToken, verifyRole(['asistente']),  delete_user);


export default router;