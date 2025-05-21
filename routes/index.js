

const { Router } = require('express');
const router = Router();

// 1. Import your contacts router
const contactsRoutes = require('./contacts'); // Make sure this path is correct relative to index.js

// 2. Define a simple root route (optional, but good for testing your base URL)
router.get('/', (req, res) => {
    res.send('Welcome to the API! Your server is running.');
});

// 3. Mount your contacts router under the '/contacts' path
// This is the CRUCIAL line that connects your contacts API endpoints.
router.use('/contacts', contactsRoutes);

// Export the combined router
module.exports = router;