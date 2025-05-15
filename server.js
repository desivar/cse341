const express = require('express');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 5500;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const routes = require('./routes');
const contactsRoutes = require('./routes/contacts');

app.use('/', routes);
app.use('/contacts', contactsRoutes);
app.use(bodypaser.json());

console.log('All Environment Variables:', process.env); // <--- ADD THIS LINE HERE

// Initialize database and start server
mongodb.initDb((err) => {
  if (err) {
    console.log('Error connecting to MongoDB:', err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running and database is connected. Listening on port ${port}`);
    });
  }
});