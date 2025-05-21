const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API for managing contacts'
    },
    host: 'localhost:5500',
    schemes: ['https', 'http'],
};
const outputFile = './swagger.json'; // Adjust the path as needed
const endpointsFiles = ['./routes/index.js']; // Adjust the path to your routes file
//this will generate aswagger auto-gen.json file in the root of your project
swaggerAutogen(outputFile, endpointsFiles, doc);
