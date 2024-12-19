// Importamos las dependencias necesarias para que el servidor funcione
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {port} from './config/connect.js'; // Puerto de donde corre el servidor
import "./config/connect.js" // Conexion con las base
import { swaggerJSDocs } from './swagger.js'; // Documentación Swagger
import dotenv from 'dotenv';
import authRoutes from './routes/auth_routes.js'
import rolRoutes from './routes/rol_routes.js';
import userRoutes from './routes/usuarios_routes.js';

// Configuración de las variables de entorno
dotenv.config();

// Se crea la instancia que manejará los aspectos del servidor 
const app = express();


// Permitimos que el servidor pueda leer solicitudes de cuerpi JSON, como PUT O POST.
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Añadimos las rutas a la aplicación
app.use('/api/auth', authRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/usuarios', userRoutes);


// Configurar Swagger para la documentación de la API
swaggerJSDocs(app, port);

// Iniciamos el servidor por el puerto especificado osea ${port}
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});