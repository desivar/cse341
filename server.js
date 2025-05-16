const express = require('express');
const bodyParser = require('body-parser');
const { initDb } = require('./data/database'); // Correct import
const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes');
const contactsRoutes = require('./routes/contacts');

app.use('/', routes);
app.use('/contacts', contactsRoutes);

// Initialize database and start server
initDb((err) => { // Correct function call: initDb instead of initDatabase
  if (err) {
    console.log('Error connecting to MongoDB:', err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running and database is connected. Listening on port ${port}`);
    });
  }
});