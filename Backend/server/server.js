import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API",
      version: "1.0.0",
      description: "API documentation for E-Commerce project",
    },
  },
  apis: ["./routes/*.js"], // jaha aapke routes hain
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export default swaggerSpec; // ye zaruri hai
