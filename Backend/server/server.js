import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tinde API',
      version: '1.0.0',
      description: 'API documentation for the tinder platform',
    },
    servers: [
      { url:process.env.FRONTEND_URL }
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token'
        }
      }
    },
    security: [{ cookieAuth: [] }]
  },
  apis: ['./routes/*.js', './models/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;