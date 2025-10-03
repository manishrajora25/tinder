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
      title: "E-Commerce / Profile API",
      version: "1.0.0",
      description: "API documentation for the E-Commerce and Profile platform",
    },
    // ✅ Backend URL (not frontend!)
    servers: [
      { url: process.env.BACKEND_URL || "https://tinder-y763.onrender.com/api" }
    ],
    components: {
      securitySchemes: {
        // Cookie-based auth
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token"
        }
      }
    },
    security: [{ cookieAuth: [] }]
  },
  apis: ["./routes/*.js"], // Routes where Swagger comments are written
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
