const express = require('express');
const router = express.Router();
// Fix the path to the controller if needed
const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);

module.exports = router;