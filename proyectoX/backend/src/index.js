// Importamos las dependencias necesarias para que el servidor funcione
import express from 'express';
import cors from 'cors';
import {port} from './config/connect.js';
import "./config/connect.js"

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

// Activamos el midlleware CORS para permitir el acceso desde el dominio especificado.
app.use(cors(corsOptions));

// Iniciamos el servidor por el puerto especificado osea ${port}
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});