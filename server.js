// C:\Users\jilli\341\cse341-2\server.js

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 5500;

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Often good to include this too

// This is the problematic line, corrected for CORS headers:
// It should be a function with (req, res, next) as its parameters
app.use((req, res, next) => { // <-- CORRECT SYNTAX HERE
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins for now
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key' // Z-Key seems custom, adjust if needed
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next(); // Don't forget to call next() to pass control to the next middleware/route handler
});


// Your existing routes middleware
app.use('/', require('./routes')); // This needs to come AFTER body-parser and CORS if they affect it

// Initialize database and start the server
mongodb.initDb((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});