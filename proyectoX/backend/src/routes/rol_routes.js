// Importamos las dependencias, controladores, validadores
import express from 'express';
import { validatorHandler } from '../middleware/validator.handler.js';
import { createRolSchema, getRolSchema, updateRolSchema, deleteRolSchema } from '../validators/rol_validator.js';
import { create_rol, see_all_roles, update_rol, see_rol, delete_rol } from '../controllers/rol_controller.js';
import {  verifyToken, verifyRole } from '../middleware/auth.js';

// Definimos las rutas para los roles.
const RolRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rol
 *   description: Operaciones relacionadas con roles.
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Rol:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del Rol
 *       required:
 *         - nombre
 */

// 1. End-Point para crear un nuevo rol.
/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     tags: [Rol]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *     responses:
 *       201:
 *         description: Rol created successfully
 *       400:
 *         description: El Rol ya existe
 *       500:
 *         description: Error al crear el rol
 */
RolRouter.post('/', verifyToken, verifyRole(['administrador']), validatorHandler(createRolSchema, 'body'), create_rol);

// 2. End-Point para obtener todos los roles.
/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Mirar todos los roles de la base de datos
 *     tags: [Rol]
 *     responses:
 *       201:
 *         description: Lista de roles 
 *       500:
 *         description: Error al obtener los roles
 */
RolRouter.get('/', verifyToken, verifyRole(['asistente', 'administrador']), see_all_roles); 

// 3. End-Point para obtener un rol por su nombre
/**
 * @swagger
 * /api/roles/{nombre}:
 *   get:
 *     summary: Obtener un rol especificado por su nombre
 *     description: Obtendrá un rol especificando su nombre
 *     tags: [Rol]
 *     parameters:
 *       - name: nombre
 *         in: path
 *         required: true
 *         description: Nombre del rol
 *     responses:
 *       200:
 *         description: Rol encontrado
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error al obtener el Rol
 */
RolRouter.get('/:nombre', verifyToken, verifyRole(['cliente']), validatorHandler(getRolSchema, 'params'), see_rol);

// 4. End-Point para actualizar un rol por su nombre.
/**
 * @swagger
 * /api/roles/{nombre}:
 *   put:
 *     summary: Actualizar un Rol
 *     description: Actualiza los detalles de un rol especificando su nombre
 *     tags: [Rol]
 *     parameters:
 *       - name: nombre
 *         in: path
 *         required: true
 *         description: Nombre del rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       400:
 *         description: Error de validación o datos incompletos
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error interno al actualizar el rol
 */
RolRouter.put('/:nombre', verifyToken, verifyRole(['administrador']), validatorHandler(updateRolSchema, 'body'), update_rol); 

// 5. End-Point para eliminar un rol por su nombre.
/**
 * @swagger
 * /api/roles/{nombre}:
 *   delete:
 *     summary: Eliminar un rol por su nombre
 *     description: Elimina un rol especificando su nombre
 *     tags: [Rol]
 *     parameters:
 *       - name: nombre   
 *         in: path
 *         required: true
 *         description: Nombre del rol
 *     responses:
 *       200:
 *         description: Rol eliminado correctamente
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error al eliminar el Rol
 */
RolRouter.delete('/:nombre', verifyToken, verifyRole(['asistente']), validatorHandler(deleteRolSchema, 'params'), delete_rol);


// Exportamos las rutas para usarlas en otros archivos.
export default RolRouter;
