const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API for managing contacts'
    },
    host: 'localhost:5500',
    schemes: ['http'],
};
const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js']; // Adjust the path to your routes file