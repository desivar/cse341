const router = require('express').Router();
router.use('/', require('./swagger')); // Swagger route

router.get('/', (req, res) => {
  //#swagger.tags=[Hello World!]
  res.send('Hello World!');
});
router.use('/contacts', require('./contacts')); // Contacts route



// Export the combined router
module.exports = router;