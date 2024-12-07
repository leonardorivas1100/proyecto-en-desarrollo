// Importamos las dependencias, controladores
import express from 'express';
import { validatorHandler } from '../middleware/validator.handler.js';
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
 *     tags: [Roles]
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
RolRouter.post('/', create_rol);

// 2. End-Point para obtener todos los roles.
RolRouter.get('/', see_all_roles);

// 3. End-Point para actualizar un rol por ID.
RolRouter.put('/:id', update_rol);  

// 4. End-Point para obtener un rol por ID.
RolRouter.get('/:id', see_rol);

// 5. End-Point para eliminar un rol por ID.
RolRouter.delete('/:id', delete_rol);


// Exportamos las rutas para usarlas en otros archivos.
export default RolRouter;
