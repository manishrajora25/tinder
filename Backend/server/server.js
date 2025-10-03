// import swaggerJSDoc from 'swagger-jsdoc';

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'E-Commerce API',
//       version: '1.0.0',
//       description: 'API documentation for the E-Commerce platform',
//     },
//     servers: [
//       { url:process.env.FRONTEND_URL }
//     ],
//     components: {
//       securitySchemes: {
//         cookieAuth: {
//           type: 'apiKey',
//           in: 'cookie',
//           name: 'token'
//         }
//       }
//     },
//     security: [{ cookieAuth: [] }]
//   },
//   apis: ['./routes/*.js', './models/*.js'], // Path to the API docs
// };

// const swaggerSpec = swaggerJSDoc(options);

// export default swaggerSpec;







import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "API documentation for the E-Commerce platform",
    },
    servers: [
      { url: process.env.BACKEND_URL || "http://localhost:5000/api" } // ✅ backend URL
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token"
        }
      }
    },
    security: [{ cookieAuth: [] }]
  },
  apis: ["./routes/*.js"], // Swagger comments yaha hone chahiye
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
