// Importamos las dependencias necesarias para que el servidor funcione
import express from 'express';
import cors from 'cors';
import {port} from './config/connect.js'; // Puerto de donde corre el servidor
import "./config/connect.js" // Conexion con las base
import { swaggerJSDocs } from './swagger.js'; // Documentación Swagger


// Importamos las rutas 
import rolRoutes from './routes/rol_routes.js';


// Se crea la instancia que manejará los aspectos del servidor
const app = express();

// Definimos las opciones que tendrá el dominio especificado
const corsOptions = {
    origin: 'http//localhost:10000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
};

// Permitimos que el servidor pueda leer solicitudes de cuerpi JSON, como PUT O POST.
app.use(express.json());
app.use(cors(corsOptions));

// Añadimos las rutas a la aplicación
app.use('/api/roles', rolRoutes);

// Configurar Swagger para la documentación de la API
swaggerJSDocs(app, port);

// Iniciamos el servidor por el puerto especificado osea ${port}
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});