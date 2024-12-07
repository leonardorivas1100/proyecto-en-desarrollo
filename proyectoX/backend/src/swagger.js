import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

// Configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Api of connection for Data Base in MongoDB',
      version: '1.0.0',
      description: 'Example the API documentation',
      contact: {
        name: 'API Support',
        email: 'supportADSO@example.com',
      },
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        }
      },
    },
    security: [
      { BearerAuth: [] },
    ],
  },
  apis: [
    './src/routes/rol_routes.js',
  ]
};


const swaggerSpec = swaggerJSDoc(options);

const swaggerJSDocs = (app, port) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(
    `Versión No 1 de la documentación estará disponible en http://localhost:${port}/api-docs`
  );
};

export { swaggerJSDocs };
