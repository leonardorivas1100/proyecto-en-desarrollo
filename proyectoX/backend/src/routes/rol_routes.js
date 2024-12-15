// Importamos las dependencias, controladores
import express from 'express';
import { validatorHandler } from '../middleware/validator.handler.js';
import { createRolSchema, getRolSchema, updateRolSchema, deleteRolSchema } from '../validators/rol_validator.js';
import { create_rol, see_all_roles, update_rol, see_rol, delete_rol } from '../controllers/rol_controller.js';

// Definimos las rutas para los roles.
const RolRouter = express.Router();

// 1. End-Point para crear un nuevo rol.
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
RolRouter.post('/',validatorHandler(createRolSchema, 'body'), create_rol);

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
RolRouter.get('/', see_all_roles); 

// 3. End-Point para obtener un rol por su nombre
/**
 * @swagger
 * /api/roles/{nombre}:
 *   get:
 *     summary: Obtener un rol especificado por su nombre
 *     tags: [Rol]
 *     parameters:
 *       - in: path
 *         name: Nombre del rol
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre 
 *     responses:
 *       200:
 *         description: Rol encontrado
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error al obtener el Rol
 */
RolRouter.get('/:nombre', validatorHandler(getRolSchema, 'params'), see_rol);

// 4. End-Point para actualizar un rol por ID.
/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Actualizar un Rol
 *     description: Actualiza los detalles de un rol. Solo se pueden modificar los campos proporcionados.
 *     tags: [Rol]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id del Rol
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
RolRouter.put('/:nombre', validatorHandler(updateRolSchema, 'body'), update_rol); 

// 5. End-Point para eliminar un rol por ID.
/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Eliminar un Rol por su Id
 *     tags: [Rol]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id del Rol
 *     responses:
 *       200:
 *         description: Rol eliminado correctamente
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error al eliminar el Rol
 */
RolRouter.delete('/:nombre', validatorHandler(deleteRolSchema, 'params'), delete_rol);


// Exportamos las rutas para usarlas en otros archivos.
export default RolRouter;
