const express = require('express');

const router = express.Router();

const UsersController= require('../controller/user');

/* GET users listing. */
router.get('/', (req, res) => {
  res.json({ message: 'users api' });
});

/* POST save the user in database */
router.post('/',UsersController.validate('createUser'),UsersController.insert);

module.exports = router;
