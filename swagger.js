const dotenv = require('dotenv');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Eni-node API',
      version: '1.0.0',
      description: 'Documentation de l\'API créée en cours à l\'ENI dans le cadre de la formation de Concepteur développeur d\'applications'
    },
    servers: [
      {
        url: 'http://localhost:3000/api', 
      },
    ],
  },
  apis: ['./routes/*.js', './modules/**/*.js'],  // Inclure à la fois les routes et les modules
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
