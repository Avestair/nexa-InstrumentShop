const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'InstrumentShop API',
      version: '1.0.0',
      description: 'API documentation for InstrumentShop project',
      contact: {
        name: 'Azim Hatami',
        email: 'azimhatami.dev@gmail.com'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.NEXT_PUBLIC_PORT}`,
        description: 'Development server'
      }
    ]
  },
  apis: ['./swagger/*.js']
};

// Generate Swagger specs
const specs = swaggerJsdoc(options);

// Create a route to serve the Swagger UI
const setupSwagger = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log(`Swagger documentation is available at http://localhost:${process.env.NEXT_PUBLIC_PORT}`);
};

module.exports = setupSwagger;
