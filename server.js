const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();

// Use environment variable for the port if available, default to 8080
const port = process.env.PORT || 5500;

// Middleware
app.use(bodyParser.json());
app.use('/', require('./routes'));

// Initialize database and start the server
mongodb.initDb((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process if DB connection fails
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
