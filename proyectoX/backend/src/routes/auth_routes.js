import express from 'express';
import { login } from '../controllers/autenticacion_controller.js'; // Importar el controlador

const router = express.Router();

// Definimos las rutas para los roles.
const RolRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Au
 *   description: Autentication enveloped.
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Au:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Correo electronico del usuario.
 *         password:
 *           type: string
 *           description: Contraseña.
 *       required:
 *         - nombre
 *         - password 
 */

// A. Ruta para el inicio de sesión
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Autenticar un usuario
 *     tags: [Au]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Au'
 *     responses:
 *       201:
 *         description: Rol created successfully
 *       400:
 *         description: El Rol ya existe
 *       500:
 *         description: Error al crear el rol
 */
router.post('/login', login);

export default router;
